import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { RequestType, WarningType } from './constants';

export interface CommonMessage {
  requestId: string;
  data: MessageData;
}

export interface TransactionMessage extends CommonMessage {
  data: TransactionMessageData;
}

export interface TypedSignatureMessage extends CommonMessage {
  data: TypedSignatureMessageData;
}

export interface UntypedSignatureMessage extends CommonMessage {
  data: UntypedSignatureMessageData;
}

export type Message = TransactionMessage | TypedSignatureMessage | UntypedSignatureMessage;

export interface CommonMessageData {
  type: RequestType;
  hostname: string;
  bypassed?: boolean;
}

export interface TransactionMessageData extends CommonMessageData {
  type: RequestType.TRANSACTION;
  transaction: Transaction;
  chainId: number;
}

export interface TypedSignatureMessageData extends CommonMessageData {
  type: RequestType.TYPED_SIGNATURE;
  typedData: TypedData;
  chainId: number;
}

export interface UntypedSignatureMessageData extends CommonMessageData {
  type: RequestType.UNTYPED_SIGNATURE;
  message: string;
}

export type MessageData = TransactionMessageData | TypedSignatureMessageData | UntypedSignatureMessageData;

export interface MessageResponse {
  requestId: string;
  data: boolean;
}

export type InPageMessageData =
  | Omit<TransactionMessageData, 'hostname'>
  | Omit<TypedSignatureMessageData, 'hostname'>
  | Omit<UntypedSignatureMessageData, 'hostname'>;

export interface InPageMessage {
  requestId: string;
  data: InPageMessageData;
}

export interface TypedData {
  message?: any;
  domain?: TypedDataDomain;
  primaryType?: string;
}

export interface Transaction {
  from?: string;
  to?: string;
  data?: string;
}

export interface NftListingItem {
  itemType: string;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
}

export interface NftListing {
  offer: NftListingItem[];
  consideration: NftListingItem[];
}

export interface CommonWarningData {
  type: WarningType;
  requestId: string;
  bypassed: boolean;
  hostname: string;
}

export interface AllowanceWarningData extends CommonWarningData {
  type: WarningType.ALLOWANCE;
  chainId: number;
  asset: string;
  spender: string;
}

export interface ListingWarningData extends CommonWarningData {
  type: WarningType.LISTING;
  chainId: number;
  listing: NftListing;
  platform: string;
}

export interface HashwarningData extends CommonWarningData {
  type: WarningType.HASH;
}

export type WarningData = AllowanceWarningData | ListingWarningData | HashwarningData;
