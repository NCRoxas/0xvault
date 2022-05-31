import React, { Dispatch, SetStateAction } from "react";
import { TokenExtended, TradeData } from "~/constants/uniswap/interfaces";

interface SwapProps {
	loading: boolean;
	allowance: boolean;
	token0: TokenExtended;
	token1: TokenExtended;
	trade: TradeData;
	setSwap: Dispatch<SetStateAction<SwapProps>>;
}

const initialState = {
	loading: false,
	allowance: true,
	token0: new TokenExtended(),
	token1: new TokenExtended(),
	trade: new TradeData(),
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setSwap: () => {}
};

export const SwapContext = React.createContext<SwapProps>(initialState);

export default ({ children }: React.PropsWithChildren<React.ReactNode>) => {
	const [swap, setSwap] = React.useState<SwapProps>(initialState);
	const value = React.useMemo(() => {
		return { ...swap, setSwap };
	}, [swap]);

	return <SwapContext.Provider value={value}>{children}</SwapContext.Provider>;
};
