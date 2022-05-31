import { singleHop, multiHop } from "~/constants/uniswap/calldata/swapData";
import { TokenExtended, WrapType } from "../uniswap/interfaces";
import { queryAllowance } from "./queries";
import { ContractInfo } from "~/constants/service/contracts";
import { JsonRpcSigner } from "@ethersproject/providers";

export async function fetchBestTrade(
	signer: JsonRpcSigner,
	token0: TokenExtended,
	token1: TokenExtended,
	amount: string,
	isInput: boolean
) {
	const ownerAddress = await signer.getAddress();
	const owner = !ownerAddress ? "0x0000000000000000000000000000000000000000" : ownerAddress;
	const allowance = isInput
		? await queryAllowance(signer, token0, ContractInfo.SwapRouter02)
		: await queryAllowance(signer, token1, ContractInfo.SwapRouter02);

	let trade = await singleHop(owner, token0, token1, amount);
	if (trade.calldata.length == 0 && trade.wrap == WrapType.NONE) {
		trade = await multiHop(owner, token0, token1, amount);
	}

	return { allowance, trade };
}
