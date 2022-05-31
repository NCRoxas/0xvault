import { Token, CurrencyAmount, Price, Fraction } from "@uniswap/sdk-core";
import {
	FeeAmount,
	encodeSqrtRatioX96,
	TickMath,
	priceToClosestTick,
	nearestUsableTick,
	TICK_SPACINGS
} from "@uniswap/v3-sdk";
import { ethers, BigNumber } from "ethers";
import { ExtendedEther } from "./interfaces";

export function tryParseAmount(token: Token | ExtendedEther, amount: string) {
	// fails if the user specifies too many decimal places of precision
	try {
		const input = ethers.utils.parseUnits(amount, token.decimals);
		if (input !== undefined) {
			return CurrencyAmount.fromRawAmount(token, input.toString());
		}
		// eslint-disable-next-line no-empty
	} catch (error) {}
	return CurrencyAmount.fromRawAmount(token, "0");
}

export function tryParsePrice(baseToken?: Token, quoteToken?: Token, value?: string) {
	if (!baseToken || !quoteToken || !value) {
		return undefined;
	}

	if (!value.match(/^\d*\.?\d+$/)) {
		return undefined;
	}

	const [whole, fraction] = value.split(".");

	const decimals = fraction?.length ?? 0;
	const withoutDecimals = BigNumber.from((whole ?? "") + (fraction ?? ""));

	return new Price(
		baseToken,
		quoteToken,
		BigNumber.from(10).pow(decimals).mul(BigNumber.from(10).pow(baseToken.decimals)).toString(),
		withoutDecimals.mul(BigNumber.from(10).pow(quoteToken.decimals)).toString()
	);
}

export function tryParseTick(
	baseToken?: Token,
	quoteToken?: Token,
	feeAmount?: FeeAmount,
	value?: string
): number | undefined {
	if (!baseToken || !quoteToken || !feeAmount || !value) {
		return undefined;
	}

	const price = tryParsePrice(baseToken, quoteToken, value);

	if (!price) {
		return undefined;
	}

	let tick: number;

	// check price is within min/max bounds, if outside return min/max
	const sqrtRatioX96 = BigNumber.from(
		encodeSqrtRatioX96(price.numerator, price.denominator).toString()
	);

	if (sqrtRatioX96.gte(TickMath.MAX_SQRT_RATIO.toString())) {
		tick = TickMath.MAX_TICK;
	} else if (sqrtRatioX96.lte(TickMath.MIN_SQRT_RATIO.toString())) {
		tick = TickMath.MIN_TICK;
	} else {
		tick = priceToClosestTick(price);
	}

	return nearestUsableTick(tick, TICK_SPACINGS[feeAmount]);
}