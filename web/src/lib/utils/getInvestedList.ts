import { client, INBOND_MODULE_ID } from './aptosClient';

export const getInvestedList = async (userAddress: string) => {
  if (!userAddress) return;
  const { type, data } = await client.getAccountResource(
    userAddress,
    INBOND_MODULE_ID + 'Bonds'
  );
  return { type, data };
};
