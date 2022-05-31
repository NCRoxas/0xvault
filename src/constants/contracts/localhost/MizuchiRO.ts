/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export declare namespace IMizuchiRO {
  export type CreateOrderParamsStruct = {
    token0: string;
    token1: string;
    fee: BigNumberish;
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
    amountIn0: BigNumberish;
    amountIn1: BigNumberish;
    slippage: BigNumberish;
  };

  export type CreateOrderParamsStructOutput = [
    string,
    string,
    number,
    number,
    number,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    token0: string;
    token1: string;
    fee: number;
    tickLower: number;
    tickUpper: number;
    amountIn0: BigNumber;
    amountIn1: BigNumber;
    slippage: BigNumber;
  };
}

export interface MizuchiROInterface extends utils.Interface {
  functions: {
    "amountToWithdraw(uint256)": FunctionFragment;
    "cancelOrder(uint256)": FunctionFragment;
    "createOrder((address,address,uint24,int24,int24,uint256,uint256,uint128))": FunctionFragment;
    "factory()": FunctionFragment;
    "fillOrder(uint256,uint128)": FunctionFragment;
    "getBalance()": FunctionFragment;
    "getPosition(uint256)": FunctionFragment;
    "manager()": FunctionFragment;
    "orders(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "amountToWithdraw"
      | "cancelOrder"
      | "createOrder"
      | "factory"
      | "fillOrder"
      | "getBalance"
      | "getPosition"
      | "manager"
      | "orders"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "amountToWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createOrder",
    values: [IMizuchiRO.CreateOrderParamsStruct]
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "fillOrder",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPosition",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "orders",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "amountToWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fillOrder", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "orders", data: BytesLike): Result;

  events: {};
}

export interface MizuchiRO extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MizuchiROInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    amountToWithdraw(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    cancelOrder(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createOrder(
      params: IMizuchiRO.CreateOrderParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    fillOrder(
      tokenId: BigNumberish,
      slippage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBalance(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    getPosition(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { tokenId: BigNumber }>;

    manager(overrides?: CallOverrides): Promise<[string]>;

    orders(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, number, number, number, boolean] & {
        owner: string;
        token0: string;
        token1: string;
        liquidity: BigNumber;
        fee: number;
        tickLower: number;
        tickUpper: number;
        _isDeleted: boolean;
      }
    >;
  };

  amountToWithdraw(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  cancelOrder(
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createOrder(
    params: IMizuchiRO.CreateOrderParamsStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  factory(overrides?: CallOverrides): Promise<string>;

  fillOrder(
    tokenId: BigNumberish,
    slippage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getPosition(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  manager(overrides?: CallOverrides): Promise<string>;

  orders(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, number, number, number, boolean] & {
      owner: string;
      token0: string;
      token1: string;
      liquidity: BigNumber;
      fee: number;
      tickLower: number;
      tickUpper: number;
      _isDeleted: boolean;
    }
  >;

  callStatic: {
    amountToWithdraw(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelOrder(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    createOrder(
      params: IMizuchiRO.CreateOrderParamsStruct,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        tokenId: BigNumber;
        liquidity: BigNumber;
        mintAmount0: BigNumber;
        mintAmount1: BigNumber;
      }
    >;

    factory(overrides?: CallOverrides): Promise<string>;

    fillOrder(
      tokenId: BigNumberish,
      slippage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getPosition(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    manager(overrides?: CallOverrides): Promise<string>;

    orders(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, number, number, number, boolean] & {
        owner: string;
        token0: string;
        token1: string;
        liquidity: BigNumber;
        fee: number;
        tickLower: number;
        tickUpper: number;
        _isDeleted: boolean;
      }
    >;
  };

  filters: {};

  estimateGas: {
    amountToWithdraw(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelOrder(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createOrder(
      params: IMizuchiRO.CreateOrderParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    fillOrder(
      tokenId: BigNumberish,
      slippage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getPosition(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    manager(overrides?: CallOverrides): Promise<BigNumber>;

    orders(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    amountToWithdraw(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelOrder(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createOrder(
      params: IMizuchiRO.CreateOrderParamsStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fillOrder(
      tokenId: BigNumberish,
      slippage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPosition(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    manager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    orders(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}