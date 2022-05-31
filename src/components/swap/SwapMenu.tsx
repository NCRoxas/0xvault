import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Icon } from "@iconify/react";

const SwapMenu = () => {
	return (
		<div className="flex py-4 px-6 relative items-center">
			<h1 className="font-bold text-xl">Swap</h1>

			<Popover className="right-0 absolute">
				<Popover.Button className="pr-4">
					<Icon icon="bi:gear-fill" />
				</Popover.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-200"
					enterFrom="opacity-0 translate-y-1"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 translate-y-1">
					<Popover.Panel className="max-w-sm w-screen px-4 transform left-1/2 z-10 -translate-x-1/2 absolute">
						<div className="rounded-lg shadow-lg ring-black ring-1 ring-opacity-5 overflow-hidden">
							<div className="bg-light-500 grid py-5 px-7 gap-2 grid-cols-1 relative dark:bg-gray-700">
								<span className="text-sm">Slippage in percent:</span>

								<div className="text-gray-600 relative focus-within:text-gray-400">
									<input
										type="text"
										placeholder="0.5"
										className="rounded-xl bg-slate-400 text-md w-full py-2 pr-10 pl-5 placeholder-slate-200 dark:bg-gray-800 dark:placeholder-slate-400 focus:outline-none focus:ring"
									/>
									<span className="flex pr-3 inset-y-0 right-0 absolute items-center">
										<Icon icon="fa6-solid:percent" className="h-5 w-5" />
									</span>
								</div>

								<span className="text-sm">Deadline in minutes:</span>

								<div className="text-gray-600 relative focus-within:text-gray-400">
									<input
										type="text"
										placeholder="0.5"
										className="rounded-xl bg-slate-400 text-md w-full py-2 pr-10 pl-5 placeholder-slate-200 dark:bg-gray-800 dark:placeholder-slate-400 focus:outline-none focus:ring"
									/>
									<span className="flex pr-3 inset-y-0 right-0 absolute items-center">
										<Icon icon="fa6-solid:clock" className="h-5 w-5" />
									</span>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		</div>
	);
};

export default SwapMenu;
