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
 * Represents the filters for the "AuthorityUpdated" event.
 */
export type AuthorityUpdatedEventFilters = Partial<{
  user: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"user","type":"address"}>
newAuthority: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"contract Authority","name":"newAuthority","type":"address"}>
}>;

/**
 * Creates an event object for the AuthorityUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { authorityUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  authorityUpdatedEvent({
 *  user: ...,
 *  newAuthority: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function authorityUpdatedEvent(filters: AuthorityUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event AuthorityUpdated(address indexed user, address indexed newAuthority)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DefaultDonationFeeSet" event.
 */
export type DefaultDonationFeeSetEventFilters = Partial<{
  entityType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"entityType","type":"uint8"}>
}>;

/**
 * Creates an event object for the DefaultDonationFeeSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { defaultDonationFeeSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  defaultDonationFeeSetEvent({
 *  entityType: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function defaultDonationFeeSetEvent(filters: DefaultDonationFeeSetEventFilters = {}) {
  return prepareEvent({
    signature: "event DefaultDonationFeeSet(uint8 indexed entityType, uint32 fee)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DefaultPayoutFeeSet" event.
 */
export type DefaultPayoutFeeSetEventFilters = Partial<{
  entityType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"entityType","type":"uint8"}>
}>;

/**
 * Creates an event object for the DefaultPayoutFeeSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { defaultPayoutFeeSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  defaultPayoutFeeSetEvent({
 *  entityType: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function defaultPayoutFeeSetEvent(filters: DefaultPayoutFeeSetEventFilters = {}) {
  return prepareEvent({
    signature: "event DefaultPayoutFeeSet(uint8 indexed entityType, uint32 fee)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DefaultTransferFeeSet" event.
 */
export type DefaultTransferFeeSetEventFilters = Partial<{
  fromEntityType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"fromEntityType","type":"uint8"}>
toEntityType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"toEntityType","type":"uint8"}>
}>;

/**
 * Creates an event object for the DefaultTransferFeeSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { defaultTransferFeeSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  defaultTransferFeeSetEvent({
 *  fromEntityType: ...,
 *  toEntityType: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function defaultTransferFeeSetEvent(filters: DefaultTransferFeeSetEventFilters = {}) {
  return prepareEvent({
    signature: "event DefaultTransferFeeSet(uint8 indexed fromEntityType, uint8 indexed toEntityType, uint32 fee)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DonationFeeReceiverOverrideSet" event.
 */
export type DonationFeeReceiverOverrideSetEventFilters = Partial<{
  entity: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"entity","type":"address"}>
}>;

/**
 * Creates an event object for the DonationFeeReceiverOverrideSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { donationFeeReceiverOverrideSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  donationFeeReceiverOverrideSetEvent({
 *  entity: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function donationFeeReceiverOverrideSetEvent(filters: DonationFeeReceiverOverrideSetEventFilters = {}) {
  return prepareEvent({
    signature: "event DonationFeeReceiverOverrideSet(address indexed entity, uint32 fee)",
    filters,
  });
};
  

/**
 * Represents the filters for the "EntityStatusSet" event.
 */
export type EntityStatusSetEventFilters = Partial<{
  entity: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"entity","type":"address"}>
}>;

/**
 * Creates an event object for the EntityStatusSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { entityStatusSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  entityStatusSetEvent({
 *  entity: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function entityStatusSetEvent(filters: EntityStatusSetEventFilters = {}) {
  return prepareEvent({
    signature: "event EntityStatusSet(address indexed entity, bool isActive)",
    filters,
  });
};
  

/**
 * Represents the filters for the "FactoryApprovalSet" event.
 */
export type FactoryApprovalSetEventFilters = Partial<{
  factory: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"factory","type":"address"}>
}>;

/**
 * Creates an event object for the FactoryApprovalSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { factoryApprovalSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  factoryApprovalSetEvent({
 *  factory: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function factoryApprovalSetEvent(filters: FactoryApprovalSetEventFilters = {}) {
  return prepareEvent({
    signature: "event FactoryApprovalSet(address indexed factory, bool isApproved)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OwnerUpdated" event.
 */
export type OwnerUpdatedEventFilters = Partial<{
  user: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"user","type":"address"}>
newOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}>
}>;

/**
 * Creates an event object for the OwnerUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownerUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownerUpdatedEvent({
 *  user: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function ownerUpdatedEvent(filters: OwnerUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnerUpdated(address indexed user, address indexed newOwner)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OwnershipChanged" event.
 */
export type OwnershipChangedEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"owner","type":"address"}>
newOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}>
}>;

/**
 * Creates an event object for the OwnershipChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipChangedEvent({
 *  owner: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function ownershipChangedEvent(filters: OwnershipChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnershipChanged(address indexed owner, address indexed newOwner)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OwnershipTransferProposed" event.
 */
export type OwnershipTransferProposedEventFilters = Partial<{
  user: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"user","type":"address"}>
newOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}>
}>;

/**
 * Creates an event object for the OwnershipTransferProposed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferProposedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferProposedEvent({
 *  user: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function ownershipTransferProposedEvent(filters: OwnershipTransferProposedEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnershipTransferProposed(address indexed user, address indexed newOwner)",
    filters,
  });
};
  

/**
 * Represents the filters for the "PayoutFeeOverrideSet" event.
 */
export type PayoutFeeOverrideSetEventFilters = Partial<{
  entity: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"entity","type":"address"}>
}>;

/**
 * Creates an event object for the PayoutFeeOverrideSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { payoutFeeOverrideSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  payoutFeeOverrideSetEvent({
 *  entity: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function payoutFeeOverrideSetEvent(filters: PayoutFeeOverrideSetEventFilters = {}) {
  return prepareEvent({
    signature: "event PayoutFeeOverrideSet(address indexed entity, uint32 fee)",
    filters,
  });
};
  

/**
 * Represents the filters for the "PortfolioStatusSet" event.
 */
export type PortfolioStatusSetEventFilters = Partial<{
  portfolio: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"portfolio","type":"address"}>
}>;

/**
 * Creates an event object for the PortfolioStatusSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { portfolioStatusSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  portfolioStatusSetEvent({
 *  portfolio: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function portfolioStatusSetEvent(filters: PortfolioStatusSetEventFilters = {}) {
  return prepareEvent({
    signature: "event PortfolioStatusSet(address indexed portfolio, bool isActive)",
    filters,
  });
};
  

/**
 * Represents the filters for the "PublicCapabilityUpdated" event.
 */
export type PublicCapabilityUpdatedEventFilters = Partial<{
  target: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"target","type":"address"}>
functionSig: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes4","name":"functionSig","type":"bytes4"}>
}>;

/**
 * Creates an event object for the PublicCapabilityUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { publicCapabilityUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  publicCapabilityUpdatedEvent({
 *  target: ...,
 *  functionSig: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function publicCapabilityUpdatedEvent(filters: PublicCapabilityUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event PublicCapabilityUpdated(address indexed target, bytes4 indexed functionSig, bool enabled)",
    filters,
  });
};
  

/**
 * Represents the filters for the "RoleCapabilityUpdated" event.
 */
export type RoleCapabilityUpdatedEventFilters = Partial<{
  role: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"role","type":"uint8"}>
target: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"target","type":"address"}>
functionSig: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes4","name":"functionSig","type":"bytes4"}>
}>;

/**
 * Creates an event object for the RoleCapabilityUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { roleCapabilityUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  roleCapabilityUpdatedEvent({
 *  role: ...,
 *  target: ...,
 *  functionSig: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function roleCapabilityUpdatedEvent(filters: RoleCapabilityUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event RoleCapabilityUpdated(uint8 indexed role, address indexed target, bytes4 indexed functionSig, bool enabled)",
    filters,
  });
};
  

/**
 * Represents the filters for the "SwapWrapperStatusSet" event.
 */
export type SwapWrapperStatusSetEventFilters = Partial<{
  swapWrapper: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"swapWrapper","type":"address"}>
}>;

/**
 * Creates an event object for the SwapWrapperStatusSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { swapWrapperStatusSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  swapWrapperStatusSetEvent({
 *  swapWrapper: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function swapWrapperStatusSetEvent(filters: SwapWrapperStatusSetEventFilters = {}) {
  return prepareEvent({
    signature: "event SwapWrapperStatusSet(address indexed swapWrapper, bool isSupported)",
    filters,
  });
};
  

/**
 * Represents the filters for the "TransferFeeReceiverOverrideSet" event.
 */
export type TransferFeeReceiverOverrideSetEventFilters = Partial<{
  fromEntityType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"fromEntityType","type":"uint8"}>
toEntity: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"toEntity","type":"address"}>
}>;

/**
 * Creates an event object for the TransferFeeReceiverOverrideSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferFeeReceiverOverrideSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferFeeReceiverOverrideSetEvent({
 *  fromEntityType: ...,
 *  toEntity: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function transferFeeReceiverOverrideSetEvent(filters: TransferFeeReceiverOverrideSetEventFilters = {}) {
  return prepareEvent({
    signature: "event TransferFeeReceiverOverrideSet(uint8 indexed fromEntityType, address indexed toEntity, uint32 fee)",
    filters,
  });
};
  

/**
 * Represents the filters for the "TransferFeeSenderOverrideSet" event.
 */
export type TransferFeeSenderOverrideSetEventFilters = Partial<{
  fromEntity: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"fromEntity","type":"address"}>
toEntityType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"toEntityType","type":"uint8"}>
}>;

/**
 * Creates an event object for the TransferFeeSenderOverrideSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferFeeSenderOverrideSetEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferFeeSenderOverrideSetEvent({
 *  fromEntity: ...,
 *  toEntityType: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function transferFeeSenderOverrideSetEvent(filters: TransferFeeSenderOverrideSetEventFilters = {}) {
  return prepareEvent({
    signature: "event TransferFeeSenderOverrideSet(address indexed fromEntity, uint8 indexed toEntityType, uint32 fee)",
    filters,
  });
};
  

/**
 * Represents the filters for the "TreasuryChanged" event.
 */
export type TreasuryChangedEventFilters = Partial<{
  newTreasury: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newTreasury","type":"address"}>
}>;

/**
 * Creates an event object for the TreasuryChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { treasuryChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  treasuryChangedEvent({
 *  newTreasury: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function treasuryChangedEvent(filters: TreasuryChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event TreasuryChanged(address oldTreasury, address indexed newTreasury)",
    filters,
  });
};
  

/**
 * Represents the filters for the "UserRoleUpdated" event.
 */
export type UserRoleUpdatedEventFilters = Partial<{
  user: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"user","type":"address"}>
role: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint8","name":"role","type":"uint8"}>
}>;

/**
 * Creates an event object for the UserRoleUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { userRoleUpdatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  userRoleUpdatedEvent({
 *  user: ...,
 *  role: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function userRoleUpdatedEvent(filters: UserRoleUpdatedEventFilters = {}) {
  return prepareEvent({
    signature: "event UserRoleUpdated(address indexed user, uint8 indexed role, bool enabled)",
    filters,
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "authority" function on the contract.
 * @param options - The options for the authority function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { authority } from "TODO";
 * 
 * const result = await authority();
 * 
 * ```
 */
export async function authority(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xbf7e214f",
  [],
  [
    {
      "internalType": "contract Authority",
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
 * Represents the parameters for the "canCall" function.
 */
export type CanCallParams = {
  user: AbiParameterToPrimitiveType<{"internalType":"address","name":"user","type":"address"}>
target: AbiParameterToPrimitiveType<{"internalType":"address","name":"target","type":"address"}>
functionSig: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"functionSig","type":"bytes4"}>
};

/**
 * Calls the "canCall" function on the contract.
 * @param options - The options for the canCall function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { canCall } from "TODO";
 * 
 * const result = await canCall({
 *  user: ...,
 *  target: ...,
 *  functionSig: ...,
 * });
 * 
 * ```
 */
export async function canCall(
  options: BaseTransactionOptions<CanCallParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb7009613",
  [
    {
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "target",
      "type": "address"
    },
    {
      "internalType": "bytes4",
      "name": "functionSig",
      "type": "bytes4"
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
    params: [options.user, options.target, options.functionSig]
  });
};


/**
 * Represents the parameters for the "doesRoleHaveCapability" function.
 */
export type DoesRoleHaveCapabilityParams = {
  role: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"role","type":"uint8"}>
target: AbiParameterToPrimitiveType<{"internalType":"address","name":"target","type":"address"}>
functionSig: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"functionSig","type":"bytes4"}>
};

/**
 * Calls the "doesRoleHaveCapability" function on the contract.
 * @param options - The options for the doesRoleHaveCapability function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { doesRoleHaveCapability } from "TODO";
 * 
 * const result = await doesRoleHaveCapability({
 *  role: ...,
 *  target: ...,
 *  functionSig: ...,
 * });
 * 
 * ```
 */
export async function doesRoleHaveCapability(
  options: BaseTransactionOptions<DoesRoleHaveCapabilityParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb4bad06a",
  [
    {
      "internalType": "uint8",
      "name": "role",
      "type": "uint8"
    },
    {
      "internalType": "address",
      "name": "target",
      "type": "address"
    },
    {
      "internalType": "bytes4",
      "name": "functionSig",
      "type": "bytes4"
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
    params: [options.role, options.target, options.functionSig]
  });
};


/**
 * Represents the parameters for the "doesUserHaveRole" function.
 */
export type DoesUserHaveRoleParams = {
  user: AbiParameterToPrimitiveType<{"internalType":"address","name":"user","type":"address"}>
role: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"role","type":"uint8"}>
};

/**
 * Calls the "doesUserHaveRole" function on the contract.
 * @param options - The options for the doesUserHaveRole function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { doesUserHaveRole } from "TODO";
 * 
 * const result = await doesUserHaveRole({
 *  user: ...,
 *  role: ...,
 * });
 * 
 * ```
 */
export async function doesUserHaveRole(
  options: BaseTransactionOptions<DoesUserHaveRoleParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xea7ca276",
  [
    {
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "role",
      "type": "uint8"
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
    params: [options.user, options.role]
  });
};


/**
 * Represents the parameters for the "getDonationFee" function.
 */
export type GetDonationFeeParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
};

/**
 * Calls the "getDonationFee" function on the contract.
 * @param options - The options for the getDonationFee function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getDonationFee } from "TODO";
 * 
 * const result = await getDonationFee({
 *  entity: ...,
 * });
 * 
 * ```
 */
export async function getDonationFee(
  options: BaseTransactionOptions<GetDonationFeeParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xa96abefe",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint32",
      "name": "",
      "type": "uint32"
    }
  ]
],
    params: [options.entity]
  });
};


/**
 * Represents the parameters for the "getDonationFeeWithOverrides" function.
 */
export type GetDonationFeeWithOverridesParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
};

/**
 * Calls the "getDonationFeeWithOverrides" function on the contract.
 * @param options - The options for the getDonationFeeWithOverrides function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getDonationFeeWithOverrides } from "TODO";
 * 
 * const result = await getDonationFeeWithOverrides({
 *  entity: ...,
 * });
 * 
 * ```
 */
export async function getDonationFeeWithOverrides(
  options: BaseTransactionOptions<GetDonationFeeWithOverridesParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x759c45dc",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint32",
      "name": "",
      "type": "uint32"
    }
  ]
],
    params: [options.entity]
  });
};


/**
 * Represents the parameters for the "getPayoutFee" function.
 */
export type GetPayoutFeeParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
};

/**
 * Calls the "getPayoutFee" function on the contract.
 * @param options - The options for the getPayoutFee function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getPayoutFee } from "TODO";
 * 
 * const result = await getPayoutFee({
 *  entity: ...,
 * });
 * 
 * ```
 */
export async function getPayoutFee(
  options: BaseTransactionOptions<GetPayoutFeeParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb4ea2a98",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint32",
      "name": "",
      "type": "uint32"
    }
  ]
],
    params: [options.entity]
  });
};


/**
 * Represents the parameters for the "getPayoutFeeWithOverrides" function.
 */
export type GetPayoutFeeWithOverridesParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
};

/**
 * Calls the "getPayoutFeeWithOverrides" function on the contract.
 * @param options - The options for the getPayoutFeeWithOverrides function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getPayoutFeeWithOverrides } from "TODO";
 * 
 * const result = await getPayoutFeeWithOverrides({
 *  entity: ...,
 * });
 * 
 * ```
 */
export async function getPayoutFeeWithOverrides(
  options: BaseTransactionOptions<GetPayoutFeeWithOverridesParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb3d58045",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint32",
      "name": "",
      "type": "uint32"
    }
  ]
],
    params: [options.entity]
  });
};


/**
 * Represents the parameters for the "getRolesWithCapability" function.
 */
export type GetRolesWithCapabilityParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
arg_1: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"","type":"bytes4"}>
};

/**
 * Calls the "getRolesWithCapability" function on the contract.
 * @param options - The options for the getRolesWithCapability function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getRolesWithCapability } from "TODO";
 * 
 * const result = await getRolesWithCapability({
 *  arg_0: ...,
 *  arg_1: ...,
 * });
 * 
 * ```
 */
export async function getRolesWithCapability(
  options: BaseTransactionOptions<GetRolesWithCapabilityParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x7917b794",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "bytes4",
      "name": "",
      "type": "bytes4"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.arg_0, options.arg_1]
  });
};


/**
 * Represents the parameters for the "getTransferFee" function.
 */
export type GetTransferFeeParams = {
  sender: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_sender","type":"address"}>
receiver: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_receiver","type":"address"}>
};

/**
 * Calls the "getTransferFee" function on the contract.
 * @param options - The options for the getTransferFee function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getTransferFee } from "TODO";
 * 
 * const result = await getTransferFee({
 *  sender: ...,
 *  receiver: ...,
 * });
 * 
 * ```
 */
export async function getTransferFee(
  options: BaseTransactionOptions<GetTransferFeeParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xda93546e",
  [
    {
      "internalType": "contract Entity",
      "name": "_sender",
      "type": "address"
    },
    {
      "internalType": "contract Entity",
      "name": "_receiver",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint32",
      "name": "",
      "type": "uint32"
    }
  ]
],
    params: [options.sender, options.receiver]
  });
};


/**
 * Represents the parameters for the "getTransferFeeWithOverrides" function.
 */
export type GetTransferFeeWithOverridesParams = {
  sender: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_sender","type":"address"}>
receiver: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_receiver","type":"address"}>
};

/**
 * Calls the "getTransferFeeWithOverrides" function on the contract.
 * @param options - The options for the getTransferFeeWithOverrides function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getTransferFeeWithOverrides } from "TODO";
 * 
 * const result = await getTransferFeeWithOverrides({
 *  sender: ...,
 *  receiver: ...,
 * });
 * 
 * ```
 */
export async function getTransferFeeWithOverrides(
  options: BaseTransactionOptions<GetTransferFeeWithOverridesParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x864ec3f0",
  [
    {
      "internalType": "contract Entity",
      "name": "_sender",
      "type": "address"
    },
    {
      "internalType": "contract Entity",
      "name": "_receiver",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint32",
      "name": "",
      "type": "uint32"
    }
  ]
],
    params: [options.sender, options.receiver]
  });
};


/**
 * Represents the parameters for the "getUserRoles" function.
 */
export type GetUserRolesParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "getUserRoles" function on the contract.
 * @param options - The options for the getUserRoles function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getUserRoles } from "TODO";
 * 
 * const result = await getUserRoles({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function getUserRoles(
  options: BaseTransactionOptions<GetUserRolesParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x06a36aee",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "isActiveEntity" function.
 */
export type IsActiveEntityParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"","type":"address"}>
};

/**
 * Calls the "isActiveEntity" function on the contract.
 * @param options - The options for the isActiveEntity function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isActiveEntity } from "TODO";
 * 
 * const result = await isActiveEntity({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function isActiveEntity(
  options: BaseTransactionOptions<IsActiveEntityParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xea3fff68",
  [
    {
      "internalType": "contract Entity",
      "name": "",
      "type": "address"
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


/**
 * Represents the parameters for the "isActivePortfolio" function.
 */
export type IsActivePortfolioParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"contract Portfolio","name":"","type":"address"}>
};

/**
 * Calls the "isActivePortfolio" function on the contract.
 * @param options - The options for the isActivePortfolio function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isActivePortfolio } from "TODO";
 * 
 * const result = await isActivePortfolio({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function isActivePortfolio(
  options: BaseTransactionOptions<IsActivePortfolioParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x55c6f683",
  [
    {
      "internalType": "contract Portfolio",
      "name": "",
      "type": "address"
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


/**
 * Represents the parameters for the "isApprovedFactory" function.
 */
export type IsApprovedFactoryParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "isApprovedFactory" function on the contract.
 * @param options - The options for the isApprovedFactory function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isApprovedFactory } from "TODO";
 * 
 * const result = await isApprovedFactory({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function isApprovedFactory(
  options: BaseTransactionOptions<IsApprovedFactoryParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x26cf3739",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
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


/**
 * Represents the parameters for the "isCapabilityPublic" function.
 */
export type IsCapabilityPublicParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
arg_1: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"","type":"bytes4"}>
};

/**
 * Calls the "isCapabilityPublic" function on the contract.
 * @param options - The options for the isCapabilityPublic function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isCapabilityPublic } from "TODO";
 * 
 * const result = await isCapabilityPublic({
 *  arg_0: ...,
 *  arg_1: ...,
 * });
 * 
 * ```
 */
export async function isCapabilityPublic(
  options: BaseTransactionOptions<IsCapabilityPublicParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x2f47571f",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "bytes4",
      "name": "",
      "type": "bytes4"
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
    params: [options.arg_0, options.arg_1]
  });
};


/**
 * Represents the parameters for the "isSwapperSupported" function.
 */
export type IsSwapperSupportedParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"contract ISwapWrapper","name":"","type":"address"}>
};

/**
 * Calls the "isSwapperSupported" function on the contract.
 * @param options - The options for the isSwapperSupported function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isSwapperSupported } from "TODO";
 * 
 * const result = await isSwapperSupported({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function isSwapperSupported(
  options: BaseTransactionOptions<IsSwapperSupportedParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x6ab39057",
  [
    {
      "internalType": "contract ISwapWrapper",
      "name": "",
      "type": "address"
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
 * Calls the "pendingOwner" function on the contract.
 * @param options - The options for the pendingOwner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { pendingOwner } from "TODO";
 * 
 * const result = await pendingOwner();
 * 
 * ```
 */
export async function pendingOwner(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe30c3978",
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
 * Represents the parameters for the "setOwner" function.
 */
export type SetOwnerParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "setOwner" function on the contract.
 * @param options - The options for the setOwner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { setOwner } from "TODO";
 * 
 * const result = await setOwner({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function setOwner(
  options: BaseTransactionOptions<SetOwnerParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x13af4035",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  []
],
    params: [options.arg_0]
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
 * Calls the "claimOwnership" function on the contract.
 * @param options - The options for the "claimOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { claimOwnership } from "TODO";
 * 
 * const transaction = claimOwnership();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function claimOwnership(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x4e71e0c8",
  [],
  []
],
    params: []
  });
};


/**
 * Represents the parameters for the "setAuthority" function.
 */
export type SetAuthorityParams = {
  newAuthority: AbiParameterToPrimitiveType<{"internalType":"contract Authority","name":"newAuthority","type":"address"}>
};

/**
 * Calls the "setAuthority" function on the contract.
 * @param options - The options for the "setAuthority" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setAuthority } from "TODO";
 * 
 * const transaction = setAuthority({
 *  newAuthority: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setAuthority(
  options: BaseTransactionOptions<SetAuthorityParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x7a9e5e4b",
  [
    {
      "internalType": "contract Authority",
      "name": "newAuthority",
      "type": "address"
    }
  ],
  []
],
    params: [options.newAuthority]
  });
};


/**
 * Represents the parameters for the "setDefaultDonationFee" function.
 */
export type SetDefaultDonationFeeParams = {
  entityType: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"_entityType","type":"uint8"}>
fee: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"_fee","type":"uint32"}>
};

/**
 * Calls the "setDefaultDonationFee" function on the contract.
 * @param options - The options for the "setDefaultDonationFee" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setDefaultDonationFee } from "TODO";
 * 
 * const transaction = setDefaultDonationFee({
 *  entityType: ...,
 *  fee: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setDefaultDonationFee(
  options: BaseTransactionOptions<SetDefaultDonationFeeParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x1e357405",
  [
    {
      "internalType": "uint8",
      "name": "_entityType",
      "type": "uint8"
    },
    {
      "internalType": "uint32",
      "name": "_fee",
      "type": "uint32"
    }
  ],
  []
],
    params: [options.entityType, options.fee]
  });
};


/**
 * Represents the parameters for the "setDefaultPayoutFee" function.
 */
export type SetDefaultPayoutFeeParams = {
  entityType: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"_entityType","type":"uint8"}>
fee: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"_fee","type":"uint32"}>
};

/**
 * Calls the "setDefaultPayoutFee" function on the contract.
 * @param options - The options for the "setDefaultPayoutFee" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setDefaultPayoutFee } from "TODO";
 * 
 * const transaction = setDefaultPayoutFee({
 *  entityType: ...,
 *  fee: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setDefaultPayoutFee(
  options: BaseTransactionOptions<SetDefaultPayoutFeeParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x21ceeb17",
  [
    {
      "internalType": "uint8",
      "name": "_entityType",
      "type": "uint8"
    },
    {
      "internalType": "uint32",
      "name": "_fee",
      "type": "uint32"
    }
  ],
  []
],
    params: [options.entityType, options.fee]
  });
};


/**
 * Represents the parameters for the "setDefaultTransferFee" function.
 */
export type SetDefaultTransferFeeParams = {
  fromEntityType: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"_fromEntityType","type":"uint8"}>
toEntityType: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"_toEntityType","type":"uint8"}>
fee: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"_fee","type":"uint32"}>
};

/**
 * Calls the "setDefaultTransferFee" function on the contract.
 * @param options - The options for the "setDefaultTransferFee" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setDefaultTransferFee } from "TODO";
 * 
 * const transaction = setDefaultTransferFee({
 *  fromEntityType: ...,
 *  toEntityType: ...,
 *  fee: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setDefaultTransferFee(
  options: BaseTransactionOptions<SetDefaultTransferFeeParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa916c02e",
  [
    {
      "internalType": "uint8",
      "name": "_fromEntityType",
      "type": "uint8"
    },
    {
      "internalType": "uint8",
      "name": "_toEntityType",
      "type": "uint8"
    },
    {
      "internalType": "uint32",
      "name": "_fee",
      "type": "uint32"
    }
  ],
  []
],
    params: [options.fromEntityType, options.toEntityType, options.fee]
  });
};


/**
 * Represents the parameters for the "setDonationFeeReceiverOverride" function.
 */
export type SetDonationFeeReceiverOverrideParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
fee: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"_fee","type":"uint32"}>
};

/**
 * Calls the "setDonationFeeReceiverOverride" function on the contract.
 * @param options - The options for the "setDonationFeeReceiverOverride" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setDonationFeeReceiverOverride } from "TODO";
 * 
 * const transaction = setDonationFeeReceiverOverride({
 *  entity: ...,
 *  fee: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setDonationFeeReceiverOverride(
  options: BaseTransactionOptions<SetDonationFeeReceiverOverrideParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x0d00819e",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    },
    {
      "internalType": "uint32",
      "name": "_fee",
      "type": "uint32"
    }
  ],
  []
],
    params: [options.entity, options.fee]
  });
};


/**
 * Represents the parameters for the "setEntityActive" function.
 */
export type SetEntityActiveParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
};

/**
 * Calls the "setEntityActive" function on the contract.
 * @param options - The options for the "setEntityActive" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setEntityActive } from "TODO";
 * 
 * const transaction = setEntityActive({
 *  entity: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setEntityActive(
  options: BaseTransactionOptions<SetEntityActiveParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x0160a6e2",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    }
  ],
  []
],
    params: [options.entity]
  });
};


/**
 * Represents the parameters for the "setEntityStatus" function.
 */
export type SetEntityStatusParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
isActive: AbiParameterToPrimitiveType<{"internalType":"bool","name":"_isActive","type":"bool"}>
};

/**
 * Calls the "setEntityStatus" function on the contract.
 * @param options - The options for the "setEntityStatus" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setEntityStatus } from "TODO";
 * 
 * const transaction = setEntityStatus({
 *  entity: ...,
 *  isActive: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setEntityStatus(
  options: BaseTransactionOptions<SetEntityStatusParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x83f5b1d3",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "_isActive",
      "type": "bool"
    }
  ],
  []
],
    params: [options.entity, options.isActive]
  });
};


/**
 * Represents the parameters for the "setFactoryApproval" function.
 */
export type SetFactoryApprovalParams = {
  factory: AbiParameterToPrimitiveType<{"internalType":"address","name":"_factory","type":"address"}>
isApproved: AbiParameterToPrimitiveType<{"internalType":"bool","name":"_isApproved","type":"bool"}>
};

/**
 * Calls the "setFactoryApproval" function on the contract.
 * @param options - The options for the "setFactoryApproval" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setFactoryApproval } from "TODO";
 * 
 * const transaction = setFactoryApproval({
 *  factory: ...,
 *  isApproved: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setFactoryApproval(
  options: BaseTransactionOptions<SetFactoryApprovalParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xefa892c3",
  [
    {
      "internalType": "address",
      "name": "_factory",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "_isApproved",
      "type": "bool"
    }
  ],
  []
],
    params: [options.factory, options.isApproved]
  });
};


/**
 * Represents the parameters for the "setPayoutFeeOverride" function.
 */
export type SetPayoutFeeOverrideParams = {
  entity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_entity","type":"address"}>
fee: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"_fee","type":"uint32"}>
};

/**
 * Calls the "setPayoutFeeOverride" function on the contract.
 * @param options - The options for the "setPayoutFeeOverride" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setPayoutFeeOverride } from "TODO";
 * 
 * const transaction = setPayoutFeeOverride({
 *  entity: ...,
 *  fee: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setPayoutFeeOverride(
  options: BaseTransactionOptions<SetPayoutFeeOverrideParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x7d18f2ca",
  [
    {
      "internalType": "contract Entity",
      "name": "_entity",
      "type": "address"
    },
    {
      "internalType": "uint32",
      "name": "_fee",
      "type": "uint32"
    }
  ],
  []
],
    params: [options.entity, options.fee]
  });
};


/**
 * Represents the parameters for the "setPortfolioStatus" function.
 */
export type SetPortfolioStatusParams = {
  portfolio: AbiParameterToPrimitiveType<{"internalType":"contract Portfolio","name":"_portfolio","type":"address"}>
isActive: AbiParameterToPrimitiveType<{"internalType":"bool","name":"_isActive","type":"bool"}>
};

/**
 * Calls the "setPortfolioStatus" function on the contract.
 * @param options - The options for the "setPortfolioStatus" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setPortfolioStatus } from "TODO";
 * 
 * const transaction = setPortfolioStatus({
 *  portfolio: ...,
 *  isActive: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setPortfolioStatus(
  options: BaseTransactionOptions<SetPortfolioStatusParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x952ecc82",
  [
    {
      "internalType": "contract Portfolio",
      "name": "_portfolio",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "_isActive",
      "type": "bool"
    }
  ],
  []
],
    params: [options.portfolio, options.isActive]
  });
};


/**
 * Represents the parameters for the "setPublicCapability" function.
 */
export type SetPublicCapabilityParams = {
  target: AbiParameterToPrimitiveType<{"internalType":"address","name":"target","type":"address"}>
functionSig: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"functionSig","type":"bytes4"}>
enabled: AbiParameterToPrimitiveType<{"internalType":"bool","name":"enabled","type":"bool"}>
};

/**
 * Calls the "setPublicCapability" function on the contract.
 * @param options - The options for the "setPublicCapability" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setPublicCapability } from "TODO";
 * 
 * const transaction = setPublicCapability({
 *  target: ...,
 *  functionSig: ...,
 *  enabled: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setPublicCapability(
  options: BaseTransactionOptions<SetPublicCapabilityParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xc6b0263e",
  [
    {
      "internalType": "address",
      "name": "target",
      "type": "address"
    },
    {
      "internalType": "bytes4",
      "name": "functionSig",
      "type": "bytes4"
    },
    {
      "internalType": "bool",
      "name": "enabled",
      "type": "bool"
    }
  ],
  []
],
    params: [options.target, options.functionSig, options.enabled]
  });
};


/**
 * Represents the parameters for the "setRoleCapability" function.
 */
export type SetRoleCapabilityParams = {
  role: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"role","type":"uint8"}>
target: AbiParameterToPrimitiveType<{"internalType":"address","name":"target","type":"address"}>
functionSig: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"functionSig","type":"bytes4"}>
enabled: AbiParameterToPrimitiveType<{"internalType":"bool","name":"enabled","type":"bool"}>
};

/**
 * Calls the "setRoleCapability" function on the contract.
 * @param options - The options for the "setRoleCapability" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setRoleCapability } from "TODO";
 * 
 * const transaction = setRoleCapability({
 *  role: ...,
 *  target: ...,
 *  functionSig: ...,
 *  enabled: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setRoleCapability(
  options: BaseTransactionOptions<SetRoleCapabilityParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x7d40583d",
  [
    {
      "internalType": "uint8",
      "name": "role",
      "type": "uint8"
    },
    {
      "internalType": "address",
      "name": "target",
      "type": "address"
    },
    {
      "internalType": "bytes4",
      "name": "functionSig",
      "type": "bytes4"
    },
    {
      "internalType": "bool",
      "name": "enabled",
      "type": "bool"
    }
  ],
  []
],
    params: [options.role, options.target, options.functionSig, options.enabled]
  });
};


/**
 * Represents the parameters for the "setSwapWrapperStatus" function.
 */
export type SetSwapWrapperStatusParams = {
  swapWrapper: AbiParameterToPrimitiveType<{"internalType":"contract ISwapWrapper","name":"_swapWrapper","type":"address"}>
supported: AbiParameterToPrimitiveType<{"internalType":"bool","name":"_supported","type":"bool"}>
};

/**
 * Calls the "setSwapWrapperStatus" function on the contract.
 * @param options - The options for the "setSwapWrapperStatus" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setSwapWrapperStatus } from "TODO";
 * 
 * const transaction = setSwapWrapperStatus({
 *  swapWrapper: ...,
 *  supported: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setSwapWrapperStatus(
  options: BaseTransactionOptions<SetSwapWrapperStatusParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xe5e8c306",
  [
    {
      "internalType": "contract ISwapWrapper",
      "name": "_swapWrapper",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "_supported",
      "type": "bool"
    }
  ],
  []
],
    params: [options.swapWrapper, options.supported]
  });
};


/**
 * Represents the parameters for the "setTransferFeeReceiverOverride" function.
 */
export type SetTransferFeeReceiverOverrideParams = {
  fromEntityType: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"_fromEntityType","type":"uint8"}>
toEntity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_toEntity","type":"address"}>
fee: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"_fee","type":"uint32"}>
};

/**
 * Calls the "setTransferFeeReceiverOverride" function on the contract.
 * @param options - The options for the "setTransferFeeReceiverOverride" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setTransferFeeReceiverOverride } from "TODO";
 * 
 * const transaction = setTransferFeeReceiverOverride({
 *  fromEntityType: ...,
 *  toEntity: ...,
 *  fee: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setTransferFeeReceiverOverride(
  options: BaseTransactionOptions<SetTransferFeeReceiverOverrideParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x1c4af798",
  [
    {
      "internalType": "uint8",
      "name": "_fromEntityType",
      "type": "uint8"
    },
    {
      "internalType": "contract Entity",
      "name": "_toEntity",
      "type": "address"
    },
    {
      "internalType": "uint32",
      "name": "_fee",
      "type": "uint32"
    }
  ],
  []
],
    params: [options.fromEntityType, options.toEntity, options.fee]
  });
};


/**
 * Represents the parameters for the "setTransferFeeSenderOverride" function.
 */
export type SetTransferFeeSenderOverrideParams = {
  fromEntity: AbiParameterToPrimitiveType<{"internalType":"contract Entity","name":"_fromEntity","type":"address"}>
toEntityType: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"_toEntityType","type":"uint8"}>
fee: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"_fee","type":"uint32"}>
};

/**
 * Calls the "setTransferFeeSenderOverride" function on the contract.
 * @param options - The options for the "setTransferFeeSenderOverride" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setTransferFeeSenderOverride } from "TODO";
 * 
 * const transaction = setTransferFeeSenderOverride({
 *  fromEntity: ...,
 *  toEntityType: ...,
 *  fee: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setTransferFeeSenderOverride(
  options: BaseTransactionOptions<SetTransferFeeSenderOverrideParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x3921c459",
  [
    {
      "internalType": "contract Entity",
      "name": "_fromEntity",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "_toEntityType",
      "type": "uint8"
    },
    {
      "internalType": "uint32",
      "name": "_fee",
      "type": "uint32"
    }
  ],
  []
],
    params: [options.fromEntity, options.toEntityType, options.fee]
  });
};


/**
 * Represents the parameters for the "setTreasury" function.
 */
export type SetTreasuryParams = {
  newTreasury: AbiParameterToPrimitiveType<{"internalType":"address","name":"_newTreasury","type":"address"}>
};

/**
 * Calls the "setTreasury" function on the contract.
 * @param options - The options for the "setTreasury" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setTreasury } from "TODO";
 * 
 * const transaction = setTreasury({
 *  newTreasury: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setTreasury(
  options: BaseTransactionOptions<SetTreasuryParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf0f44260",
  [
    {
      "internalType": "address",
      "name": "_newTreasury",
      "type": "address"
    }
  ],
  []
],
    params: [options.newTreasury]
  });
};


/**
 * Represents the parameters for the "setUserRole" function.
 */
export type SetUserRoleParams = {
  user: AbiParameterToPrimitiveType<{"internalType":"address","name":"user","type":"address"}>
role: AbiParameterToPrimitiveType<{"internalType":"uint8","name":"role","type":"uint8"}>
enabled: AbiParameterToPrimitiveType<{"internalType":"bool","name":"enabled","type":"bool"}>
};

/**
 * Calls the "setUserRole" function on the contract.
 * @param options - The options for the "setUserRole" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setUserRole } from "TODO";
 * 
 * const transaction = setUserRole({
 *  user: ...,
 *  role: ...,
 *  enabled: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setUserRole(
  options: BaseTransactionOptions<SetUserRoleParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x67aff484",
  [
    {
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "role",
      "type": "uint8"
    },
    {
      "internalType": "bool",
      "name": "enabled",
      "type": "bool"
    }
  ],
  []
],
    params: [options.user, options.role, options.enabled]
  });
};


/**
 * Represents the parameters for the "transferOwnership" function.
 */
export type TransferOwnershipParams = {
  newOwner: AbiParameterToPrimitiveType<{"internalType":"address","name":"_newOwner","type":"address"}>
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
 *  newOwner: ...,
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
      "name": "_newOwner",
      "type": "address"
    }
  ],
  []
],
    params: [options.newOwner]
  });
};


