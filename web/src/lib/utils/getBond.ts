import {
  client,
  CREATOR_ADDRESS,
  TREASURY_MODULE_ID,
} from './aptosClient';

export const getBond = async (creatorAddress:string,coinType:string) => {
  const { type, data } = await client.getAccountResource(
    CREATOR_ADDRESS,
    TREASURY_MODULE_ID + `Treasury<${coinType}>`
  );
  return { type, data };
};
