import SwapMenu from "~/components/swap/SwapMenu";
import SwapInput from "~/components/swap/SwapInput";
import SwapButton from "~/components/swap/SwapButton";
import SwapProvider from "~/stores/swapStore";

function Home() {
	return (
		<div className="container flex flex-col mx-auto text-white p-24 items-center justify-center">
			<div className="bg-gray-800 rounded-3xl w-screen sm:w-100">
				<SwapProvider>
					<SwapMenu />

					<SwapInput />

					<SwapButton />
				</SwapProvider>
			</div>
		</div>
	);
}

export default Home;
