import { AptosClient, Types } from 'aptos';

const NODE_URL =
  process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

export const client = new AptosClient(NODE_URL);

export { Types };

export const MODULE_ADDRESS =
  '0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9';

export const TREASURY_MODULE_ID = `${MODULE_ADDRESS}::inbond_treasury`;

export const CREATOR_ADDRESS =
  '0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9';