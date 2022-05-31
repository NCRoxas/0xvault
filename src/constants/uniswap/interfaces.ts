import { NativeCurrency, Currency, Token, WETH9, Ether } from "@uniswap/sdk-core";
import { BytesLike, BigNumber } from "ethers";
import { SupportedChain } from "../chain";

export interface Immutables {
	factory: string;
	token0: string;
	token1: string;
	fee: number;
	tickSpacing: number;
	maxLiquidityPerTick: BigNumber;
}

export interface State {
	liquidity: BigNumber;
	sqrtPriceX96: BigNumber;
	tick: number;
	observationIndex: number;
	observationCardinality: number;
	observationCardinalityNext: number;
	feeProtocol: number;
	unlocked: boolean;
}

export enum WrapType {
	WRAP,
	UNWRAP,
	NONE
}

export class TokenExtended {
	constructor(
		public chainId: number = 1,
		public address: string = "",
		public decimals: number = 18,
		public symbol: string = "",
		public name: string = "",
		public logoURI: string = "",
		public amount: string = "",
		public balance: string = "0",
		public priceImpact: string = ""
	) {
		this.chainId = chainId;
		this.address = address;
		this.decimals = decimals;
		this.symbol = symbol;
		this.name = name;
		this.logoURI = logoURI;
		this.amount = amount;
		this.balance = balance;
		this.priceImpact = priceImpact;
	}

	// setBalance(balance: userBalance[]) {
	// 	const list = balance.find((item) => {
	// 		return item.address === this.address;
	// 	});
	// 	this.balance = list?.amount ?? "0";
	// }

	getToken() {
		return new Token(this.chainId, this.address, this.decimals, this.symbol, this.name);
	}
}

export class TradeData {
	constructor(
		public calldata: BytesLike[] = [],
		public value = "0",
		public wrap = WrapType.NONE
	) {
		this.calldata = calldata;
		this.value = value;
		this.wrap = wrap;
	}
}

export class SwapConfig {
	constructor(public slippage = 0.5, public deadline = 20) {
		this.slippage = slippage;
		this.deadline = deadline;
	}
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
	...(WETH9 as Record<SupportedChain, Token>),
	[SupportedChain.OPTIMISM]: new Token(
		SupportedChain.OPTIMISM,
		"0x4200000000000000000000000000000000000006",
		18,
		"WETH",
		"Wrapped Ether"
	),
	[SupportedChain.OPTIMISTIC_KOVAN]: new Token(
		SupportedChain.OPTIMISTIC_KOVAN,
		"0x4200000000000000000000000000000000000006",
		18,
		"WETH",
		"Wrapped Ether"
	),
	[SupportedChain.ARBITRUM_ONE]: new Token(
		SupportedChain.ARBITRUM_ONE,
		"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
		18,
		"WETH",
		"Wrapped Ether"
	),
	[SupportedChain.ARBITRUM_RINKEBY]: new Token(
		SupportedChain.ARBITRUM_RINKEBY,
		"0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681",
		18,
		"WETH",
		"Wrapped Ether"
	),
	[SupportedChain.POLYGON]: new Token(
		SupportedChain.POLYGON,
		"0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
		18,
		"WMATIC",
		"Wrapped MATIC"
	),
	[SupportedChain.POLYGON_MUMBAI]: new Token(
		SupportedChain.POLYGON_MUMBAI,
		"0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
		18,
		"WMATIC",
		"Wrapped MATIC"
	)
};

function isMatic(
	chainId: number
): chainId is SupportedChain.POLYGON | SupportedChain.POLYGON_MUMBAI {
	return chainId === SupportedChain.POLYGON_MUMBAI || chainId === SupportedChain.POLYGON;
}

class MaticNativeCurrency extends NativeCurrency {
	equals(other: Currency): boolean {
		return other.isNative && other.chainId === this.chainId;
	}

	get wrapped(): Token {
		if (!isMatic(this.chainId)) throw new Error("Not matic");
		const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
		return wrapped!;
	}

	public constructor(chainId: number) {
		if (!isMatic(chainId)) throw new Error("Not matic");
		super(chainId, 18, "MATIC", "Polygon Matic");
	}
}

export class ExtendedEther extends Ether {
	public get wrapped(): Token {
		const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
		if (wrapped) return wrapped;
		throw new Error("Unsupported chain ID");
	}

	private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {};

	public static onChain(chainId: number): ExtendedEther {
		return (
			this._cachedExtendedEther[chainId] ??
			(this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
		);
	}
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {};
export function nativeOnChain(chainId: number): NativeCurrency {
	return (
		cachedNativeCurrency[chainId] ??
		(cachedNativeCurrency[chainId] = isMatic(chainId)
			? new MaticNativeCurrency(chainId)
			: ExtendedEther.onChain(chainId))
	);
}
