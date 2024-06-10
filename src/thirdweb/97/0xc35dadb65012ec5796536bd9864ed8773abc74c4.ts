import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
* Contract events
*/

/**
 * Represents the filters for the "PairCreated" event.
 */
export type PairCreatedEventFilters = Partial<{
  token0: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"token0","type":"address"}>
token1: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"token1","type":"address"}>
}>;

/**
 * Creates an event object for the PairCreated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { pairCreatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  pairCreatedEvent({
 *  token0: ...,
 *  token1: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function pairCreatedEvent(filters: PairCreatedEventFilters = {}) {
  return prepareEvent({
    signature: "event PairCreated(address indexed token0, address indexed token1, address pair, uint256)",
    filters,
  });
};
  

/**
* Contract read functions
*/

/**
 * Represents the parameters for the "allPairs" function.
 */
export type AllPairsParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "allPairs" function on the contract.
 * @param options - The options for the allPairs function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { allPairs } from "TODO";
 * 
 * const result = await allPairs({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function allPairs(
  options: BaseTransactionOptions<AllPairsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x1e3dd18b",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.arg_0]
  });
};




/**
 * Calls the "allPairsLength" function on the contract.
 * @param options - The options for the allPairsLength function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { allPairsLength } from "TODO";
 * 
 * const result = await allPairsLength();
 * 
 * ```
 */
export async function allPairsLength(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x574f2ba3",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "feeTo" function on the contract.
 * @param options - The options for the feeTo function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { feeTo } from "TODO";
 * 
 * const result = await feeTo();
 * 
 * ```
 */
export async function feeTo(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x017e7e58",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "feeToSetter" function on the contract.
 * @param options - The options for the feeToSetter function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { feeToSetter } from "TODO";
 * 
 * const result = await feeToSetter();
 * 
 * ```
 */
export async function feeToSetter(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x094b7415",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "getPair" function.
 */
export type GetPairParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
arg_1: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "getPair" function on the contract.
 * @param options - The options for the getPair function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getPair } from "TODO";
 * 
 * const result = await getPair({
 *  arg_0: ...,
 *  arg_1: ...,
 * });
 * 
 * ```
 */
export async function getPair(
  options: BaseTransactionOptions<GetPairParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe6a43905",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.arg_0, options.arg_1]
  });
};




/**
 * Calls the "migrator" function on the contract.
 * @param options - The options for the migrator function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { migrator } from "TODO";
 * 
 * const result = await migrator();
 * 
 * ```
 */
export async function migrator(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x7cd07e47",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "pairCodeHash" function on the contract.
 * @param options - The options for the pairCodeHash function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { pairCodeHash } from "TODO";
 * 
 * const result = await pairCodeHash();
 * 
 * ```
 */
export async function pairCodeHash(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x9aab9248",
  [],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: []
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "createPair" function.
 */
export type CreatePairParams = {
  tokenA: AbiParameterToPrimitiveType<{"internalType":"address","name":"tokenA","type":"address"}>
tokenB: AbiParameterToPrimitiveType<{"internalType":"address","name":"tokenB","type":"address"}>
};

/**
 * Calls the "createPair" function on the contract.
 * @param options - The options for the "createPair" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { createPair } from "TODO";
 * 
 * const transaction = createPair({
 *  tokenA: ...,
 *  tokenB: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function createPair(
  options: BaseTransactionOptions<CreatePairParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xc9c65396",
  [
    {
      "internalType": "address",
      "name": "tokenA",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "tokenB",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "pair",
      "type": "address"
    }
  ]
],
    params: [options.tokenA, options.tokenB]
  });
};


/**
 * Represents the parameters for the "setFeeTo" function.
 */
export type SetFeeToParams = {
  feeTo: AbiParameterToPrimitiveType<{"internalType":"address","name":"_feeTo","type":"address"}>
};

/**
 * Calls the "setFeeTo" function on the contract.
 * @param options - The options for the "setFeeTo" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setFeeTo } from "TODO";
 * 
 * const transaction = setFeeTo({
 *  feeTo: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setFeeTo(
  options: BaseTransactionOptions<SetFeeToParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf46901ed",
  [
    {
      "internalType": "address",
      "name": "_feeTo",
      "type": "address"
    }
  ],
  []
],
    params: [options.feeTo]
  });
};


/**
 * Represents the parameters for the "setFeeToSetter" function.
 */
export type SetFeeToSetterParams = {
  feeToSetter: AbiParameterToPrimitiveType<{"internalType":"address","name":"_feeToSetter","type":"address"}>
};

/**
 * Calls the "setFeeToSetter" function on the contract.
 * @param options - The options for the "setFeeToSetter" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setFeeToSetter } from "TODO";
 * 
 * const transaction = setFeeToSetter({
 *  feeToSetter: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setFeeToSetter(
  options: BaseTransactionOptions<SetFeeToSetterParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa2e74af6",
  [
    {
      "internalType": "address",
      "name": "_feeToSetter",
      "type": "address"
    }
  ],
  []
],
    params: [options.feeToSetter]
  });
};


/**
 * Represents the parameters for the "setMigrator" function.
 */
export type SetMigratorParams = {
  migrator: AbiParameterToPrimitiveType<{"internalType":"address","name":"_migrator","type":"address"}>
};

/**
 * Calls the "setMigrator" function on the contract.
 * @param options - The options for the "setMigrator" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setMigrator } from "TODO";
 * 
 * const transaction = setMigrator({
 *  migrator: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setMigrator(
  options: BaseTransactionOptions<SetMigratorParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x23cf3118",
  [
    {
      "internalType": "address",
      "name": "_migrator",
      "type": "address"
    }
  ],
  []
],
    params: [options.migrator]
  });
};


