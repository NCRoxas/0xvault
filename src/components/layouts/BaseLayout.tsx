import Settings from "~/components/utilities/Settings";
import MetaMask from "~/components/utilities/MetaMask";
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "~/stores/globalSettings";

function Header() {
	return (
		<div className="bg-white dark:bg-gray-800 w-screen py-2.5">
			<div className="container flex mx-auto text-light-50 justify-between items-center lg:px-16">
				<div className="flex space-x-6 items-center">
					<Link to="/" className="flex items-center">
						<img src="/src/assets/logo.svg" alt="logo" className="h-9 mx-3" />
						<div className="hidden md:block">
							<span
								style={{ fontFamily: "robaga", fontStyle: "italic" }}
								className="text-3xl text-gray-800 dark:text-white">
								0xVault
							</span>
						</div>
					</Link>
				</div>
				<div className="flex items-center">
					<MetaMask />
					<Settings />
					<button
						type="button"
						className="rounded-lg text-xl text-white px-3 inline-flex items-center md:hidden focus:outline-none">
						<span className="sr-only">Open menu</span>
					</button>
				</div>
			</div>
		</div>
	);
}

function Footer() {
	const { darkmode } = React.useContext(GlobalContext);

	return (
		<div className="bg-white flex flex-wrap flex-col mx-auto w-screen px-16 pt-4 md:flex-row md:flex-nowrap md:items-start dark:bg-gray-800">
			<div className="mx-auto flex-shrink-0 text-center px-4 md:mx-0 md:text-left">
				<Link
					to="/swap"
					className="flex font-medium shadow-md p-3 shadow-pink-500 title-font items-center justify-center">
					{darkmode ? (
						<img src="/src/assets/logo-black.svg" alt="" className="mr-2 w-8" />
					) : (
						<img src="/src/assets/logo-white.svg" alt="" className="mr-2 w-8" />
					)}
					<span
						style={{ fontFamily: "robaga", fontStyle: "italic" }}
						className="text-3xl text-gray-800 dark:text-white">
						0xVault
					</span>
				</Link>
			</div>
			<div className="flex-grow flex flex-wrap mt-10 text-center md:mt-0 md:text-left md:pl-20">
				<div className="w-full px-4 md:w-1/2 lg:w-1/4">
					<h2 className="font-medium text-md mb-3 tracking-widest text-gray-900 title-font dark:text-gray-400">
						Community
					</h2>
					<nav className="list-none text-sm mb-10 text-gray-600 dark:text-gray-300">
						<li>
							<a href="#" className="hover:text-red-400">
								Telegram
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-red-400">
								Discord
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-red-400">
								Twitter
							</a>
						</li>
					</nav>
				</div>
				<div className="w-full px-4 md:w-1/2 lg:w-1/4">
					<h2 className="font-medium text-md mb-3 tracking-widest text-gray-900 title-font dark:text-gray-400">
						Resources
					</h2>
					<nav className="list-none text-sm mb-10 text-gray-600 dark:text-gray-300">
						<li>
							<a href="#" className="hover:text-red-400">
								Documentation
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-red-400">
								Github
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-red-400">
								News
							</a>
						</li>
					</nav>
				</div>
			</div>
		</div>
	);
}

const BaseLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className="flex flex-col h-screen w-screen tornado">
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export default BaseLayout;
