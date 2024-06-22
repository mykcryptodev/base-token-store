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
 * Represents the filters for the "CounterIncremented" event.
 */
export type CounterIncrementedEventFilters = Partial<{
  offerer: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"offerer","type":"address"}>
}>;

/**
 * Creates an event object for the CounterIncremented event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { counterIncrementedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  counterIncrementedEvent({
 *  offerer: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function counterIncrementedEvent(filters: CounterIncrementedEventFilters = {}) {
  return prepareEvent({
    signature: "event CounterIncremented(uint256 newCounter, address indexed offerer)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OrderCancelled" event.
 */
export type OrderCancelledEventFilters = Partial<{
  offerer: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"offerer","type":"address"}>
zone: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"zone","type":"address"}>
}>;

/**
 * Creates an event object for the OrderCancelled event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { orderCancelledEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  orderCancelledEvent({
 *  offerer: ...,
 *  zone: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function orderCancelledEvent(filters: OrderCancelledEventFilters = {}) {
  return prepareEvent({
    signature: "event OrderCancelled(bytes32 orderHash, address indexed offerer, address indexed zone)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OrderFulfilled" event.
 */
export type OrderFulfilledEventFilters = Partial<{
  offerer: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"offerer","type":"address"}>
zone: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"zone","type":"address"}>
}>;

/**
 * Creates an event object for the OrderFulfilled event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { orderFulfilledEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  orderFulfilledEvent({
 *  offerer: ...,
 *  zone: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function orderFulfilledEvent(filters: OrderFulfilledEventFilters = {}) {
  return prepareEvent({
    signature: "event OrderFulfilled(bytes32 orderHash, address indexed offerer, address indexed zone, address recipient, (uint8 itemType, address token, uint256 identifier, uint256 amount)[] offer, (uint8 itemType, address token, uint256 identifier, uint256 amount, address recipient)[] consideration)",
    filters,
  });
};
  



/**
 * Creates an event object for the OrderValidated event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { orderValidatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  orderValidatedEvent()
 * ],
 * });
 * ```
 */ 
export function orderValidatedEvent() {
  return prepareEvent({
    signature: "event OrderValidated(bytes32 orderHash, (address offerer, address zone, (uint8 itemType, address token, uint256 identifierOrCriteria, uint256 startAmount, uint256 endAmount)[] offer, (uint8 itemType, address token, uint256 identifierOrCriteria, uint256 startAmount, uint256 endAmount, address recipient)[] consideration, uint8 orderType, uint256 startTime, uint256 endTime, bytes32 zoneHash, uint256 salt, bytes32 conduitKey, uint256 totalOriginalConsiderationItems) orderParameters)",
  });
};
  



/**
 * Creates an event object for the OrdersMatched event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ordersMatchedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ordersMatchedEvent()
 * ],
 * });
 * ```
 */ 
export function ordersMatchedEvent() {
  return prepareEvent({
    signature: "event OrdersMatched(bytes32[] orderHashes)",
  });
};
  

/**
* Contract read functions
*/

/**
 * Represents the parameters for the "getContractOffererNonce" function.
 */
export type GetContractOffererNonceParams = {
  contractOfferer: AbiParameterToPrimitiveType<{"internalType":"address","name":"contractOfferer","type":"address"}>
};

/**
 * Calls the "getContractOffererNonce" function on the contract.
 * @param options - The options for the getContractOffererNonce function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getContractOffererNonce } from "TODO";
 * 
 * const result = await getContractOffererNonce({
 *  contractOfferer: ...,
 * });
 * 
 * ```
 */
export async function getContractOffererNonce(
  options: BaseTransactionOptions<GetContractOffererNonceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xa900866b",
  [
    {
      "internalType": "address",
      "name": "contractOfferer",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "nonce",
      "type": "uint256"
    }
  ]
],
    params: [options.contractOfferer]
  });
};


/**
 * Represents the parameters for the "getCounter" function.
 */
export type GetCounterParams = {
  offerer: AbiParameterToPrimitiveType<{"internalType":"address","name":"offerer","type":"address"}>
};

/**
 * Calls the "getCounter" function on the contract.
 * @param options - The options for the getCounter function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getCounter } from "TODO";
 * 
 * const result = await getCounter({
 *  offerer: ...,
 * });
 * 
 * ```
 */
export async function getCounter(
  options: BaseTransactionOptions<GetCounterParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xf07ec373",
  [
    {
      "internalType": "address",
      "name": "offerer",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "counter",
      "type": "uint256"
    }
  ]
],
    params: [options.offerer]
  });
};


/**
 * Represents the parameters for the "getOrderHash" function.
 */
export type GetOrderHashParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"counter","type":"uint256"}],"internalType":"struct OrderComponents","name":"","type":"tuple"}>
};

/**
 * Calls the "getOrderHash" function on the contract.
 * @param options - The options for the getOrderHash function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getOrderHash } from "TODO";
 * 
 * const result = await getOrderHash({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function getOrderHash(
  options: BaseTransactionOptions<GetOrderHashParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x79df72bd",
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "zone",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifierOrCriteria",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct OfferItem[]",
          "name": "offer",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifierOrCriteria",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAmount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct ConsiderationItem[]",
          "name": "consideration",
          "type": "tuple[]"
        },
        {
          "internalType": "enum OrderType",
          "name": "orderType",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "salt",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "conduitKey",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "counter",
          "type": "uint256"
        }
      ],
      "internalType": "struct OrderComponents",
      "name": "",
      "type": "tuple"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "orderHash",
      "type": "bytes32"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "getOrderStatus" function.
 */
export type GetOrderStatusParams = {
  orderHash: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"orderHash","type":"bytes32"}>
};

/**
 * Calls the "getOrderStatus" function on the contract.
 * @param options - The options for the getOrderStatus function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getOrderStatus } from "TODO";
 * 
 * const result = await getOrderStatus({
 *  orderHash: ...,
 * });
 * 
 * ```
 */
export async function getOrderStatus(
  options: BaseTransactionOptions<GetOrderStatusParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x46423aa7",
  [
    {
      "internalType": "bytes32",
      "name": "orderHash",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "isValidated",
      "type": "bool"
    },
    {
      "internalType": "bool",
      "name": "isCancelled",
      "type": "bool"
    },
    {
      "internalType": "uint256",
      "name": "totalFilled",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "totalSize",
      "type": "uint256"
    }
  ]
],
    params: [options.orderHash]
  });
};




/**
 * Calls the "information" function on the contract.
 * @param options - The options for the information function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { information } from "TODO";
 * 
 * const result = await information();
 * 
 * ```
 */
export async function information(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xf47b7740",
  [],
  [
    {
      "internalType": "string",
      "name": "version",
      "type": "string"
    },
    {
      "internalType": "bytes32",
      "name": "domainSeparator",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "conduitController",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "name" function on the contract.
 * @param options - The options for the name function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { name } from "TODO";
 * 
 * const result = await name();
 * 
 * ```
 */
export async function name(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x06fdde03",
  [],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
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
 * Calls the "__activateTstore" function on the contract.
 * @param options - The options for the "__activateTstore" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { __activateTstore } from "TODO";
 * 
 * const transaction = __activateTstore();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function __activateTstore(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x7423eb3c",
  [],
  []
],
    params: []
  });
};


/**
 * Represents the parameters for the "cancel" function.
 */
export type CancelParams = {
  orders: AbiParameterToPrimitiveType<{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"counter","type":"uint256"}],"internalType":"struct OrderComponents[]","name":"orders","type":"tuple[]"}>
};

/**
 * Calls the "cancel" function on the contract.
 * @param options - The options for the "cancel" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { cancel } from "TODO";
 * 
 * const transaction = cancel({
 *  orders: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function cancel(
  options: BaseTransactionOptions<CancelParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xfd9f1e10",
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "zone",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifierOrCriteria",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct OfferItem[]",
          "name": "offer",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifierOrCriteria",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAmount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct ConsiderationItem[]",
          "name": "consideration",
          "type": "tuple[]"
        },
        {
          "internalType": "enum OrderType",
          "name": "orderType",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "salt",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "conduitKey",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "counter",
          "type": "uint256"
        }
      ],
      "internalType": "struct OrderComponents[]",
      "name": "orders",
      "type": "tuple[]"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "cancelled",
      "type": "bool"
    }
  ]
],
    params: [options.orders]
  });
};


/**
 * Represents the parameters for the "fulfillAdvancedOrder" function.
 */
export type FulfillAdvancedOrderParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalConsiderationItems","type":"uint256"}],"internalType":"struct OrderParameters","name":"parameters","type":"tuple"},{"internalType":"uint120","name":"numerator","type":"uint120"},{"internalType":"uint120","name":"denominator","type":"uint120"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct AdvancedOrder","name":"","type":"tuple"}>
arg_1: AbiParameterToPrimitiveType<{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"enum Side","name":"side","type":"uint8"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"identifier","type":"uint256"},{"internalType":"bytes32[]","name":"criteriaProof","type":"bytes32[]"}],"internalType":"struct CriteriaResolver[]","name":"","type":"tuple[]"}>
fulfillerConduitKey: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"fulfillerConduitKey","type":"bytes32"}>
recipient: AbiParameterToPrimitiveType<{"internalType":"address","name":"recipient","type":"address"}>
};

/**
 * Calls the "fulfillAdvancedOrder" function on the contract.
 * @param options - The options for the "fulfillAdvancedOrder" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { fulfillAdvancedOrder } from "TODO";
 * 
 * const transaction = fulfillAdvancedOrder({
 *  arg_0: ...,
 *  arg_1: ...,
 *  fulfillerConduitKey: ...,
 *  recipient: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function fulfillAdvancedOrder(
  options: BaseTransactionOptions<FulfillAdvancedOrderParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xe7acab24",
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "zone",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct OfferItem[]",
              "name": "offer",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "internalType": "struct ConsiderationItem[]",
              "name": "consideration",
              "type": "tuple[]"
            },
            {
              "internalType": "enum OrderType",
              "name": "orderType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "zoneHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "salt",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "conduitKey",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "totalOriginalConsiderationItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderParameters",
          "name": "parameters",
          "type": "tuple"
        },
        {
          "internalType": "uint120",
          "name": "numerator",
          "type": "uint120"
        },
        {
          "internalType": "uint120",
          "name": "denominator",
          "type": "uint120"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "extraData",
          "type": "bytes"
        }
      ],
      "internalType": "struct AdvancedOrder",
      "name": "",
      "type": "tuple"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "orderIndex",
          "type": "uint256"
        },
        {
          "internalType": "enum Side",
          "name": "side",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "identifier",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "criteriaProof",
          "type": "bytes32[]"
        }
      ],
      "internalType": "struct CriteriaResolver[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "internalType": "bytes32",
      "name": "fulfillerConduitKey",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "fulfilled",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0, options.arg_1, options.fulfillerConduitKey, options.recipient]
  });
};


/**
 * Represents the parameters for the "fulfillAvailableAdvancedOrders" function.
 */
export type FulfillAvailableAdvancedOrdersParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalConsiderationItems","type":"uint256"}],"internalType":"struct OrderParameters","name":"parameters","type":"tuple"},{"internalType":"uint120","name":"numerator","type":"uint120"},{"internalType":"uint120","name":"denominator","type":"uint120"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct AdvancedOrder[]","name":"","type":"tuple[]"}>
arg_1: AbiParameterToPrimitiveType<{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"enum Side","name":"side","type":"uint8"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"identifier","type":"uint256"},{"internalType":"bytes32[]","name":"criteriaProof","type":"bytes32[]"}],"internalType":"struct CriteriaResolver[]","name":"","type":"tuple[]"}>
arg_2: AbiParameterToPrimitiveType<{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[][]","name":"","type":"tuple[][]"}>
arg_3: AbiParameterToPrimitiveType<{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[][]","name":"","type":"tuple[][]"}>
fulfillerConduitKey: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"fulfillerConduitKey","type":"bytes32"}>
recipient: AbiParameterToPrimitiveType<{"internalType":"address","name":"recipient","type":"address"}>
maximumFulfilled: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"maximumFulfilled","type":"uint256"}>
};

/**
 * Calls the "fulfillAvailableAdvancedOrders" function on the contract.
 * @param options - The options for the "fulfillAvailableAdvancedOrders" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { fulfillAvailableAdvancedOrders } from "TODO";
 * 
 * const transaction = fulfillAvailableAdvancedOrders({
 *  arg_0: ...,
 *  arg_1: ...,
 *  arg_2: ...,
 *  arg_3: ...,
 *  fulfillerConduitKey: ...,
 *  recipient: ...,
 *  maximumFulfilled: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function fulfillAvailableAdvancedOrders(
  options: BaseTransactionOptions<FulfillAvailableAdvancedOrdersParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x87201b41",
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "zone",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct OfferItem[]",
              "name": "offer",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "internalType": "struct ConsiderationItem[]",
              "name": "consideration",
              "type": "tuple[]"
            },
            {
              "internalType": "enum OrderType",
              "name": "orderType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "zoneHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "salt",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "conduitKey",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "totalOriginalConsiderationItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderParameters",
          "name": "parameters",
          "type": "tuple"
        },
        {
          "internalType": "uint120",
          "name": "numerator",
          "type": "uint120"
        },
        {
          "internalType": "uint120",
          "name": "denominator",
          "type": "uint120"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "extraData",
          "type": "bytes"
        }
      ],
      "internalType": "struct AdvancedOrder[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "orderIndex",
          "type": "uint256"
        },
        {
          "internalType": "enum Side",
          "name": "side",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "identifier",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "criteriaProof",
          "type": "bytes32[]"
        }
      ],
      "internalType": "struct CriteriaResolver[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "orderIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "itemIndex",
          "type": "uint256"
        }
      ],
      "internalType": "struct FulfillmentComponent[][]",
      "name": "",
      "type": "tuple[][]"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "orderIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "itemIndex",
          "type": "uint256"
        }
      ],
      "internalType": "struct FulfillmentComponent[][]",
      "name": "",
      "type": "tuple[][]"
    },
    {
      "internalType": "bytes32",
      "name": "fulfillerConduitKey",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "maximumFulfilled",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "bool[]",
      "name": "",
      "type": "bool[]"
    },
    {
      "components": [
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifier",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct ReceivedItem",
          "name": "item",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "conduitKey",
          "type": "bytes32"
        }
      ],
      "internalType": "struct Execution[]",
      "name": "",
      "type": "tuple[]"
    }
  ]
],
    params: [options.arg_0, options.arg_1, options.arg_2, options.arg_3, options.fulfillerConduitKey, options.recipient, options.maximumFulfilled]
  });
};


/**
 * Represents the parameters for the "fulfillAvailableOrders" function.
 */
export type FulfillAvailableOrdersParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalConsiderationItems","type":"uint256"}],"internalType":"struct OrderParameters","name":"parameters","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct Order[]","name":"","type":"tuple[]"}>
arg_1: AbiParameterToPrimitiveType<{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[][]","name":"","type":"tuple[][]"}>
arg_2: AbiParameterToPrimitiveType<{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[][]","name":"","type":"tuple[][]"}>
fulfillerConduitKey: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"fulfillerConduitKey","type":"bytes32"}>
maximumFulfilled: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"maximumFulfilled","type":"uint256"}>
};

/**
 * Calls the "fulfillAvailableOrders" function on the contract.
 * @param options - The options for the "fulfillAvailableOrders" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { fulfillAvailableOrders } from "TODO";
 * 
 * const transaction = fulfillAvailableOrders({
 *  arg_0: ...,
 *  arg_1: ...,
 *  arg_2: ...,
 *  fulfillerConduitKey: ...,
 *  maximumFulfilled: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function fulfillAvailableOrders(
  options: BaseTransactionOptions<FulfillAvailableOrdersParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xed98a574",
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "zone",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct OfferItem[]",
              "name": "offer",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "internalType": "struct ConsiderationItem[]",
              "name": "consideration",
              "type": "tuple[]"
            },
            {
              "internalType": "enum OrderType",
              "name": "orderType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "zoneHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "salt",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "conduitKey",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "totalOriginalConsiderationItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderParameters",
          "name": "parameters",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "internalType": "struct Order[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "orderIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "itemIndex",
          "type": "uint256"
        }
      ],
      "internalType": "struct FulfillmentComponent[][]",
      "name": "",
      "type": "tuple[][]"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "orderIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "itemIndex",
          "type": "uint256"
        }
      ],
      "internalType": "struct FulfillmentComponent[][]",
      "name": "",
      "type": "tuple[][]"
    },
    {
      "internalType": "bytes32",
      "name": "fulfillerConduitKey",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "maximumFulfilled",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "bool[]",
      "name": "",
      "type": "bool[]"
    },
    {
      "components": [
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifier",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct ReceivedItem",
          "name": "item",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "conduitKey",
          "type": "bytes32"
        }
      ],
      "internalType": "struct Execution[]",
      "name": "",
      "type": "tuple[]"
    }
  ]
],
    params: [options.arg_0, options.arg_1, options.arg_2, options.fulfillerConduitKey, options.maximumFulfilled]
  });
};


/**
 * Represents the parameters for the "fulfillBasicOrder" function.
 */
export type FulfillBasicOrderParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"internalType":"address","name":"considerationToken","type":"address"},{"internalType":"uint256","name":"considerationIdentifier","type":"uint256"},{"internalType":"uint256","name":"considerationAmount","type":"uint256"},{"internalType":"address payable","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"internalType":"address","name":"offerToken","type":"address"},{"internalType":"uint256","name":"offerIdentifier","type":"uint256"},{"internalType":"uint256","name":"offerAmount","type":"uint256"},{"internalType":"enum BasicOrderType","name":"basicOrderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"offererConduitKey","type":"bytes32"},{"internalType":"bytes32","name":"fulfillerConduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalAdditionalRecipients","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct AdditionalRecipient[]","name":"additionalRecipients","type":"tuple[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct BasicOrderParameters","name":"","type":"tuple"}>
};

/**
 * Calls the "fulfillBasicOrder" function on the contract.
 * @param options - The options for the "fulfillBasicOrder" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { fulfillBasicOrder } from "TODO";
 * 
 * const transaction = fulfillBasicOrder({
 *  arg_0: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function fulfillBasicOrder(
  options: BaseTransactionOptions<FulfillBasicOrderParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xfb0f3ee1",
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "considerationToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "considerationIdentifier",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "considerationAmount",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "zone",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "offerToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "offerIdentifier",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "offerAmount",
          "type": "uint256"
        },
        {
          "internalType": "enum BasicOrderType",
          "name": "basicOrderType",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "salt",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "offererConduitKey",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "fulfillerConduitKey",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "totalOriginalAdditionalRecipients",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct AdditionalRecipient[]",
          "name": "additionalRecipients",
          "type": "tuple[]"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "internalType": "struct BasicOrderParameters",
      "name": "",
      "type": "tuple"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "fulfilled",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "fulfillBasicOrder_efficient_6GL6yc" function.
 */
export type FulfillBasicOrder_efficient_6GL6ycParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"internalType":"address","name":"considerationToken","type":"address"},{"internalType":"uint256","name":"considerationIdentifier","type":"uint256"},{"internalType":"uint256","name":"considerationAmount","type":"uint256"},{"internalType":"address payable","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"internalType":"address","name":"offerToken","type":"address"},{"internalType":"uint256","name":"offerIdentifier","type":"uint256"},{"internalType":"uint256","name":"offerAmount","type":"uint256"},{"internalType":"enum BasicOrderType","name":"basicOrderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"offererConduitKey","type":"bytes32"},{"internalType":"bytes32","name":"fulfillerConduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalAdditionalRecipients","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct AdditionalRecipient[]","name":"additionalRecipients","type":"tuple[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct BasicOrderParameters","name":"","type":"tuple"}>
};

/**
 * Calls the "fulfillBasicOrder_efficient_6GL6yc" function on the contract.
 * @param options - The options for the "fulfillBasicOrder_efficient_6GL6yc" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { fulfillBasicOrder_efficient_6GL6yc } from "TODO";
 * 
 * const transaction = fulfillBasicOrder_efficient_6GL6yc({
 *  arg_0: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function fulfillBasicOrder_efficient_6GL6yc(
  options: BaseTransactionOptions<FulfillBasicOrder_efficient_6GL6ycParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x00000000",
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "considerationToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "considerationIdentifier",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "considerationAmount",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "zone",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "offerToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "offerIdentifier",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "offerAmount",
          "type": "uint256"
        },
        {
          "internalType": "enum BasicOrderType",
          "name": "basicOrderType",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "zoneHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "salt",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "offererConduitKey",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "fulfillerConduitKey",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "totalOriginalAdditionalRecipients",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct AdditionalRecipient[]",
          "name": "additionalRecipients",
          "type": "tuple[]"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "internalType": "struct BasicOrderParameters",
      "name": "",
      "type": "tuple"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "fulfilled",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "fulfillOrder" function.
 */
export type FulfillOrderParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalConsiderationItems","type":"uint256"}],"internalType":"struct OrderParameters","name":"parameters","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct Order","name":"","type":"tuple"}>
fulfillerConduitKey: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"fulfillerConduitKey","type":"bytes32"}>
};

/**
 * Calls the "fulfillOrder" function on the contract.
 * @param options - The options for the "fulfillOrder" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { fulfillOrder } from "TODO";
 * 
 * const transaction = fulfillOrder({
 *  arg_0: ...,
 *  fulfillerConduitKey: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function fulfillOrder(
  options: BaseTransactionOptions<FulfillOrderParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xb3a34c4c",
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "zone",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct OfferItem[]",
              "name": "offer",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "internalType": "struct ConsiderationItem[]",
              "name": "consideration",
              "type": "tuple[]"
            },
            {
              "internalType": "enum OrderType",
              "name": "orderType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "zoneHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "salt",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "conduitKey",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "totalOriginalConsiderationItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderParameters",
          "name": "parameters",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "internalType": "struct Order",
      "name": "",
      "type": "tuple"
    },
    {
      "internalType": "bytes32",
      "name": "fulfillerConduitKey",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "fulfilled",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0, options.fulfillerConduitKey]
  });
};




/**
 * Calls the "incrementCounter" function on the contract.
 * @param options - The options for the "incrementCounter" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { incrementCounter } from "TODO";
 * 
 * const transaction = incrementCounter();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function incrementCounter(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x5b34b966",
  [],
  [
    {
      "internalType": "uint256",
      "name": "newCounter",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "matchAdvancedOrders" function.
 */
export type MatchAdvancedOrdersParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalConsiderationItems","type":"uint256"}],"internalType":"struct OrderParameters","name":"parameters","type":"tuple"},{"internalType":"uint120","name":"numerator","type":"uint120"},{"internalType":"uint120","name":"denominator","type":"uint120"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct AdvancedOrder[]","name":"","type":"tuple[]"}>
arg_1: AbiParameterToPrimitiveType<{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"enum Side","name":"side","type":"uint8"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"identifier","type":"uint256"},{"internalType":"bytes32[]","name":"criteriaProof","type":"bytes32[]"}],"internalType":"struct CriteriaResolver[]","name":"","type":"tuple[]"}>
arg_2: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[]","name":"offerComponents","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[]","name":"considerationComponents","type":"tuple[]"}],"internalType":"struct Fulfillment[]","name":"","type":"tuple[]"}>
recipient: AbiParameterToPrimitiveType<{"internalType":"address","name":"recipient","type":"address"}>
};

/**
 * Calls the "matchAdvancedOrders" function on the contract.
 * @param options - The options for the "matchAdvancedOrders" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { matchAdvancedOrders } from "TODO";
 * 
 * const transaction = matchAdvancedOrders({
 *  arg_0: ...,
 *  arg_1: ...,
 *  arg_2: ...,
 *  recipient: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function matchAdvancedOrders(
  options: BaseTransactionOptions<MatchAdvancedOrdersParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf2d12b12",
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "zone",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct OfferItem[]",
              "name": "offer",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "internalType": "struct ConsiderationItem[]",
              "name": "consideration",
              "type": "tuple[]"
            },
            {
              "internalType": "enum OrderType",
              "name": "orderType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "zoneHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "salt",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "conduitKey",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "totalOriginalConsiderationItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderParameters",
          "name": "parameters",
          "type": "tuple"
        },
        {
          "internalType": "uint120",
          "name": "numerator",
          "type": "uint120"
        },
        {
          "internalType": "uint120",
          "name": "denominator",
          "type": "uint120"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "extraData",
          "type": "bytes"
        }
      ],
      "internalType": "struct AdvancedOrder[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "orderIndex",
          "type": "uint256"
        },
        {
          "internalType": "enum Side",
          "name": "side",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "identifier",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "criteriaProof",
          "type": "bytes32[]"
        }
      ],
      "internalType": "struct CriteriaResolver[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "components": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "orderIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "itemIndex",
              "type": "uint256"
            }
          ],
          "internalType": "struct FulfillmentComponent[]",
          "name": "offerComponents",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "orderIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "itemIndex",
              "type": "uint256"
            }
          ],
          "internalType": "struct FulfillmentComponent[]",
          "name": "considerationComponents",
          "type": "tuple[]"
        }
      ],
      "internalType": "struct Fulfillment[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    }
  ],
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifier",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct ReceivedItem",
          "name": "item",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "conduitKey",
          "type": "bytes32"
        }
      ],
      "internalType": "struct Execution[]",
      "name": "",
      "type": "tuple[]"
    }
  ]
],
    params: [options.arg_0, options.arg_1, options.arg_2, options.recipient]
  });
};


/**
 * Represents the parameters for the "matchOrders" function.
 */
export type MatchOrdersParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalConsiderationItems","type":"uint256"}],"internalType":"struct OrderParameters","name":"parameters","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct Order[]","name":"","type":"tuple[]"}>
arg_1: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[]","name":"offerComponents","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"orderIndex","type":"uint256"},{"internalType":"uint256","name":"itemIndex","type":"uint256"}],"internalType":"struct FulfillmentComponent[]","name":"considerationComponents","type":"tuple[]"}],"internalType":"struct Fulfillment[]","name":"","type":"tuple[]"}>
};

/**
 * Calls the "matchOrders" function on the contract.
 * @param options - The options for the "matchOrders" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { matchOrders } from "TODO";
 * 
 * const transaction = matchOrders({
 *  arg_0: ...,
 *  arg_1: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function matchOrders(
  options: BaseTransactionOptions<MatchOrdersParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa8174404",
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "zone",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct OfferItem[]",
              "name": "offer",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "internalType": "struct ConsiderationItem[]",
              "name": "consideration",
              "type": "tuple[]"
            },
            {
              "internalType": "enum OrderType",
              "name": "orderType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "zoneHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "salt",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "conduitKey",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "totalOriginalConsiderationItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderParameters",
          "name": "parameters",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "internalType": "struct Order[]",
      "name": "",
      "type": "tuple[]"
    },
    {
      "components": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "orderIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "itemIndex",
              "type": "uint256"
            }
          ],
          "internalType": "struct FulfillmentComponent[]",
          "name": "offerComponents",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "orderIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "itemIndex",
              "type": "uint256"
            }
          ],
          "internalType": "struct FulfillmentComponent[]",
          "name": "considerationComponents",
          "type": "tuple[]"
        }
      ],
      "internalType": "struct Fulfillment[]",
      "name": "",
      "type": "tuple[]"
    }
  ],
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "enum ItemType",
              "name": "itemType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "identifier",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "internalType": "struct ReceivedItem",
          "name": "item",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "offerer",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "conduitKey",
          "type": "bytes32"
        }
      ],
      "internalType": "struct Execution[]",
      "name": "",
      "type": "tuple[]"
    }
  ]
],
    params: [options.arg_0, options.arg_1]
  });
};


/**
 * Represents the parameters for the "validate" function.
 */
export type ValidateParams = {
  arg_0: AbiParameterToPrimitiveType<{"components":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"internalType":"address","name":"zone","type":"address"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"}],"internalType":"struct OfferItem[]","name":"offer","type":"tuple[]"},{"components":[{"internalType":"enum ItemType","name":"itemType","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"identifierOrCriteria","type":"uint256"},{"internalType":"uint256","name":"startAmount","type":"uint256"},{"internalType":"uint256","name":"endAmount","type":"uint256"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct ConsiderationItem[]","name":"consideration","type":"tuple[]"},{"internalType":"enum OrderType","name":"orderType","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bytes32","name":"zoneHash","type":"bytes32"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes32","name":"conduitKey","type":"bytes32"},{"internalType":"uint256","name":"totalOriginalConsiderationItems","type":"uint256"}],"internalType":"struct OrderParameters","name":"parameters","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct Order[]","name":"","type":"tuple[]"}>
};

/**
 * Calls the "validate" function on the contract.
 * @param options - The options for the "validate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { validate } from "TODO";
 * 
 * const transaction = validate({
 *  arg_0: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function validate(
  options: BaseTransactionOptions<ValidateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x88147732",
  [
    {
      "components": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "zone",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct OfferItem[]",
              "name": "offer",
              "type": "tuple[]"
            },
            {
              "components": [
                {
                  "internalType": "enum ItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "identifierOrCriteria",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "startAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "endAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "internalType": "struct ConsiderationItem[]",
              "name": "consideration",
              "type": "tuple[]"
            },
            {
              "internalType": "enum OrderType",
              "name": "orderType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "zoneHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "salt",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "conduitKey",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "totalOriginalConsiderationItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderParameters",
          "name": "parameters",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "internalType": "struct Order[]",
      "name": "",
      "type": "tuple[]"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};


