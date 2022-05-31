import { JsonRpcProvider } from "@ethersproject/providers";
import { hexValue } from "ethers/lib/utils";

enum ChainLogo {
	ETH = "/src/assets/chains/ethereum.svg",
	OPTIMISM = "/src/assets/chains/optimism.svg",
	ARBITRUM = "/src/assets/chains/arbitrum.svg",
	POLYGON = "/src/assets/chains/polygon.svg"
}
export enum SupportedChain {
	MAINNET = 1,
	RINKEBY = 4,

	ARBITRUM_ONE = 42161,
	ARBITRUM_RINKEBY = 421611,

	OPTIMISM = 10,
	OPTIMISTIC_KOVAN = 69,

	POLYGON = 137,
	POLYGON_MUMBAI = 80001,

	LOCALHOST = 31337
}
enum NetworkType {
	L1,
	L2
}

interface BaseChainInterface {
	readonly networkType: NetworkType;
	readonly testnet: boolean;
	readonly chainID: string;
	readonly docs: string;
	readonly bridge?: string;
	readonly explorer: string;
	readonly logoUrl: string;
	readonly rpc: string;
	readonly label: string;
	readonly provider: JsonRpcProvider;
	readonly nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
		chainId: number;
		address: string;
		logoURI: string;
	};
}

type ChainInfoMap = { readonly [chainId: number]: BaseChainInterface };

export const ChainInfo: ChainInfoMap = {
	[SupportedChain.MAINNET]: {
		networkType: NetworkType.L1,
		testnet: false,
		chainID: hexValue(SupportedChain.MAINNET),
		docs: "https://ethereum.org/",
		explorer: "https://etherscan.io/",
		rpc: "https://rpc.ankr.com/eth",
		label: "Ethereum",
		logoUrl: ChainLogo.ETH,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ETH, "homestead"),
		nativeCurrency: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
			address: "",
			chainId: SupportedChain.MAINNET,
			logoURI: "/src/assets/Ether.png"
		}
	},
	[SupportedChain.RINKEBY]: {
		networkType: NetworkType.L1,
		testnet: true,
		chainID: hexValue(SupportedChain.RINKEBY),
		docs: "https://ethereum.org/",
		explorer: "https://rinkeby.etherscan.io/",
		rpc: "https://rinkeby.infura.io/v3/",
		label: "Rinkeby",
		logoUrl: ChainLogo.ETH,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_RKB, "rinkeby"),
		nativeCurrency: {
			name: "Rinkeby Ether",
			symbol: "ETH",
			decimals: 18,
			address: "",
			chainId: SupportedChain.RINKEBY,
			logoURI: "/src/assets/Ether.png"
		}
	},
	[SupportedChain.OPTIMISM]: {
		networkType: NetworkType.L2,
		testnet: false,
		chainID: hexValue(SupportedChain.OPTIMISM),
		docs: "https://optimism.io/",
		explorer: "https://optimistic.etherscan.io/",
		bridge: "https://gateway.optimism.io/?chainId=1",
		rpc: "https://mainnet.optimism.io",
		label: "Optimism",
		logoUrl: ChainLogo.OPTIMISM,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_OPT, "optimism"),
		nativeCurrency: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
			address: "",
			chainId: SupportedChain.OPTIMISM,
			logoURI: "/src/assets/Ether.png"
		}
	},
	[SupportedChain.OPTIMISTIC_KOVAN]: {
		networkType: NetworkType.L2,
		testnet: true,
		chainID: hexValue(SupportedChain.OPTIMISTIC_KOVAN),
		docs: "https://optimism.io/",
		explorer: "https://optimistic.etherscan.io/",
		bridge: "https://gateway.optimism.io/",
		rpc: "https://kovan.optimism.io",
		label: "Optimistic Kovan",
		logoUrl: ChainLogo.OPTIMISM,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_OPT_KVN, "optimism-kovan"),
		nativeCurrency: {
			name: "Optimistic Kovan Ether",
			symbol: "ETH",
			decimals: 18,
			address: "",
			chainId: SupportedChain.OPTIMISTIC_KOVAN,
			logoURI: "/src/assets/Ether.png"
		}
	},
	[SupportedChain.ARBITRUM_ONE]: {
		networkType: NetworkType.L2,
		testnet: false,
		chainID: hexValue(SupportedChain.ARBITRUM_ONE),
		bridge: "https://bridge.arbitrum.io/",
		docs: "https://offchainlabs.com/",
		explorer: "https://arbiscan.io/",
		rpc: "https://arb1.arbitrum.io/rpc",
		label: "Arbitrum",
		logoUrl: ChainLogo.ARBITRUM,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ARB, "arbitrum"),
		nativeCurrency: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
			address: "",
			chainId: SupportedChain.ARBITRUM_ONE,
			logoURI: "/src/assets/Ether.png"
		}
	},
	[SupportedChain.ARBITRUM_RINKEBY]: {
		networkType: NetworkType.L2,
		testnet: true,
		chainID: hexValue(SupportedChain.ARBITRUM_RINKEBY),
		bridge: "https://bridge.arbitrum.io/",
		docs: "https://offchainlabs.com/",
		explorer: "https://rinkeby-explorer.arbitrum.io/",
		rpc: "https://rinkeby.arbitrum.io/rpc",
		label: "Arbitrum Rinkeby",
		logoUrl: ChainLogo.ARBITRUM,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ARB_RKB, "arbitrum-rinkeby"),
		nativeCurrency: {
			name: "Rinkeby Arbitrum Ether",
			symbol: "ETH",
			decimals: 18,
			address: "",
			chainId: SupportedChain.ARBITRUM_RINKEBY,
			logoURI: "/src/assets/Ether.png"
		}
	},
	[SupportedChain.POLYGON]: {
		networkType: NetworkType.L1,
		testnet: false,
		chainID: hexValue(SupportedChain.POLYGON),
		bridge: "https://wallet.polygon.technology/bridge",
		docs: "https://polygon.io/",
		explorer: "https://polygonscan.com/",
		rpc: "https://polygon-rpc.com",
		label: "Polygon",
		logoUrl: ChainLogo.POLYGON,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_PLY, "matic"),
		nativeCurrency: {
			name: "Polygon Matic",
			symbol: "MATIC",
			decimals: 18,
			address: "",
			chainId: SupportedChain.POLYGON,
			logoURI: "/src/assets/Matic.png"
		}
	},
	[SupportedChain.POLYGON_MUMBAI]: {
		networkType: NetworkType.L1,
		testnet: true,
		chainID: hexValue(SupportedChain.POLYGON_MUMBAI),
		bridge: "https://wallet.polygon.technology/bridge",
		docs: "https://polygon.io/",
		explorer: "https://mumbai.polygonscan.com/",
		rpc: "https://rpc-mumbai.maticvigil.com",
		label: "Polygon Mumbai",
		logoUrl: ChainLogo.POLYGON,
		provider: new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_PLY_MUM, "maticmum"),
		nativeCurrency: {
			name: "Polygon Mumbai Matic",
			symbol: "MATIC",
			decimals: 18,
			address: "",
			chainId: SupportedChain.POLYGON_MUMBAI,
			logoURI: "/src/assets/Matic.png"
		}
	},
	[SupportedChain.LOCALHOST]: {
		networkType: NetworkType.L1,
		testnet: true,
		chainID: hexValue(SupportedChain.LOCALHOST),
		docs: "https://ethereum.org/",
		explorer: "https://etherscan.io/",
		rpc: "http://localhost:8545",
		label: "Localhost",
		logoUrl: ChainLogo.ETH,
		provider: new JsonRpcProvider("http://localhost:8545", 31337),
		nativeCurrency: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
			address: "",
			chainId: 1,
			logoURI: "/src/assets/Ether.png"
		}
	}
};
