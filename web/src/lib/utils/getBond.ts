import { client, TREASURY_MODULE_ID } from './aptosClient';

export const getBond = async (creatorAddress: string, coinType: string) => {
  const { type, data } = await client.getAccountResource(
    creatorAddress,
    TREASURY_MODULE_ID + `Treasury<${coinType}>`
  );
  return { type, data };
};
