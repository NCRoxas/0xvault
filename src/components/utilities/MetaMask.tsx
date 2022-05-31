import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { GlobalContext } from "~/stores/globalSettings";
import { onboard } from "~/constants/onboard";
import { WalletState } from "@web3-onboard/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "ethers/lib/utils";

const MetaMask = () => {
	const [open, setOpen] = React.useState(false);
	const [copyBtn, setCopyBtn] = React.useState("Copy");
	const { address, chainid, ether, label, setGlobal } = React.useContext(GlobalContext);

	const updateWallet = async (wallet: WalletState) => {
		const signer = new Web3Provider(wallet.provider, "any").getSigner();
		const balance = formatEther(await signer.getBalance());

		setGlobal((prevGlobal) => ({
			...prevGlobal,
			label: wallet.label,
			chainid: parseInt(wallet.chains[0].id, 16),
			address: wallet.accounts[0].address,
			ether: balance,
			signer: signer
		}));
	};

	const sub = onboard.state.select("wallets");
	const { unsubscribe } = sub.subscribe((wallets) => {
		const connectedChain = wallets.map(({ chains }) => parseInt(chains[0].id, 16));
		if (connectedChain[0] != chainid) {
			updateWallet(wallets[0]);
		}
		const connectedAddress = wallets.map(({ accounts }) => accounts[0].address);
		if (connectedAddress[0] != address) {
			updateWallet(wallets[0]);
		}
		const connectedWallets = wallets.map(({ label }) => label);
		window.localStorage.setItem("connectedWallets", JSON.stringify(connectedWallets));
	});

	const connect = async () => {
		const wallet = await onboard.connectWallet();
		updateWallet(wallet[0]);
	};

	const disconnect = async () => {
		unsubscribe;
		// await onboard.disconnectWallet({ label: label });
	};

	const copyAddress = async () => {
		await navigator.clipboard.writeText(address);
		setCopyBtn("Copied!");
		setTimeout(() => {
			setCopyBtn("Copy");
		}, 2000);
	};

	const currentWallet = localStorage.getItem("connectedWallets");
	const connected = currentWallet ? JSON.parse(currentWallet) : "";

	React.useEffect(() => {
		(async () => {
			if (connected.length > 0 && !address) {
				const wallet = await onboard.connectWallet({
					autoSelect: {
						label: connected[0],
						disableModals: true
					}
				});
				updateWallet(wallet[0]);
			}
		})();
	}, [connected]);

	return (
		<>
			{connected.length > 0 ? (
				<button
					onClick={() => setOpen(true)}
					className="flex flex-row justify-center items-center bg-gradient-to-r rounded-xl font-medium bg-blue-600 from-purple-600 to-blue-700 text-white text-sm p-2 sm:p-1.5 hover:to-blue-500 focus:outline-none">
					<div className="pr-1 pl-2">
						<Icon icon="logos:metamask-icon" className="h-5 mr-1 w-5 align-middle" />
					</div>
					<div className="pr-4">{ether.slice(0, 6)}Ξ</div>
					<div className="rounded-xl bg-dark-200/[0.6] mr-1 py-1 px-4 hidden sm:block">
						{address.slice(0, 6) + "..."}
					</div>
				</button>
			) : (
				<button
					type="button"
					onClick={connect}
					className="flex justify-center items-center bg-gradient-to-r rounded-xl font-medium text-white text-sm py-2.5 px-5 bg-blue-600 from-cyan-600 to-blue-700 hover:to-blue-500 focus:outline-none">
					<Icon icon="logos:metamask-icon" className="h-5 w-5 md:mr-2" />
					<span className="hidden sm:block">Connect Wallet</span>
				</button>
			)}

			<Transition appear show={open} as={Fragment}>
				<Dialog as="div" onClose={() => setOpen(false)}>
					<div className="inset-0 fixed overflow-y-auto">
						<div className="min-h-screen text-center px-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0">
								<Dialog.Overlay className="bg-black bg-opacity-50 inset-0 transition-opacity fixed" />
							</Transition.Child>

							<span className="h-screen inline-block align-middle" aria-hidden="true">
								{" "}
								&#8203;{" "}
							</span>

							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0">
								<div className="bg-white max-w-lg rounded-2xl shadow-xl my-8 text-left w-full p-6 transform transition-all inline-block overflow-hidden dark:bg-gray-800 dark:text-white">
									<Dialog.Title as="h3" className="font-medium text-lg leading-6">
										Account
									</Dialog.Title>

									<div className="bg-gradient-to-r rounded-xl from-indigo-600 to-pink-700 grid p-8 gap-4 grid-cols-3">
										<div className="flex flex-col text-sm">
											Balance:
											<span className="font-semibold text-md">
												{ether.slice(0, 8)}Ξ
											</span>
										</div>
										<div className="flex flex-col text-sm">
											Network:
											<span className="font-semibold text-md">Ethereum</span>
										</div>
										<div className="flex flex-col text-sm">
											Wallet:
											<span className="font-semibold text-md">{label}</span>
										</div>
									</div>

									<div className="bg-gradient-to-r rounded-xl flex from-cyan-600 to-blue-700 mt-3 text-sm p-4 items-center">
										<div className="rounded-full bg-amber-400/[0.7] mr-2 p-1">
											<Icon
												icon="logos:metamask-icon"
												className="h-5 w-5 align-middle"
											/>
										</div>
										{address}
									</div>

									<div className="flex mt-8 justify-around">
										<button
											onClick={copyAddress}
											type="button"
											className="flex flex-row text-white text-sm items-center hover:text-gray-400 focus:outline-none">
											<Icon
												icon="bxs:copy"
												className="h-4 mr-1 w-4 align-middle"
											/>
											{copyBtn}
										</button>
										<a
											href="ChainInfo[getChainID].explorer + 'address/' + getAddress"
											target="_blank"
											className="flex flex-row text-white text-sm items-center hover:text-gray-400 focus:outline-none">
											<Icon
												icon="akar-icons:link-chain"
												className="h-4 mr-1 w-4 align-middle"
											/>
											Explorer
										</a>
										<button
											onClick={disconnect}
											type="button"
											className="flex flex-row text-white text-sm items-center hover:text-gray-400 focus:outline-none">
											<Icon
												icon="heroicons-outline:logout"
												className="h-4 mr-1 w-4 align-middle"
											/>
											Disconnect
										</button>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default MetaMask;
