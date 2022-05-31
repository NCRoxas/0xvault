import mainnet from "~/constants/tokens/mainnet.json";
import ropsten from "~/constants/tokens/ropsten.json";
import rinkeby from "~/constants/tokens/rinkeby.json";
import goerli from "~/constants/tokens/goerli.json";
import kovan from "~/constants/tokens/kovan.json";
import polygon from "~/constants/tokens/polygon.json";
import mumbai from "~/constants/tokens/mumbai.json";
import optimism from "~/constants/tokens/optimism.json";
import arbitrum from "~/constants/tokens/arbitrum.json";
import { ChainInfo } from "~/constants/chain";

function sortLists() {
	return [
		...mainnet,
		...ropsten,
		...goerli,
		...kovan,
		...rinkeby,
		...polygon,
		...mumbai,
		...optimism,
		...arbitrum
	].sort((t1, t2) => {
		if (t1.chainId === t2.chainId) {
			return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
		}
		return t1.chainId < t2.chainId ? -1 : 1;
	});
}

export function tokenList(chainID: number) {
	const sorted = sortLists();
	sorted.unshift(ChainInfo[chainID].nativeCurrency); // Add ether
	const unique = [
		...new Map(sorted.map((item) => [item["address"].toLowerCase(), item])).values()
	];
	const local = chainID == 31337 ? 1 : chainID; // TODO: Remove in prod
	return unique.filter(({ chainId }) => chainId == local);
}
