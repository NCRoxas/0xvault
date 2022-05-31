import React from "react";
import { Icon } from "@iconify/react";
import { SwapContext } from "~/stores/swapStore";
import { SwapSelect } from "./SwapSelect";
import { TokenExtended } from "~/constants/uniswap/interfaces";

const SwapInput = () => {
	const { token0, token1, loading, setSwap } = React.useContext(SwapContext);
	const [open0, setOpen0] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);

	const setAmount0 = (e: any) => {
		setSwap((prevSwap) => ({
			...prevSwap,
			token0: { ...prevSwap.token0, amount: e.target.value }
		}));
	};

	const setAmount1 = (e: any) => {
		setSwap((prevSwap) => ({
			...prevSwap,
			token1: { ...prevSwap.token1, amount: e.target.value }
		}));
	};

	const setToken0 = (data: any) => {
		setSwap((prevSwap) => ({
			...prevSwap,
			token0: Object.assign(new TokenExtended(), data)
		}));
	};

	const setToken1 = (data: any) => {
		setSwap((prevSwap) => ({
			...prevSwap,
			token1: Object.assign(new TokenExtended(), data)
		}));
	};

	return (
		<>
			<div className="flex m-3 px-3 relative items-center">
				<input
					value={token0.amount}
					onChange={setAmount0}
					type="text"
					placeholder="0.0"
					className="rounded-xl text-xl w-full py-8 px-4 pr-10 placeholder-slate-300 relative dark:bg-gray-700 dark:placeholder-slate-400 focus:outline-none focus:ring"
				/>
				<span className="rounded text-center text-lg right-6 absolute">
					<button
						onClick={() => setOpen0(true)}
						className="bg-blue-600 rounded-2xl text-white text-sm py-2 px-3 hover:bg-blue-700"
						tabIndex={-1}>
						{(() => {
							if (token0.address) {
								return (
									<div className="flex items-center">
										<img
											src={token0.logoURI}
											alt=""
											className="rounded-2xl h-6 mr-2 w-6"
										/>
										<span className="font-bold text-md">{token0.symbol}</span>
									</div>
								);
							} else {
								return (
									<div className="flex flex-row items-center">
										<div className="mr-1">Select a token</div>
										<Icon
											icon="akar-icons:triangle-down"
											className="align-middle"
										/>
									</div>
								);
							}
						})()}
					</button>
				</span>
			</div>

			<div className="flex flex-col pt-1 pb-5 items-center">
				<button className="rounded-full absolute" tabIndex={-1}>
					<Icon
						icon="bi:arrow-down-circle-fill"
						className="h-5 w-5 hover:animate-pulse hover:text-gray-500"
					/>
				</button>
			</div>

			<div className="flex m-3 px-3 relative items-center">
				<input
					value={token1.amount}
					onChange={setAmount1}
					type="text"
					placeholder="0.0"
					className="rounded-xl text-xl w-full py-8 px-4 pr-10 placeholder-slate-300 relative dark:bg-gray-700 dark:placeholder-slate-400 focus:outline-none focus:ring"
				/>
				<span className="rounded text-center text-lg right-6 absolute">
					<button
						onClick={() => setOpen1(true)}
						className="font-medium bg-blue-600 rounded-2xl text-white text-sm py-2 px-3 hover:bg-blue-700"
						tabIndex={-1}>
						{token1.name ? (
							<div className="flex items-center">
								<img
									src={token1.logoURI}
									alt=""
									className="rounded-2xl h-6 mr-2 w-6"
								/>
								<span className="font-bold text-md">{token1.symbol}</span>
							</div>
						) : (
							<div className="flex flex-row items-center">
								<div className="mr-1">Select a token</div>
								<Icon icon="akar-icons:triangle-down" className="align-middle" />
							</div>
						)}
					</button>
				</span>
			</div>

			{loading ? (
				<div className="flex px-6">
					<div className="p-3 relative overflow-hidden">
						<div className="border-transparent rounded-full m-auto border-2 border-t-red-500 top-0 right-0 bottom-0 left-0 spinner-ring absolute"></div>
						<div className="border-transparent rounded-full m-auto border-2 border-t-red-500 top-0 right-0 bottom-0 left-0 spinner-ring absolute"></div>
						<div className="border-transparent rounded-full m-auto border-2 border-t-red-500 top-0 right-0 bottom-0 left-0 spinner-ring absolute"></div>
					</div>
					<span className="text-sm ml-3 animate-pulse dark:text-gray-400">
						Fetching Prices...
					</span>
				</div>
			) : null}

			{token1.priceImpact ? (
				<div className="flex flex-row-reverse px-6">
					<span className="rounded text-xs text-gray-700 dark:text-gray-300">
						Price Impact:
						<span className="text-red-600 dark:text-red-400">
							{token1.priceImpact} %
						</span>
					</span>
				</div>
			) : null}

			<SwapSelect isOpen={open0} closeModal={() => setOpen0(false)} setToken={setToken0} />
			<SwapSelect isOpen={open1} closeModal={() => setOpen1(false)} setToken={setToken1} />
		</>
	);
};

export default SwapInput;
