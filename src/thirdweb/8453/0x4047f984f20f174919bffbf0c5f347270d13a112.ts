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
 * Represents the filters for the "AdPurchased" event.
 */
export type AdPurchasedEventFilters = Partial<{
  dayId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"dayId","type":"uint256"}>
from: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"to","type":"address"}>
}>;

/**
 * Creates an event object for the AdPurchased event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { adPurchasedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  adPurchasedEvent({
 *  dayId: ...,
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function adPurchasedEvent(filters: AdPurchasedEventFilters = {}) {
  return prepareEvent({
    signature: "event AdPurchased(uint256 indexed dayId, address indexed from, address indexed to, uint256 price, string contentURI)",
    filters,
  });
};
  

/**
* Contract read functions
*/

/**
 * Represents the parameters for the "adSpaces" function.
 */
export type AdSpacesParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "adSpaces" function on the contract.
 * @param options - The options for the adSpaces function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { adSpaces } from "TODO";
 * 
 * const result = await adSpaces({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function adSpaces(
  options: BaseTransactionOptions<AdSpacesParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe7c67fe7",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "dayId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "resalePrice",
      "type": "uint256"
    },
    {
      "internalType": "address payable",
      "name": "adOwner",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "contentURI",
      "type": "string"
    }
  ]
],
    params: [options.arg_0]
  });
};




/**
 * Calls the "admin" function on the contract.
 * @param options - The options for the admin function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { admin } from "TODO";
 * 
 * const result = await admin();
 * 
 * ```
 */
export async function admin(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xf851a440",
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
 * Represents the parameters for the "getAdSpace" function.
 */
export type GetAdSpaceParams = {
  dayId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_dayId","type":"uint256"}>
};

/**
 * Calls the "getAdSpace" function on the contract.
 * @param options - The options for the getAdSpace function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getAdSpace } from "TODO";
 * 
 * const result = await getAdSpace({
 *  dayId: ...,
 * });
 * 
 * ```
 */
export async function getAdSpace(
  options: BaseTransactionOptions<GetAdSpaceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xef3a7fec",
  [
    {
      "internalType": "uint256",
      "name": "_dayId",
      "type": "uint256"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "dayId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "resalePrice",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "adOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "contentURI",
          "type": "string"
        }
      ],
      "internalType": "struct AdSpaceContract.AdSpace",
      "name": "",
      "type": "tuple"
    }
  ]
],
    params: [options.dayId]
  });
};


/**
 * Represents the parameters for the "getAdSpaces" function.
 */
export type GetAdSpacesParams = {
  dayIds: AbiParameterToPrimitiveType<{"internalType":"uint256[]","name":"_dayIds","type":"uint256[]"}>
};

/**
 * Calls the "getAdSpaces" function on the contract.
 * @param options - The options for the getAdSpaces function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getAdSpaces } from "TODO";
 * 
 * const result = await getAdSpaces({
 *  dayIds: ...,
 * });
 * 
 * ```
 */
export async function getAdSpaces(
  options: BaseTransactionOptions<GetAdSpacesParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x053f34f1",
  [
    {
      "internalType": "uint256[]",
      "name": "_dayIds",
      "type": "uint256[]"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "dayId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "resalePrice",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "adOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "contentURI",
          "type": "string"
        }
      ],
      "internalType": "struct AdSpaceContract.AdSpace[]",
      "name": "",
      "type": "tuple[]"
    }
  ]
],
    params: [options.dayIds]
  });
};




/**
 * Calls the "price" function on the contract.
 * @param options - The options for the price function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { price } from "TODO";
 * 
 * const result = await price();
 * 
 * ```
 */
export async function price(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xa035b1fe",
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
 * Represents the parameters for the "quotePrice" function.
 */
export type QuotePriceParams = {
  dayIds: AbiParameterToPrimitiveType<{"internalType":"uint256[]","name":"_dayIds","type":"uint256[]"}>
};

/**
 * Calls the "quotePrice" function on the contract.
 * @param options - The options for the quotePrice function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { quotePrice } from "TODO";
 * 
 * const result = await quotePrice({
 *  dayIds: ...,
 * });
 * 
 * ```
 */
export async function quotePrice(
  options: BaseTransactionOptions<QuotePriceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5180eff6",
  [
    {
      "internalType": "uint256[]",
      "name": "_dayIds",
      "type": "uint256[]"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.dayIds]
  });
};




/**
 * Calls the "royaltyBps" function on the contract.
 * @param options - The options for the royaltyBps function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { royaltyBps } from "TODO";
 * 
 * const result = await royaltyBps();
 * 
 * ```
 */
export async function royaltyBps(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc63adb2b",
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
 * Calls the "treasury" function on the contract.
 * @param options - The options for the treasury function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { treasury } from "TODO";
 * 
 * const result = await treasury();
 * 
 * ```
 */
export async function treasury(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x61d027b3",
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
* Contract write functions
*/

/**
 * Represents the parameters for the "buyAdSpace" function.
 */
export type BuyAdSpaceParams = {
  dayIds: AbiParameterToPrimitiveType<{"internalType":"uint256[]","name":"_dayIds","type":"uint256[]"}>
contentURIs: AbiParameterToPrimitiveType<{"internalType":"string[]","name":"contentURIs","type":"string[]"}>
resalePrices: AbiParameterToPrimitiveType<{"internalType":"uint256[]","name":"_resalePrices","type":"uint256[]"}>
maxCost: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"maxCost","type":"uint256"}>
};

/**
 * Calls the "buyAdSpace" function on the contract.
 * @param options - The options for the "buyAdSpace" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { buyAdSpace } from "TODO";
 * 
 * const transaction = buyAdSpace({
 *  dayIds: ...,
 *  contentURIs: ...,
 *  resalePrices: ...,
 *  maxCost: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function buyAdSpace(
  options: BaseTransactionOptions<BuyAdSpaceParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x2b3f585f",
  [
    {
      "internalType": "uint256[]",
      "name": "_dayIds",
      "type": "uint256[]"
    },
    {
      "internalType": "string[]",
      "name": "contentURIs",
      "type": "string[]"
    },
    {
      "internalType": "uint256[]",
      "name": "_resalePrices",
      "type": "uint256[]"
    },
    {
      "internalType": "uint256",
      "name": "maxCost",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.dayIds, options.contentURIs, options.resalePrices, options.maxCost]
  });
};


/**
 * Represents the parameters for the "rescueERC20" function.
 */
export type RescueERC20Params = {
  tokenAddress: AbiParameterToPrimitiveType<{"internalType":"address","name":"tokenAddress","type":"address"}>
tokenAmount: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"tokenAmount","type":"uint256"}>
};

/**
 * Calls the "rescueERC20" function on the contract.
 * @param options - The options for the "rescueERC20" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { rescueERC20 } from "TODO";
 * 
 * const transaction = rescueERC20({
 *  tokenAddress: ...,
 *  tokenAmount: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function rescueERC20(
  options: BaseTransactionOptions<RescueERC20Params>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x8cd4426d",
  [
    {
      "internalType": "address",
      "name": "tokenAddress",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenAmount",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.tokenAddress, options.tokenAmount]
  });
};


/**
 * Represents the parameters for the "setContentURI" function.
 */
export type SetContentURIParams = {
  dayId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_dayId","type":"uint256"}>
contentURI: AbiParameterToPrimitiveType<{"internalType":"string","name":"_contentURI","type":"string"}>
};

/**
 * Calls the "setContentURI" function on the contract.
 * @param options - The options for the "setContentURI" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setContentURI } from "TODO";
 * 
 * const transaction = setContentURI({
 *  dayId: ...,
 *  contentURI: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setContentURI(
  options: BaseTransactionOptions<SetContentURIParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x4def0453",
  [
    {
      "internalType": "uint256",
      "name": "_dayId",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_contentURI",
      "type": "string"
    }
  ],
  []
],
    params: [options.dayId, options.contentURI]
  });
};


/**
 * Represents the parameters for the "setPrice" function.
 */
export type SetPriceParams = {
  price: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_price","type":"uint256"}>
};

/**
 * Calls the "setPrice" function on the contract.
 * @param options - The options for the "setPrice" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setPrice } from "TODO";
 * 
 * const transaction = setPrice({
 *  price: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setPrice(
  options: BaseTransactionOptions<SetPriceParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x91b7f5ed",
  [
    {
      "internalType": "uint256",
      "name": "_price",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.price]
  });
};


/**
 * Represents the parameters for the "setResalePrice" function.
 */
export type SetResalePriceParams = {
  dayId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_dayId","type":"uint256"}>
resalePrice: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_resalePrice","type":"uint256"}>
};

/**
 * Calls the "setResalePrice" function on the contract.
 * @param options - The options for the "setResalePrice" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setResalePrice } from "TODO";
 * 
 * const transaction = setResalePrice({
 *  dayId: ...,
 *  resalePrice: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setResalePrice(
  options: BaseTransactionOptions<SetResalePriceParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf7e2aaab",
  [
    {
      "internalType": "uint256",
      "name": "_dayId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_resalePrice",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.dayId, options.resalePrice]
  });
};


/**
 * Represents the parameters for the "setRoyaltyBps" function.
 */
export type SetRoyaltyBpsParams = {
  royaltyBps: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_royaltyBps","type":"uint256"}>
};

/**
 * Calls the "setRoyaltyBps" function on the contract.
 * @param options - The options for the "setRoyaltyBps" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setRoyaltyBps } from "TODO";
 * 
 * const transaction = setRoyaltyBps({
 *  royaltyBps: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setRoyaltyBps(
  options: BaseTransactionOptions<SetRoyaltyBpsParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x1f72d831",
  [
    {
      "internalType": "uint256",
      "name": "_royaltyBps",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.royaltyBps]
  });
};




/**
 * Calls the "withdraw" function on the contract.
 * @param options - The options for the "withdraw" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { withdraw } from "TODO";
 * 
 * const transaction = withdraw();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function withdraw(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x3ccfd60b",
  [],
  []
],
    params: []
  });
};


