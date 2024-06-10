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
 * Represents the filters for the "Approval" event.
 */
export type ApprovalEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"owner","type":"address"}>
spender: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"spender","type":"address"}>
}>;

/**
 * Creates an event object for the Approval event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { approvalEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalEvent({
 *  owner: ...,
 *  spender: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function approvalEvent(filters: ApprovalEventFilters = {}) {
  return prepareEvent({
    signature: "event Approval(address indexed owner, address indexed spender, uint256 value)",
    filters,
  });
};
  

/**
 * Represents the filters for the "Burn" event.
 */
export type BurnEventFilters = Partial<{
  sender: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"sender","type":"address"}>
to: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"to","type":"address"}>
}>;

/**
 * Creates an event object for the Burn event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { burnEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  burnEvent({
 *  sender: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function burnEvent(filters: BurnEventFilters = {}) {
  return prepareEvent({
    signature: "event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to)",
    filters,
  });
};
  

/**
 * Represents the filters for the "Mint" event.
 */
export type MintEventFilters = Partial<{
  sender: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"sender","type":"address"}>
}>;

/**
 * Creates an event object for the Mint event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { mintEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  mintEvent({
 *  sender: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function mintEvent(filters: MintEventFilters = {}) {
  return prepareEvent({
    signature: "event Mint(address indexed sender, uint256 amount0, uint256 amount1)",
    filters,
  });
};
  

/**
 * Represents the filters for the "Swap" event.
 */
export type SwapEventFilters = Partial<{
  sender: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"sender","type":"address"}>
to: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"to","type":"address"}>
}>;

/**
 * Creates an event object for the Swap event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { swapEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  swapEvent({
 *  sender: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function swapEvent(filters: SwapEventFilters = {}) {
  return prepareEvent({
    signature: "event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)",
    filters,
  });
};
  



/**
 * Creates an event object for the Sync event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { syncEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  syncEvent()
 * ],
 * });
 * ```
 */ 
export function syncEvent() {
  return prepareEvent({
    signature: "event Sync(uint112 reserve0, uint112 reserve1)",
  });
};
  

/**
 * Represents the filters for the "Transfer" event.
 */
export type TransferEventFilters = Partial<{
  from: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"to","type":"address"}>
}>;

/**
 * Creates an event object for the Transfer event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferEvent({
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function transferEvent(filters: TransferEventFilters = {}) {
  return prepareEvent({
    signature: "event Transfer(address indexed from, address indexed to, uint256 value)",
    filters,
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "DOMAIN_SEPARATOR" function on the contract.
 * @param options - The options for the DOMAIN_SEPARATOR function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { DOMAIN_SEPARATOR } from "TODO";
 * 
 * const result = await DOMAIN_SEPARATOR();
 * 
 * ```
 */
export async function DOMAIN_SEPARATOR(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x3644e515",
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
 * Calls the "MINIMUM_LIQUIDITY" function on the contract.
 * @param options - The options for the MINIMUM_LIQUIDITY function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { MINIMUM_LIQUIDITY } from "TODO";
 * 
 * const result = await MINIMUM_LIQUIDITY();
 * 
 * ```
 */
export async function MINIMUM_LIQUIDITY(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xba9a7a56",
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
 * Calls the "PERMIT_TYPEHASH" function on the contract.
 * @param options - The options for the PERMIT_TYPEHASH function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { PERMIT_TYPEHASH } from "TODO";
 * 
 * const result = await PERMIT_TYPEHASH();
 * 
 * ```
 */
export async function PERMIT_TYPEHASH(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x30adf81f",
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
 * Represents the parameters for the "allowance" function.
 */
export type AllowanceParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
arg_1: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "allowance" function on the contract.
 * @param options - The options for the allowance function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { allowance } from "TODO";
 * 
 * const result = await allowance({
 *  arg_0: ...,
 *  arg_1: ...,
 * });
 * 
 * ```
 */
export async function allowance(
  options: BaseTransactionOptions<AllowanceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xdd62ed3e",
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
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.arg_0, options.arg_1]
  });
};


/**
 * Represents the parameters for the "balanceOf" function.
 */
export type BalanceOfParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "balanceOf" function on the contract.
 * @param options - The options for the balanceOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { balanceOf } from "TODO";
 * 
 * const result = await balanceOf({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function balanceOf(
  options: BaseTransactionOptions<BalanceOfParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x70a08231",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
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
    params: [options.arg_0]
  });
};




/**
 * Calls the "decimals" function on the contract.
 * @param options - The options for the decimals function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { decimals } from "TODO";
 * 
 * const result = await decimals();
 * 
 * ```
 */
export async function decimals(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x313ce567",
  [],
  [
    {
      "internalType": "uint8",
      "name": "",
      "type": "uint8"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "factory" function on the contract.
 * @param options - The options for the factory function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { factory } from "TODO";
 * 
 * const result = await factory();
 * 
 * ```
 */
export async function factory(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc45a0155",
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
 * Calls the "getReserves" function on the contract.
 * @param options - The options for the getReserves function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getReserves } from "TODO";
 * 
 * const result = await getReserves();
 * 
 * ```
 */
export async function getReserves(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x0902f1ac",
  [],
  [
    {
      "internalType": "uint112",
      "name": "_reserve0",
      "type": "uint112"
    },
    {
      "internalType": "uint112",
      "name": "_reserve1",
      "type": "uint112"
    },
    {
      "internalType": "uint32",
      "name": "_blockTimestampLast",
      "type": "uint32"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "kLast" function on the contract.
 * @param options - The options for the kLast function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { kLast } from "TODO";
 * 
 * const result = await kLast();
 * 
 * ```
 */
export async function kLast(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x7464fc3d",
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
 * Represents the parameters for the "nonces" function.
 */
export type NoncesParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "nonces" function on the contract.
 * @param options - The options for the nonces function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { nonces } from "TODO";
 * 
 * const result = await nonces({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function nonces(
  options: BaseTransactionOptions<NoncesParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x7ecebe00",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
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
    params: [options.arg_0]
  });
};




/**
 * Calls the "price0CumulativeLast" function on the contract.
 * @param options - The options for the price0CumulativeLast function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { price0CumulativeLast } from "TODO";
 * 
 * const result = await price0CumulativeLast();
 * 
 * ```
 */
export async function price0CumulativeLast(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5909c0d5",
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
 * Calls the "price1CumulativeLast" function on the contract.
 * @param options - The options for the price1CumulativeLast function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { price1CumulativeLast } from "TODO";
 * 
 * const result = await price1CumulativeLast();
 * 
 * ```
 */
export async function price1CumulativeLast(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5a3d5493",
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
 * Calls the "symbol" function on the contract.
 * @param options - The options for the symbol function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { symbol } from "TODO";
 * 
 * const result = await symbol();
 * 
 * ```
 */
export async function symbol(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x95d89b41",
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
 * Calls the "token0" function on the contract.
 * @param options - The options for the token0 function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { token0 } from "TODO";
 * 
 * const result = await token0();
 * 
 * ```
 */
export async function token0(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x0dfe1681",
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
 * Calls the "token1" function on the contract.
 * @param options - The options for the token1 function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { token1 } from "TODO";
 * 
 * const result = await token1();
 * 
 * ```
 */
export async function token1(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xd21220a7",
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
 * Calls the "totalSupply" function on the contract.
 * @param options - The options for the totalSupply function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalSupply } from "TODO";
 * 
 * const result = await totalSupply();
 * 
 * ```
 */
export async function totalSupply(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x18160ddd",
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
* Contract write functions
*/

/**
 * Represents the parameters for the "approve" function.
 */
export type ApproveParams = {
  spender: AbiParameterToPrimitiveType<{"internalType":"address","name":"spender","type":"address"}>
value: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"value","type":"uint256"}>
};

/**
 * Calls the "approve" function on the contract.
 * @param options - The options for the "approve" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { approve } from "TODO";
 * 
 * const transaction = approve({
 *  spender: ...,
 *  value: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function approve(
  options: BaseTransactionOptions<ApproveParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x095ea7b3",
  [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
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
    params: [options.spender, options.value]
  });
};


/**
 * Represents the parameters for the "burn" function.
 */
export type BurnParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
};

/**
 * Calls the "burn" function on the contract.
 * @param options - The options for the "burn" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { burn } from "TODO";
 * 
 * const transaction = burn({
 *  to: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function burn(
  options: BaseTransactionOptions<BurnParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x89afcb44",
  [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "amount0",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "amount1",
      "type": "uint256"
    }
  ]
],
    params: [options.to]
  });
};


/**
 * Represents the parameters for the "initialize" function.
 */
export type InitializeParams = {
  token0: AbiParameterToPrimitiveType<{"internalType":"address","name":"_token0","type":"address"}>
token1: AbiParameterToPrimitiveType<{"internalType":"address","name":"_token1","type":"address"}>
};

/**
 * Calls the "initialize" function on the contract.
 * @param options - The options for the "initialize" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { initialize } from "TODO";
 * 
 * const transaction = initialize({
 *  token0: ...,
 *  token1: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function initialize(
  options: BaseTransactionOptions<InitializeParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x485cc955",
  [
    {
      "internalType": "address",
      "name": "_token0",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_token1",
      "type": "address"
    }
  ],
  []
],
    params: [options.token0, options.token1]
  });
};


/**
 * Represents the parameters for the "mint" function.
 */
export type MintParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
};

/**
 * Calls the "mint" function on the contract.
 * @param options - The options for the "mint" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { mint } from "TODO";
 * 
 * const transaction = mint({
 *  to: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function mint(
  options: BaseTransactionOptions<MintParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x6a627842",
  [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "liquidity",
      "type": "uint256"
    }
  ]
],
    params: [options.to]
  });
};


/**
 * Represents the parameters for the "permit" function.
 */
export type PermitParams = {
  owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
spender: AbiParameterToPrimitiveType<{"internalType":"address","name":"spender","type":"address"}>
value: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"value","type":"uint256"}>
deadline: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"deadline","type":"uint256"}>
v: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"v","type":"uint8"}>
r: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"r","type":"bytes32"}>
s: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"s","type":"bytes32"}>
};

/**
 * Calls the "permit" function on the contract.
 * @param options - The options for the "permit" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { permit } from "TODO";
 * 
 * const transaction = permit({
 *  owner: ...,
 *  spender: ...,
 *  value: ...,
 *  deadline: ...,
 *  v: ...,
 *  r: ...,
 *  s: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function permit(
  options: BaseTransactionOptions<PermitParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xd505accf",
  [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "deadline",
      "type": "uint256"
    },
    {
      "internalType": "uint8",
      "name": "v",
      "type": "uint8"
    },
    {
      "internalType": "bytes32",
      "name": "r",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "s",
      "type": "bytes32"
    }
  ],
  []
],
    params: [options.owner, options.spender, options.value, options.deadline, options.v, options.r, options.s]
  });
};


/**
 * Represents the parameters for the "skim" function.
 */
export type SkimParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
};

/**
 * Calls the "skim" function on the contract.
 * @param options - The options for the "skim" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { skim } from "TODO";
 * 
 * const transaction = skim({
 *  to: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function skim(
  options: BaseTransactionOptions<SkimParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xbc25cf77",
  [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
  ],
  []
],
    params: [options.to]
  });
};


/**
 * Represents the parameters for the "swap" function.
 */
export type SwapParams = {
  amount0Out: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"amount0Out","type":"uint256"}>
amount1Out: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"amount1Out","type":"uint256"}>
to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"data","type":"bytes"}>
};

/**
 * Calls the "swap" function on the contract.
 * @param options - The options for the "swap" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { swap } from "TODO";
 * 
 * const transaction = swap({
 *  amount0Out: ...,
 *  amount1Out: ...,
 *  to: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function swap(
  options: BaseTransactionOptions<SwapParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x022c0d9f",
  [
    {
      "internalType": "uint256",
      "name": "amount0Out",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "amount1Out",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.amount0Out, options.amount1Out, options.to, options.data]
  });
};




/**
 * Calls the "sync" function on the contract.
 * @param options - The options for the "sync" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { sync } from "TODO";
 * 
 * const transaction = sync();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function sync(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xfff6cae9",
  [],
  []
],
    params: []
  });
};


/**
 * Represents the parameters for the "transfer" function.
 */
export type TransferParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
value: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"value","type":"uint256"}>
};

/**
 * Calls the "transfer" function on the contract.
 * @param options - The options for the "transfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transfer } from "TODO";
 * 
 * const transaction = transfer({
 *  to: ...,
 *  value: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function transfer(
  options: BaseTransactionOptions<TransferParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa9059cbb",
  [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
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
    params: [options.to, options.value]
  });
};


/**
 * Represents the parameters for the "transferFrom" function.
 */
export type TransferFromParams = {
  from: AbiParameterToPrimitiveType<{"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"internalType":"address","name":"to","type":"address"}>
value: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"value","type":"uint256"}>
};

/**
 * Calls the "transferFrom" function on the contract.
 * @param options - The options for the "transferFrom" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferFrom } from "TODO";
 * 
 * const transaction = transferFrom({
 *  from: ...,
 *  to: ...,
 *  value: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function transferFrom(
  options: BaseTransactionOptions<TransferFromParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x23b872dd",
  [
    {
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
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
    params: [options.from, options.to, options.value]
  });
};


