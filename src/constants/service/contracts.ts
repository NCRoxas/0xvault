interface BaseContractInterface {
	readonly UniswapV3Factory: string;
	readonly Multicall2: string;
	readonly TickLens: string;
	readonly Quoter: string;
	readonly SwapRouter: string;
	readonly SwapRouter02: string;
	readonly NFTDescriptor: string;
	readonly NonfungibleTokenPositionDescriptor: string;
	readonly NonfungiblePositionManager: string;
}

export const ContractInfo: BaseContractInterface = {
	// Uniswap Contracts
	UniswapV3Factory: "0x1f98431c8ad98523631ae4a59f267346ea31f984",
	Multicall2: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
	TickLens: "0xbfd8137f7d1516d3ea5ca83523914859ec47f573",
	Quoter: "0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6",
	SwapRouter: "0xe592427a0aece92de3edee1f18e0157c05861564",
	SwapRouter02: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
	NFTDescriptor: "0x42b24a95702b9986e82d421cc3568932790a48ec",
	NonfungibleTokenPositionDescriptor: "0x91ae842a5ffd8d12023116943e72a606179294f3",
	NonfungiblePositionManager: "0xc36442b4a4522e871399cd717abdd847ab11fe88"
};
