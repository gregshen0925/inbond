import { client, INBOND_MODULE_ID } from './aptosClient';

export const getBond = async (creatorAddress: string, coinType: string) => {
  const { type, data } = await client.getAccountResource(
    creatorAddress,
    INBOND_MODULE_ID + `Project<${coinType}>`
  );
  return { type, data };
};
