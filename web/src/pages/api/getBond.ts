import { BondData } from '@/types';
import { client } from '../../utils/aptosClient';

export const getBond = async () => {
  const { type, data } = await client.getAccountResource(
    '0xa9eb381c1bad4a7b6909dbdf3a52b99b62148a0c657019292d98191e03b91631',
    '0xa9eb381c1bad4a7b6909dbdf3a52b99b62148a0c657019292d98191e03b91631::inbond_treasury::Treasury<0x1::aptos_coin::AptosCoin>'
  );
  return { type, data };
};
