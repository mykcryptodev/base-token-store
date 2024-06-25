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
 * Represents the filters for the "EntityDeployed" event.
 */
export type EntityDeployedEventFilters = Partial<{
  entity: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"entity","type":"address"}>
entityType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"entityType","type":"uint8"}>
entityManager: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"entityManager","type":"address"}>
}>;

/**
 * Creates an event object for the EntityDeployed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { entityDeployedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  entityDeployedEvent({
 *  entity: ...,
 *  entityType: ...,
 *  entityManager: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function entityDeployedEvent(filters: EntityDeployedEventFilters = {}) {
  return prepareEvent({
    signature: "event EntityDeployed(address indexed entity, uint8 indexed entityType, address indexed entityManager)",
    filters,
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "ETH_PLACEHOLDER" function on the contract.
 * @param options - The options for the ETH_PLACEHOLDER function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { ETH_PLACEHOLDER } from "TODO";
 * 
 * const result = await ETH_PLACEHOLDER();
 * 
 * ```
 */
export async function ETH_PLACEHOLDER(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc45e15a0",
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
 * Calls the "baseToken" function on the contract.
 * @param options - The options for the baseToken function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { baseToken } from "TODO";
 * 
 * const result = await baseToken();
 * 
 * ```
 */
export async function baseToken(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc55dae63",
  [],
  [
    {
      "internalType": "contract ERC20",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "computeFundAddress" function.
 */
export type ComputeFundAddressParams = {
  manager: AbiParameterToPrimitiveType<{"internalType":"address","name":"_manager","type":"address"}>
salt: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_salt","type":"bytes32"}>
};

/**
 * Calls the "computeFundAddress" function on the contract.
 * @param options - The options for the computeFundAddress function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { computeFundAddress } from "TODO";
 * 
 * const result = await computeFundAddress({
 *  manager: ...,
 *  salt: ...,
 * });
 * 
 * ```
 */
export async function computeFundAddress(
  options: BaseTransactionOptions<ComputeFundAddressParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x099a81e3",
  [
    {
      "internalType": "address",
      "name": "_manager",
      "type": "address"
    },
    {
      "internalType": "bytes32",
      "name": "_salt",
      "type": "bytes32"
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
    params: [options.manager, options.salt]
  });
};


/**
 * Represents the parameters for the "computeOrgAddress" function.
 */
export type ComputeOrgAddressParams = {
  orgId: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_orgId","type":"bytes32"}>
};

/**
 * Calls the "computeOrgAddress" function on the contract.
 * @param options - The options for the computeOrgAddress function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { computeOrgAddress } from "TODO";
 * 
 * const result = await computeOrgAddress({
 *  orgId: ...,
 * });
 * 
 * ```
 */
export async function computeOrgAddress(
  options: BaseTransactionOptions<ComputeOrgAddressParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x9fb8578d",
  [
    {
      "internalType": "bytes32",
      "name": "_orgId",
      "type": "bytes32"
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
    params: [options.orgId]
  });
};




/**
 * Calls the "fundImplementation" function on the contract.
 * @param options - The options for the fundImplementation function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { fundImplementation } from "TODO";
 * 
 * const result = await fundImplementation();
 * 
 * ```
 */
export async function fundImplementation(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x0b307674",
  [],
  [
    {
      "internalType": "contract Fund",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "orgImplementation" function on the contract.
 * @param options - The options for the orgImplementation function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { orgImplementation } from "TODO";
 * 
 * const result = await orgImplementation();
 * 
 * ```
 */
export async function orgImplementation(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x6fee7ed6",
  [],
  [
    {
      "internalType": "contract Org",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "registry" function on the contract.
 * @param options - The options for the registry function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { registry } from "TODO";
 * 
 * const result = await registry();
 * 
 * ```
 */
export async function registry(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x7b103999",
  [],
  [
    {
      "internalType": "contract Registry",
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
 * Represents the parameters for the "deployFund" function.
 */
export type DeployFundParams = {
  manager: AbiParameterToPrimitiveType<{"internalType":"address","name":"_manager","type":"address"}>
salt: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_salt","type":"bytes32"}>
};

/**
 * Calls the "deployFund" function on the contract.
 * @param options - The options for the "deployFund" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deployFund } from "TODO";
 * 
 * const transaction = deployFund({
 *  manager: ...,
 *  salt: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function deployFund(
  options: BaseTransactionOptions<DeployFundParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x2a4004b8",
  [
    {
      "internalType": "address",
      "name": "_manager",
      "type": "address"
    },
    {
      "internalType": "bytes32",
      "name": "_salt",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "contract Fund",
      "name": "_fund",
      "type": "address"
    }
  ]
],
    params: [options.manager, options.salt]
  });
};


/**
 * Represents the parameters for the "deployFundAndDonate" function.
 */
export type DeployFundAndDonateParams = {
  manager: AbiParameterToPrimitiveType<{"internalType":"address","name":"_manager","type":"address"}>
salt: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_salt","type":"bytes32"}>
amount: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_amount","type":"uint256"}>
};

/**
 * Calls the "deployFundAndDonate" function on the contract.
 * @param options - The options for the "deployFundAndDonate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deployFundAndDonate } from "TODO";
 * 
 * const transaction = deployFundAndDonate({
 *  manager: ...,
 *  salt: ...,
 *  amount: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function deployFundAndDonate(
  options: BaseTransactionOptions<DeployFundAndDonateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xe6be99fc",
  [
    {
      "internalType": "address",
      "name": "_manager",
      "type": "address"
    },
    {
      "internalType": "bytes32",
      "name": "_salt",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "contract Fund",
      "name": "_fund",
      "type": "address"
    }
  ]
],
    params: [options.manager, options.salt, options.amount]
  });
};


/**
 * Represents the parameters for the "deployFundSwapAndDonate" function.
 */
export type DeployFundSwapAndDonateParams = {
  manager: AbiParameterToPrimitiveType<{"internalType":"address","name":"_manager","type":"address"}>
salt: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_salt","type":"bytes32"}>
swapWrapper: AbiParameterToPrimitiveType<{"internalType":"contract ISwapWrapper","name":"_swapWrapper","type":"address"}>
tokenIn: AbiParameterToPrimitiveType<{"internalType":"address","name":"_tokenIn","type":"address"}>
amountIn: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_amountIn","type":"uint256"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"_data","type":"bytes"}>
};

/**
 * Calls the "deployFundSwapAndDonate" function on the contract.
 * @param options - The options for the "deployFundSwapAndDonate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deployFundSwapAndDonate } from "TODO";
 * 
 * const transaction = deployFundSwapAndDonate({
 *  manager: ...,
 *  salt: ...,
 *  swapWrapper: ...,
 *  tokenIn: ...,
 *  amountIn: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function deployFundSwapAndDonate(
  options: BaseTransactionOptions<DeployFundSwapAndDonateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xab438d6b",
  [
    {
      "internalType": "address",
      "name": "_manager",
      "type": "address"
    },
    {
      "internalType": "bytes32",
      "name": "_salt",
      "type": "bytes32"
    },
    {
      "internalType": "contract ISwapWrapper",
      "name": "_swapWrapper",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_tokenIn",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_amountIn",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "_data",
      "type": "bytes"
    }
  ],
  [
    {
      "internalType": "contract Fund",
      "name": "_fund",
      "type": "address"
    }
  ]
],
    params: [options.manager, options.salt, options.swapWrapper, options.tokenIn, options.amountIn, options.data]
  });
};


/**
 * Represents the parameters for the "deployOrg" function.
 */
export type DeployOrgParams = {
  orgId: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_orgId","type":"bytes32"}>
};

/**
 * Calls the "deployOrg" function on the contract.
 * @param options - The options for the "deployOrg" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deployOrg } from "TODO";
 * 
 * const transaction = deployOrg({
 *  orgId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function deployOrg(
  options: BaseTransactionOptions<DeployOrgParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa60fe71d",
  [
    {
      "internalType": "bytes32",
      "name": "_orgId",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "contract Org",
      "name": "_org",
      "type": "address"
    }
  ]
],
    params: [options.orgId]
  });
};


/**
 * Represents the parameters for the "deployOrgAndDonate" function.
 */
export type DeployOrgAndDonateParams = {
  orgId: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_orgId","type":"bytes32"}>
amount: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_amount","type":"uint256"}>
};

/**
 * Calls the "deployOrgAndDonate" function on the contract.
 * @param options - The options for the "deployOrgAndDonate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deployOrgAndDonate } from "TODO";
 * 
 * const transaction = deployOrgAndDonate({
 *  orgId: ...,
 *  amount: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function deployOrgAndDonate(
  options: BaseTransactionOptions<DeployOrgAndDonateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xdb9e30cc",
  [
    {
      "internalType": "bytes32",
      "name": "_orgId",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "contract Org",
      "name": "_org",
      "type": "address"
    }
  ]
],
    params: [options.orgId, options.amount]
  });
};


/**
 * Represents the parameters for the "deployOrgSwapAndDonate" function.
 */
export type DeployOrgSwapAndDonateParams = {
  orgId: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"_orgId","type":"bytes32"}>
swapWrapper: AbiParameterToPrimitiveType<{"internalType":"contract ISwapWrapper","name":"_swapWrapper","type":"address"}>
tokenIn: AbiParameterToPrimitiveType<{"internalType":"address","name":"_tokenIn","type":"address"}>
amountIn: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_amountIn","type":"uint256"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"_data","type":"bytes"}>
};

/**
 * Calls the "deployOrgSwapAndDonate" function on the contract.
 * @param options - The options for the "deployOrgSwapAndDonate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deployOrgSwapAndDonate } from "TODO";
 * 
 * const transaction = deployOrgSwapAndDonate({
 *  orgId: ...,
 *  swapWrapper: ...,
 *  tokenIn: ...,
 *  amountIn: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function deployOrgSwapAndDonate(
  options: BaseTransactionOptions<DeployOrgSwapAndDonateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xbf37a670",
  [
    {
      "internalType": "bytes32",
      "name": "_orgId",
      "type": "bytes32"
    },
    {
      "internalType": "contract ISwapWrapper",
      "name": "_swapWrapper",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_tokenIn",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_amountIn",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "_data",
      "type": "bytes"
    }
  ],
  [
    {
      "internalType": "contract Org",
      "name": "_org",
      "type": "address"
    }
  ]
],
    params: [options.orgId, options.swapWrapper, options.tokenIn, options.amountIn, options.data]
  });
};


