import {
	Erc20__factory,
	WETH__factory,
	SwapRouter02__factory
} from "../contracts";
import { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, ContractTransaction, ethers } from "ethers";
import { TokenExtended, ExtendedEther, TradeData, WrapType } from "../uniswap/interfaces";
import { tryParseAmount } from "../uniswap/utils";
import { ContractInfo } from "./contracts";

//// Common Tx ////
///////////////////

export async function setAllowance(
	token: TokenExtended,
	contract: string,
	signer: JsonRpcSigner
): Promise<ContractTransaction> {
	const erc20 = Erc20__factory.connect(token.address, signer);

	const input = tryParseAmount(token.getToken(), token.amount).toExact();
	const fixed = ethers.utils.parseUnits(input, token.decimals);
	const infinite = BigNumber.from(2).pow(256).sub(1);

	return await erc20.approve(contract, infinite);
}

export async function wrapEth(
	chainId: number,
	signer: JsonRpcSigner,
	amount: string
): Promise<ContractTransaction> {
	const ETHER = ExtendedEther.onChain(chainId);
	const WETH = ETHER.wrapped;
	const weth_contract = WETH__factory.connect(WETH.address, signer);

	return await weth_contract.deposit({ value: amount });
}

export async function unwrapEth(
	chainId: number,
	signer: JsonRpcSigner,
	amount: string
): Promise<ContractTransaction> {
	const ETHER = ExtendedEther.onChain(chainId);
	const WETH = ETHER.wrapped;
	const weth_contract = WETH__factory.connect(WETH.address, signer);

	return await weth_contract.withdraw(amount);
}

//// Uniswap ////
/////////////////

export async function makeSwap(
	signer: JsonRpcSigner,
	chainId: number,
	data: TradeData
): Promise<ContractTransaction> {
	const factory = SwapRouter02__factory.connect(ContractInfo.SwapRouter02, signer);

	if (data.wrap == WrapType.WRAP) {
		return wrapEth(chainId, signer, data.value);
	} else if (data.wrap == WrapType.UNWRAP) {
		return unwrapEth(chainId, signer, data.value);
	} else {
		// return await factory["multicall(bytes[])"]
		return await factory.multicall(data.calldata, { value: data.value, gasLimit: 100000 });
	}
}
