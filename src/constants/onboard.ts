import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseModule from "@web3-onboard/coinbase";

const injected = injectedModule();
const coinbase = coinbaseModule();
const walletConnect = walletConnectModule();

export const onboard = Onboard({
	wallets: [injected, coinbase, walletConnect],
	chains: [
		{
			id: "0x1",
			token: "ETH",
			label: "Ethereum Mainnet",
			rpcUrl: `https://rpc.ankr.com/eth`
		},
		{
			id: "0x4",
			token: "ETH",
			label: "Ethereum Rinkeby Testnet",
			rpcUrl: `https://rpc.ankr.com/eth`
		},
		{
			id: "0xa",
			token: "ETH",
			label: "Optimism",
			rpcUrl: `https://mainnet.optimism.io`
		},
		{
			id: "0xa4b1",
			token: "ETH",
			label: "Arbitrum One",
			rpcUrl: `https://rpc.ankr.com/arbitrum`
		},
		{
			id: "0x89",
			token: "MATIC",
			label: "Polygon Mainnet",
			rpcUrl: "https://polygon-rpc.com"
		},
		{
			id: "0x7a69",
			token: "ETH",
			label: "Localhost",
			rpcUrl: "http://localhost:8545"
		}
	],
	accountCenter: {
		desktop: {
			enabled: false
		}
	},
	appMetadata: {
		name: "Mizuchi",
		icon: "/src/assets/logo.svg",
		logo: "/src/assets/logo.svg",
		description: "Uniswap aggregator",
		recommendedInjectedWallets: [
			{ name: "MetaMask", url: "https://metamask.io" },
			{ name: "Coinbase", url: "https://wallet.coinbase.com/" }
		],
		agreement: {
			version: "1.0.0",
			termsUrl: "https://google.com",
			privacyUrl: "https://google.com"
		}
	},
	i18n: {
		en: {
			connect: {
				selectingWallet: {
					header: "Select one of these wallets",
					sidebar: {
						heading: "Welcome!",
						subheading: "Connect your Wallet",
						paragraph: "Select your wallet from the options to get started."
					},
					agreement: {
						agree: "I agree to the",
						terms: "Terms & Conditions",
						and: "and",
						privacy: "Privacy Policy."
					}
				}
			}
		}
	}
});
