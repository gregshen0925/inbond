import {
  client,
  CREATOR_ADDRESS,
  MODULE_ADDRESS,
  TREASURY_MODULE_ID,
} from '../../utils/aptosClient';

export const getBond = async () => {
  const { type, data } = await client.getAccountResource(
    CREATOR_ADDRESS,
    TREASURY_MODULE_ID + '::Treasury<0x1::aptos_coin::AptosCoin>'
  );
  return { type, data };
};
