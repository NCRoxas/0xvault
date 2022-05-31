const SwapButton = () => {
	return (
		<>
			<div className="flex py-3 px-6 items-center">
				<button className="bg-gradient-to-r rounded-xl from-pink-500 to-purple-500 border-0 text-white text-lg w-full p-2.5 hover:from-red-600 focus:outline focus:outline-2 focus:outline-solid-sky-500">
					Swap
				</button>
				{/* <button className="bg-gradient-to-r rounded-xl from-blue-500 to-cyan-500 border-0 text-white text-lg w-full p-2.5 dark:from-blue-700 dark:to-cyan-500 hover:from-purple-600 focus:outline focus:outline-2 focus:outline-solid-sky-500">
					Approve
				</button>
				<button className="bg-gradient-to-r rounded-xl from-pink-500 to-purple-500 border-0 text-white text-lg w-full p-2.5 dark:from-pink-700 dark:to-purple-600 hover:from-red-600 focus:outline focus:outline-2 focus:outline-solid-sky-500">
					Connect wallet
				</button> */}
			</div>
		</>
	);
};

export default SwapButton;
