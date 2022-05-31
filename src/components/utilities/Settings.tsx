import React, { Fragment } from "react";
import { Popover, Transition, Switch } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { GlobalContext } from "~/stores/globalSettings";

const Settings = () => {
	const { darkmode, notify, setGlobal } = React.useContext(GlobalContext);

	const currentMode = localStorage.getItem("darkmode");
	const darkmodeWatch = currentMode == null ? false : JSON.parse(currentMode);
	// setGlobal((prevGlobal) => ({ ...prevGlobal, darkmode: darkmodeWatch }));
	
	const toggleDarkmode = () => {
		localStorage.setItem("darkmode", JSON.stringify(!darkmode));
		setGlobal((prevGlobal) => ({ ...prevGlobal, darkmode: !darkmode }));
	};

	const toggleNotify = () => {
		setGlobal((prevGlobal) => ({ ...prevGlobal, notify: !notify }));
	};

	return (
		<Popover className="z-10 hidden relative md:flex">
			<Popover.Button className="text-lg ml-4 pt-1 text-gray-100 dark:text-white hover:text-gray-400">
				<Icon icon="ph:gear-six-fill" />
			</Popover.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1">
				<Popover.Panel className="bg-white rounded-lg mt-13 p-4 transform text-gray-900 w-350px -translate-x-80 absolute dark:bg-blue-gray-800 dark:text-white">
					<h1 className="font-bold text-xl mb-3">Settings</h1>
					<div className="grid gap-4 grid-cols-2">
						<div className="rounded-lg bg-gray-200 w-full p-6 dark:bg-gray-900">
							<h5 className="font-medium text-lg leading-tight mb-4">Darkmode</h5>
							<div className="flex flex-row">
								<Icon icon="bi:moon-stars-fill" className="h-5 mr-6 w-5" />
								<Switch
									checked={darkmode}
									onChange={toggleDarkmode}
									className={`${
										darkmode ? "bg-black" : "bg-blue-600"
									} rounded-full h-6 w-11 relative inline-flex items-center`}>
									<span className="sr-only">Enable darkmode</span>
									<span
										aria-hidden="true"
										className={`${darkmode ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
									/>
								</Switch>
							</div>
						</div>
						<div className="rounded-lg bg-gray-200 w-full p-6 dark:bg-gray-900">
							<h5 className="font-medium text-lg leading-tight mb-4">
								Notifications
							</h5>
							<div className="flex flex-row">
								<Icon icon="ci:notification" className="h-6 mr-6 w-6" />
								<Switch
									checked={notify}
									onChange={toggleNotify}
									className={`${
										notify ? "bg-black" : "bg-blue-600"
									} rounded-full h-6 w-11 relative inline-flex items-center`}>
									<span className="sr-only">Notifications</span>
									<span
										aria-hidden="true"
										className={`${notify ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
									/>
								</Switch>
							</div>
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export default Settings;
