import { ChainInfo } from "~/constants/chain";
import { Erc20__factory, UniswapV3Pool__factory } from "~/constants/contracts";
import { ContractInfo } from "~/constants/service/contracts";
import { Token } from "@uniswap/sdk-core";
import {
	FeeAmount,
	computePoolAddress,
	Pool,
	nearestUsableTick,
	TickMath,
	TICK_SPACINGS
} from "@uniswap/v3-sdk";
import { Provider, Contract } from "ethcall";
import { ethers, BigNumber } from "ethers";
import { Immutables, State } from "../interfaces";

interface CallResponse {
	_hex: string;
}

export async function getPoolImmutables(poolContract: ethers.Contract) {
	const immutables: Immutables = {
		factory: await poolContract.factory(),
		token0: await poolContract.token0(),
		token1: await poolContract.token1(),
		fee: await poolContract.fee(),
		tickSpacing: await poolContract.tickSpacing(),
		maxLiquidityPerTick: await poolContract.maxLiquidityPerTick()
	};

	return immutables;
}

export async function getPoolState(poolContract: ethers.Contract) {
	const slot = await poolContract.slot0();
	const PoolState: State = {
		liquidity: await poolContract.liquidity(),
		sqrtPriceX96: slot[0],
		tick: slot[1],
		observationIndex: slot[2],
		observationCardinality: slot[3],
		observationCardinalityNext: slot[4],
		feeProtocol: slot[5],
		unlocked: slot[6]
	};

	return PoolState;
}

export function getPoolAddress(tokenA: Token, tokenB: Token) {
	const FEES = [FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH];
	const POOLS = [];

	for (const i in FEES) {
		const pool = computePoolAddress({
			factoryAddress: ContractInfo.UniswapV3Factory,
			tokenA: tokenA,
			tokenB: tokenB,
			fee: FEES[i]
		});
		if (pool) {
			POOLS.push(pool);
		}
	}
	return POOLS;
}

export async function createPoolFromAddress(
	pools: string[],
	token0: Token,
	token1: Token,
	amount: BigNumber,
	nativeInput: boolean
): Promise<ethers.Contract | undefined> {
	const call = new Provider();
	await call.init(ChainInfo[token0.chainId].provider);
	const provider = ChainInfo[token0.chainId].provider;

	// In case ether is token0 use token1 for balance check
	let data: CallResponse[];
	if (!nativeInput) {
		const balanceCheck = pools.map((address) => {
			const contract = new Contract(token0.address, Erc20__factory.abi);
			return contract.balanceOf(address);
		});
		data = await call.all([...balanceCheck]);
	} else {
		const balanceCheck = pools.map((address) => {
			const contract = new Contract(token1.address, Erc20__factory.abi);
			return contract.balanceOf(address);
		});
		data = await call.all([...balanceCheck]);
	}

	for (const i in pools) {
		if (BigNumber.from(data[i]._hex).gt(amount)) {
			return new ethers.Contract(pools[i], UniswapV3Pool__factory.abi, provider);
		}
	}
	return undefined;
}

export async function getMultiPool(
	token0: Token,
	token1: Token,
	amount: string,
	nativeInput: boolean
) {
	const inputAmount = ethers.utils.parseUnits(amount, token0.decimals);

	const POOLS = getPoolAddress(token0, token1);
	const POOL_CONTRACT = await createPoolFromAddress(
		POOLS,
		token0,
		token1,
		inputAmount,
		nativeInput
	);

	if (POOL_CONTRACT) {
		const [immutables, state] = await Promise.all([
			getPoolImmutables(POOL_CONTRACT),
			getPoolState(POOL_CONTRACT)
		]);
		return new Pool(
			token0,
			token1,
			immutables.fee,
			state.sqrtPriceX96.toString(),
			state.liquidity.toString(),
			state.tick,
			[
				{
					index: nearestUsableTick(
						TickMath.MIN_TICK,
						TICK_SPACINGS[<FeeAmount>immutables.fee]
					),
					liquidityNet: state.liquidity.toString(),
					liquidityGross: state.liquidity.toString()
				},
				{
					index: nearestUsableTick(
						TickMath.MAX_TICK,
						TICK_SPACINGS[<FeeAmount>immutables.fee]
					),
					liquidityNet: state.liquidity.mul(BigNumber.from(-1)).toString(),
					liquidityGross: state.liquidity.toString()
				}
			]
		);
	}
	return undefined;
}
