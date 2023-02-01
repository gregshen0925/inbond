import { AptosClient, Types, CoinClient } from 'aptos';

const NODE_URL =
  process.env.APTOS_NODE_URL || 'https://fullnode.testnet.aptoslabs.com';

export const client = new AptosClient(NODE_URL);

export const coinClient = new CoinClient(client);

export { Types };

export const MODULE_ADDRESS =
  '0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9';

export const TREASURY_MODULE_ID = `${MODULE_ADDRESS}::inbond::`;

export const FOUNDERINFOS_MODULE_ID =
  '0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9::inbond::';

export const CREATOR_ADDRESS =
  '0x6064192b201dc3a7cff0513654610b141e754c9eb1ff22d40622f858c9d912e9';

export const APT_TYPE = "0x1::aptos_coin::AptosCoin";
