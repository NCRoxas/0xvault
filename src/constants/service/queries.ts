import axios from "axios";
import { Contract, Provider } from "ethcall";
import { ChainInfo } from "../chain";
import { Erc20__factory } from "../contracts";
import { tryParseAmount } from "../uniswap/utils";
import { TokenExtended } from "../uniswap/interfaces";
import { JsonRpcSigner } from "@ethersproject/providers";
import { tokenList } from "~/constants/service/lists";
import { formatUnits, parseUnits } from "ethers/lib/utils";

interface CallResponse {
	_hex: string;
}

export async function queryBalance(wallet: string, chainId: number) {
	const ethcall = new Provider();
	await ethcall.init(ChainInfo[chainId].provider);
	const tokens = tokenList(chainId);

	const addressMap = tokens.map(({ address }) => address);
	const decimalMap = tokens.map(({ decimals }) => decimals);

	const callData = addressMap.map((address) => {
		if (address) {
			const contract = new Contract(address, Erc20__factory.abi);
			return contract.balanceOf(wallet);
		} else {
			return ethcall.getEthBalance(wallet);
		}
	});
	const data: CallResponse[] = await ethcall.all(callData);

	return data.map((item, index) => ({
		address: addressMap[index] == undefined ? "" : addressMap[index],
		amount: formatUnits(item._hex, decimalMap[index])
	}));
}

export async function queryTxHistory(wallet: string) {
	const payload = JSON.stringify({
		jsonrpc: "2.0",
		method: "alchemy_getAssetTransfers",
		params: [
			{
				fromBlock: "0x0",
				fromAddress: wallet
			}
		],
		id: 0
	});

	const request = await axios({
		method: "post",
		url: import.meta.env.VITE_ALCHEMY_RKB,
		headers: { "Content-Type": "application/json" },
		data: payload
	});
	return request.data;
}

export async function queryAllowance(
	signer: JsonRpcSigner,
	token: TokenExtended,
	contract: string
) {
	const owner = await signer.getAddress();
	if (owner && token.address) {
		const erc20 = Erc20__factory.connect(token.address, signer);
		const allowance = await erc20.allowance(owner, contract);
		const input = tryParseAmount(token.getToken(), token.amount).toExact();
		const inputToFixed = parseUnits(input, token.decimals);
		return allowance.gte(inputToFixed);
	}
	return true;
}
