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
 * Represents the filters for the "AnswerUpdated" event.
 */
export type AnswerUpdatedEventFilters = Partial<{
  current: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"int256","name":"current","type":"int256"}>
roundId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}>
}>;

/**
 * Creates an event object for the AnswerUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { answerUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  answerUpdatedEvent({
 *  current: ...,
 *  roundId: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function answerUpdatedEvent(filters: AnswerUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 updatedAt)",
    filters,
  });
};
  

/**
 * Represents the filters for the "NewRound" event.
 */
export type NewRoundEventFilters = Partial<{
  roundId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}>
startedBy: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"startedBy","type":"address"}>
}>;

/**
 * Creates an event object for the NewRound event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { newRoundEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  newRoundEvent({
 *  roundId: ...,
 *  startedBy: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function newRoundEvent(filters: NewRoundEventFilters = {}) {
  return prepareEvent({
    signature: "event NewRound(uint256 indexed roundId, address indexed startedBy, uint256 startedAt)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OwnershipTransferRequested" event.
 */
export type OwnershipTransferRequestedEventFilters = Partial<{
  from: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"to","type":"address"}>
}>;

/**
 * Creates an event object for the OwnershipTransferRequested event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferRequestedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferRequestedEvent({
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function ownershipTransferRequestedEvent(filters: OwnershipTransferRequestedEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnershipTransferRequested(address indexed from, address indexed to)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OwnershipTransferred" event.
 */
export type OwnershipTransferredEventFilters = Partial<{
  from: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"from","type":"address"}>
to: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"to","type":"address"}>
}>;

/**
 * Creates an event object for the OwnershipTransferred event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferredEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferredEvent({
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function ownershipTransferredEvent(filters: OwnershipTransferredEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnershipTransferred(address indexed from, address indexed to)",
    filters,
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "accessController" function on the contract.
 * @param options - The options for the accessController function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { accessController } from "TODO";
 * 
 * const result = await accessController();
 * 
 * ```
 */
export async function accessController(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xbc43cbaf",
  [],
  [
    {
      "internalType": "contract AccessControllerInterface",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "aggregator" function on the contract.
 * @param options - The options for the aggregator function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { aggregator } from "TODO";
 * 
 * const result = await aggregator();
 * 
 * ```
 */
export async function aggregator(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x245a7bfc",
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
 * Calls the "description" function on the contract.
 * @param options - The options for the description function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { description } from "TODO";
 * 
 * const result = await description();
 * 
 * ```
 */
export async function description(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x7284e416",
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
 * Represents the parameters for the "getAnswer" function.
 */
export type GetAnswerParams = {
  roundId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_roundId","type":"uint256"}>
};

/**
 * Calls the "getAnswer" function on the contract.
 * @param options - The options for the getAnswer function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getAnswer } from "TODO";
 * 
 * const result = await getAnswer({
 *  roundId: ...,
 * });
 * 
 * ```
 */
export async function getAnswer(
  options: BaseTransactionOptions<GetAnswerParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb5ab58dc",
  [
    {
      "internalType": "uint256",
      "name": "_roundId",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "int256",
      "name": "",
      "type": "int256"
    }
  ]
],
    params: [options.roundId]
  });
};


/**
 * Represents the parameters for the "getRoundData" function.
 */
export type GetRoundDataParams = {
  roundId: AbiParameterToPrimitiveType<{"internalType":"uint80","name":"_roundId","type":"uint80"}>
};

/**
 * Calls the "getRoundData" function on the contract.
 * @param options - The options for the getRoundData function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getRoundData } from "TODO";
 * 
 * const result = await getRoundData({
 *  roundId: ...,
 * });
 * 
 * ```
 */
export async function getRoundData(
  options: BaseTransactionOptions<GetRoundDataParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x9a6fc8f5",
  [
    {
      "internalType": "uint80",
      "name": "_roundId",
      "type": "uint80"
    }
  ],
  [
    {
      "internalType": "uint80",
      "name": "roundId",
      "type": "uint80"
    },
    {
      "internalType": "int256",
      "name": "answer",
      "type": "int256"
    },
    {
      "internalType": "uint256",
      "name": "startedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "updatedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint80",
      "name": "answeredInRound",
      "type": "uint80"
    }
  ]
],
    params: [options.roundId]
  });
};


/**
 * Represents the parameters for the "getTimestamp" function.
 */
export type GetTimestampParams = {
  roundId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_roundId","type":"uint256"}>
};

/**
 * Calls the "getTimestamp" function on the contract.
 * @param options - The options for the getTimestamp function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getTimestamp } from "TODO";
 * 
 * const result = await getTimestamp({
 *  roundId: ...,
 * });
 * 
 * ```
 */
export async function getTimestamp(
  options: BaseTransactionOptions<GetTimestampParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb633620c",
  [
    {
      "internalType": "uint256",
      "name": "_roundId",
      "type": "uint256"
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
    params: [options.roundId]
  });
};




/**
 * Calls the "latestAnswer" function on the contract.
 * @param options - The options for the latestAnswer function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { latestAnswer } from "TODO";
 * 
 * const result = await latestAnswer();
 * 
 * ```
 */
export async function latestAnswer(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x50d25bcd",
  [],
  [
    {
      "internalType": "int256",
      "name": "",
      "type": "int256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "latestRound" function on the contract.
 * @param options - The options for the latestRound function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { latestRound } from "TODO";
 * 
 * const result = await latestRound();
 * 
 * ```
 */
export async function latestRound(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x668a0f02",
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
 * Calls the "latestRoundData" function on the contract.
 * @param options - The options for the latestRoundData function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { latestRoundData } from "TODO";
 * 
 * const result = await latestRoundData();
 * 
 * ```
 */
export async function latestRoundData(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xfeaf968c",
  [],
  [
    {
      "internalType": "uint80",
      "name": "roundId",
      "type": "uint80"
    },
    {
      "internalType": "int256",
      "name": "answer",
      "type": "int256"
    },
    {
      "internalType": "uint256",
      "name": "startedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "updatedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint80",
      "name": "answeredInRound",
      "type": "uint80"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "latestTimestamp" function on the contract.
 * @param options - The options for the latestTimestamp function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { latestTimestamp } from "TODO";
 * 
 * const result = await latestTimestamp();
 * 
 * ```
 */
export async function latestTimestamp(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8205bf6a",
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
 * Calls the "owner" function on the contract.
 * @param options - The options for the owner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { owner } from "TODO";
 * 
 * const result = await owner();
 * 
 * ```
 */
export async function owner(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8da5cb5b",
  [],
  [
    {
      "internalType": "address payable",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "phaseAggregators" function.
 */
export type PhaseAggregatorsParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint16","name":"","type":"uint16"}>
};

/**
 * Calls the "phaseAggregators" function on the contract.
 * @param options - The options for the phaseAggregators function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { phaseAggregators } from "TODO";
 * 
 * const result = await phaseAggregators({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function phaseAggregators(
  options: BaseTransactionOptions<PhaseAggregatorsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc1597304",
  [
    {
      "internalType": "uint16",
      "name": "",
      "type": "uint16"
    }
  ],
  [
    {
      "internalType": "contract AggregatorV2V3Interface",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.arg_0]
  });
};




/**
 * Calls the "phaseId" function on the contract.
 * @param options - The options for the phaseId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { phaseId } from "TODO";
 * 
 * const result = await phaseId();
 * 
 * ```
 */
export async function phaseId(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x58303b10",
  [],
  [
    {
      "internalType": "uint16",
      "name": "",
      "type": "uint16"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "proposedAggregator" function on the contract.
 * @param options - The options for the proposedAggregator function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { proposedAggregator } from "TODO";
 * 
 * const result = await proposedAggregator();
 * 
 * ```
 */
export async function proposedAggregator(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe8c4be30",
  [],
  [
    {
      "internalType": "contract AggregatorV2V3Interface",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "proposedGetRoundData" function.
 */
export type ProposedGetRoundDataParams = {
  roundId: AbiParameterToPrimitiveType<{"internalType":"uint80","name":"_roundId","type":"uint80"}>
};

/**
 * Calls the "proposedGetRoundData" function on the contract.
 * @param options - The options for the proposedGetRoundData function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { proposedGetRoundData } from "TODO";
 * 
 * const result = await proposedGetRoundData({
 *  roundId: ...,
 * });
 * 
 * ```
 */
export async function proposedGetRoundData(
  options: BaseTransactionOptions<ProposedGetRoundDataParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x6001ac53",
  [
    {
      "internalType": "uint80",
      "name": "_roundId",
      "type": "uint80"
    }
  ],
  [
    {
      "internalType": "uint80",
      "name": "roundId",
      "type": "uint80"
    },
    {
      "internalType": "int256",
      "name": "answer",
      "type": "int256"
    },
    {
      "internalType": "uint256",
      "name": "startedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "updatedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint80",
      "name": "answeredInRound",
      "type": "uint80"
    }
  ]
],
    params: [options.roundId]
  });
};




/**
 * Calls the "proposedLatestRoundData" function on the contract.
 * @param options - The options for the proposedLatestRoundData function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { proposedLatestRoundData } from "TODO";
 * 
 * const result = await proposedLatestRoundData();
 * 
 * ```
 */
export async function proposedLatestRoundData(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8f6b4d91",
  [],
  [
    {
      "internalType": "uint80",
      "name": "roundId",
      "type": "uint80"
    },
    {
      "internalType": "int256",
      "name": "answer",
      "type": "int256"
    },
    {
      "internalType": "uint256",
      "name": "startedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "updatedAt",
      "type": "uint256"
    },
    {
      "internalType": "uint80",
      "name": "answeredInRound",
      "type": "uint80"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "version" function on the contract.
 * @param options - The options for the version function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { version } from "TODO";
 * 
 * const result = await version();
 * 
 * ```
 */
export async function version(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x54fd4d50",
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
 * Calls the "acceptOwnership" function on the contract.
 * @param options - The options for the "acceptOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { acceptOwnership } from "TODO";
 * 
 * const transaction = acceptOwnership();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function acceptOwnership(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x79ba5097",
  [],
  []
],
    params: []
  });
};


/**
 * Represents the parameters for the "confirmAggregator" function.
 */
export type ConfirmAggregatorParams = {
  aggregator: AbiParameterToPrimitiveType<{"internalType":"address","name":"_aggregator","type":"address"}>
};

/**
 * Calls the "confirmAggregator" function on the contract.
 * @param options - The options for the "confirmAggregator" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { confirmAggregator } from "TODO";
 * 
 * const transaction = confirmAggregator({
 *  aggregator: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function confirmAggregator(
  options: BaseTransactionOptions<ConfirmAggregatorParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa928c096",
  [
    {
      "internalType": "address",
      "name": "_aggregator",
      "type": "address"
    }
  ],
  []
],
    params: [options.aggregator]
  });
};


/**
 * Represents the parameters for the "proposeAggregator" function.
 */
export type ProposeAggregatorParams = {
  aggregator: AbiParameterToPrimitiveType<{"internalType":"address","name":"_aggregator","type":"address"}>
};

/**
 * Calls the "proposeAggregator" function on the contract.
 * @param options - The options for the "proposeAggregator" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { proposeAggregator } from "TODO";
 * 
 * const transaction = proposeAggregator({
 *  aggregator: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function proposeAggregator(
  options: BaseTransactionOptions<ProposeAggregatorParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf8a2abd3",
  [
    {
      "internalType": "address",
      "name": "_aggregator",
      "type": "address"
    }
  ],
  []
],
    params: [options.aggregator]
  });
};


/**
 * Represents the parameters for the "setController" function.
 */
export type SetControllerParams = {
  accessController: AbiParameterToPrimitiveType<{"internalType":"address","name":"_accessController","type":"address"}>
};

/**
 * Calls the "setController" function on the contract.
 * @param options - The options for the "setController" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setController } from "TODO";
 * 
 * const transaction = setController({
 *  accessController: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setController(
  options: BaseTransactionOptions<SetControllerParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x92eefe9b",
  [
    {
      "internalType": "address",
      "name": "_accessController",
      "type": "address"
    }
  ],
  []
],
    params: [options.accessController]
  });
};


/**
 * Represents the parameters for the "transferOwnership" function.
 */
export type TransferOwnershipParams = {
  to: AbiParameterToPrimitiveType<{"internalType":"address","name":"_to","type":"address"}>
};

/**
 * Calls the "transferOwnership" function on the contract.
 * @param options - The options for the "transferOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferOwnership } from "TODO";
 * 
 * const transaction = transferOwnership({
 *  to: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function transferOwnership(
  options: BaseTransactionOptions<TransferOwnershipParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf2fde38b",
  [
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    }
  ],
  []
],
    params: [options.to]
  });
};


