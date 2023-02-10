import { AptosClient, Types, CoinClient } from 'aptos';

const NODE_URL =
  process.env.APTOS_NODE_URL || 'https://fullnode.testnet.aptoslabs.com';

export const client = new AptosClient(NODE_URL);

export const coinClient = new CoinClient(client);

export { Types };

export const MODULE_ADDRESS =
  '0x0dc7b2c036447526dbc3bf97e1f76944a9b57492377f2100f7537a59b9df685f';

export const INBOND_MODULE_ID = `${MODULE_ADDRESS}::inbond_v2::`;

export const APT_TYPE = "0x1::aptos_coin::AptosCoin";
