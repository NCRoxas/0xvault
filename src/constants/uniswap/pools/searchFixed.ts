import {
	computePoolAddress,
	FeeAmount,
	nearestUsableTick,
	Pool,
	TickMath,
	TICK_SPACINGS
} from "@uniswap/v3-sdk";
import { Erc20__factory, UniswapV3Pool__factory } from "~/constants/contracts";
import { BigNumber, ethers } from "ethers";
import { Token } from "@uniswap/sdk-core";
import { Immutables, State, TokenExtended } from "../interfaces";
import { ChainInfo } from "~/constants/chain";
import { ContractInfo } from "~/constants/service/contracts";
import { tryParseAmount } from "../utils";

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

export function getPoolAddress(tokenA: Token, tokenB: Token, fee: FeeAmount) {
	return computePoolAddress({
		factoryAddress: ContractInfo.UniswapV3Factory,
		tokenA: tokenA,
		tokenB: tokenB,
		fee: fee
	});
}

export async function getFixedPool(token0: TokenExtended, token1: TokenExtended, fee: FeeAmount) {
	const provider = ChainInfo[token0.chainId].provider;
	const POOL = getPoolAddress(token0.getToken(), token1.getToken(), fee);

	const balance = await new ethers.Contract(
		token0.address,
		Erc20__factory.abi,
		provider
	).balanceOf(POOL);
	const currencyAmount = tryParseAmount(token0.getToken(), token0.amount);
	const fixed = ethers.utils.parseUnits(currencyAmount.toExact(), token0.decimals);
	const liquidityCheck = BigNumber.from(balance._hex).gt(fixed);

	if (liquidityCheck) {
		const POOL_CONTRACT = new ethers.Contract(POOL, UniswapV3Pool__factory.abi, provider);
		const [immutables, state] = await Promise.all([
			getPoolImmutables(POOL_CONTRACT),
			getPoolState(POOL_CONTRACT)
		]);
		return new Pool(
			token0.getToken(),
			token1.getToken(),
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
