import { Percent, TradeType } from "@uniswap/sdk-core";
import { Route, Trade, SwapRouter } from "@uniswap/v3-sdk";
import { parseUnits } from "ethers/lib/utils";
import { TokenExtended, ExtendedEther, TradeData, WrapType } from "../interfaces";
import { getMultiPool } from "../pools/searchMulti";
import { tryParseAmount } from "../utils";

//// V3 Only Deployment ////
////////////////////////////
export async function singleHop(
	recipient: string,
	token0: TokenExtended,
	token1: TokenExtended,
	amount: string
) {
	const ETHER = ExtendedEther.onChain(token0.chainId);
	const WETH = ETHER.wrapped;

	const etherIn = !token0.address;
	const etherOut = !token1.address;

	const inputAmount = etherIn
		? tryParseAmount(ETHER, amount)
		: tryParseAmount(token0.getToken(), amount);

	// Wrapping
	const wrapEther = token1.address == WETH.address && token0.address == "";
	const unwrapEther = token0.address == WETH.address && token1.address == "";
	if (wrapEther) {
		token1.amount = inputAmount.toExact();
		const inputFixed = parseUnits(inputAmount.toExact(), token0.decimals);
		return new TradeData([], inputFixed._hex, WrapType.WRAP);
	} else if (unwrapEther) {
		token1.amount = inputAmount.toExact();
		const inputFixed = parseUnits(inputAmount.toExact(), token0.decimals);
		return new TradeData([], inputFixed._hex, WrapType.UNWRAP);
	}

	let route, pool;
	if (etherIn) {
		pool = await getMultiPool(token1.getToken(), WETH, inputAmount.toExact(), true);
		route = pool ? new Route([pool], ETHER, token1.getToken()) : undefined;
	} else if (etherOut) {
		pool = await getMultiPool(token0.getToken(), WETH, inputAmount.toExact(), false);
		route = pool ? new Route([pool], token0.getToken(), ETHER) : undefined;
	} else {
		pool = await getMultiPool(
			token0.getToken(),
			token1.getToken(),
			inputAmount.toExact(),
			false
		);
		route = pool ? new Route([pool], token0.getToken(), token1.getToken()) : undefined;
	}

	// No single hop route found
	if (!route) {
		return new TradeData();
	}
	const trade = await Trade.fromRoute(route, inputAmount, TradeType.EXACT_INPUT);

	token1.amount = trade.outputAmount.toSignificant(6);
	token1.priceImpact = trade.priceImpact.toSignificant(2);

	const { calldata, value } = SwapRouter.swapCallParameters(trade, {
		recipient: recipient,
		slippageTolerance: new Percent(300, 10000),
		deadline: Math.floor(Date.now() / 1000) + 60 * 300
	});

	return new TradeData([calldata], value, WrapType.NONE);
}

export async function multiHop(
	recipient: string,
	token0: TokenExtended,
	token1: TokenExtended,
	amount: string
) {
	const ETHER = ExtendedEther.onChain(token0.chainId);
	const WETH = ETHER.wrapped;

	// Multihop only for routes without weth as input
	if (token0.address == WETH.address || token1.address == WETH.address) {
		return new TradeData();
	}

	const inputAmount = tryParseAmount(token0.getToken(), amount);

	const [to_WETH, from_WETH] = await Promise.all([
		getMultiPool(token0.getToken(), WETH, inputAmount.toExact(), false),
		getMultiPool(WETH, token1.getToken(), inputAmount.toExact(), false)
	]);

	if (!to_WETH || !from_WETH) {
		return new TradeData();
	}

	const trade = await Trade.fromRoute(
		new Route([to_WETH, from_WETH], token0.getToken(), token1.getToken()),
		inputAmount,
		TradeType.EXACT_INPUT
	);

	token1.amount = trade.outputAmount.toSignificant(6);
	token1.priceImpact = trade.priceImpact.toSignificant(2);

	const { calldata, value } = SwapRouter.swapCallParameters(trade, {
		slippageTolerance: new Percent(100, 10000),
		recipient: recipient,
		deadline: Math.floor(Date.now() / 1000) + 60 * 30
	});
	return new TradeData([calldata], value, WrapType.NONE);
}
