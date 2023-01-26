import { AptosClient, Types } from 'aptos';

const NODE_URL =
  process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

export const client = new AptosClient(NODE_URL);

export { Types };

export const MODULE_ADDRESS =
  '0xa9eb381c1bad4a7b6909dbdf3a52b99b62148a0c657019292d98191e03b91631';

export const TREASURY_MODULE_ID = `${MODULE_ADDRESS}::inbond_treasury`;

export const CREATOR_ADDRESS =
  '0xa9eb381c1bad4a7b6909dbdf3a52b99b62148a0c657019292d98191e03b91631';

export const USER_TABLE_HANDLE =
  '0x2ff381fa3c00c286d83e16b74e21833649b473a2ed53a1a85a8d53483b133ded';
