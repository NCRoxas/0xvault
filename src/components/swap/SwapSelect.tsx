import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { tokenList } from "~/constants/service/lists";
import { Token } from "@uniswap/sdk-core";

export const SwapSelect = ({
	isOpen,
	closeModal,
	setToken
}: {
	isOpen: boolean;
	closeModal: () => void;
	setToken: (data: Token) => void;
}) => {
	const initTokens = tokenList(1);
	const [search, setSearch] = React.useState("");
	const [tokens, setTokens] = React.useState(initTokens);

	const mostUsed = initTokens.filter((item) => {
		const query = ["WETH", "WBTC", "DAI", "USDC", "USDT"];
		return query.find((element) => {
			return element === item.symbol;
		});
	});

	React.useEffect(() => {
		search
			? setTokens(
					initTokens.filter(({ symbol }) => {
						return symbol.toLowerCase().includes(search.toLowerCase());
					})
			)
			: setTokens(initTokens);
	}, [search]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" onClose={closeModal}>
				<div className="inset-0 fixed overflow-y-auto">
					<div className="text-center text-white">
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

						<span
							className="h-screen inline-block align-middle"
							aria-hidden="true"></span>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<div className="max-w-md bg-gray-800 rounded-2xl shadow-xl text-left w-full max-h-2xl transform transition-all relative inline-block overflow-auto align-middle">
								<Dialog.Title
									as="h3"
									className="bg-gray-800 text-lg w-full py-4 px-6 top-0 z-10 sticky">
									Select a token
									<input
										value={search}
										onChange={(e) => {
											setSearch(e.target.value);
										}}
										type="text"
										placeholder="Search..."
										className="bg-white rounded-lg outline-none border-0 shadow mt-3 text-sm w-full py-3 px-3 placeholder-slate-500 text-slate-600 relative focus:outline-none focus:ring"
									/>
									<div className="flex flex-row flex-wrap mt-2">
										{mostUsed.map((token, index) => (
											<button
												key={index}
												onClick={() => {
													setToken(token);
													closeModal();
												}}
												className="flex bg-gray-600 rounded-2xl m-1 p-1 focus:outline-none">
												<img
													src={token.logoURI}
													alt=""
													className="rounded-2xl h-7 w-7"
													onError={({ currentTarget }) => {
														currentTarget.onerror = null;
														currentTarget.src =
															"~/assets/not-found.png";
													}}
												/>
												<span className="font-semibold mx-2 text-base">
													{token.symbol}
												</span>
											</button>
										))}
									</div>
								</Dialog.Title>
								{tokens.map((token, index) => (
									<button
										key={index}
										onClick={() => {
											setToken(token);
											closeModal();
										}}
										className="rounded-xl flex my-3 text-left w-full px-6 items-center hover:bg-slate-600/[0.4] focus:outline-none">
										<img
											src={token.logoURI}
											alt=""
											className="rounded-2xl h-7 w-7"
											onError={({ currentTarget }) => {
												currentTarget.onerror = null;
												currentTarget.src = "~/assets/not-found.png";
											}}
										/>
										<div className="pl-3">
											<span className="font-bold text-md block">
												{token.symbol}
											</span>
											<span className="text-sm block text-gray-500">
												{token.name}
											</span>
										</div>
									</button>
								))}
								<div className="right-0 bottom-0 left-0 sticky">
									<button className="rounded-md bg-gray-600 border-0 mt-4 text-lg w-full p-2 hover:bg-gray-500 focus:outline-none">
										Manage Token Lists
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
