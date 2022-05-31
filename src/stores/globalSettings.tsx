import React, { Dispatch, SetStateAction } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";

interface GlobalProps {
	darkmode: boolean;
	notify: boolean;
	address: string;
	chainid: number;
	ether: string;
	label: string;
	signer: JsonRpcSigner;
	setGlobal: Dispatch<SetStateAction<GlobalProps>>;
}

const initialState = {
	darkmode: false,
	notify: false,
	address: "",
	chainid: 1,
	ether: "",
	label: "",
	signer: {} as JsonRpcSigner,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setGlobal: () => {}
};

export const GlobalContext = React.createContext<GlobalProps>(initialState);

export default ({ children }: React.PropsWithChildren<React.ReactNode>) => {
	const [global, setGlobal] = React.useState<GlobalProps>(initialState);
	const value = React.useMemo(() => {
		return { ...global, setGlobal };
	}, [global]);

	React.useEffect(() => {
		global.darkmode
			? document.body.classList.remove("dark")
			: document.body.classList.add("dark");
	}, [global.darkmode]);

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
