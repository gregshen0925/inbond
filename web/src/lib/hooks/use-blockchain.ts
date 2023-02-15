import { getBond } from '@/lib/utils/getBond';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useQuery } from '@tanstack/react-query';
import type { Types } from 'aptos';
import toast from 'react-hot-toast';
import { client, coinClient, TREASURY_MODULE_ID } from '../utils/aptosClient';
import { getInvestedList } from '../utils/getInvestedList';
import { getAllProjects } from '../utils/getAllProjects';

export function useBlockchain() {
  const { account, signAndSubmitTransaction } = useWallet();

  const {
    data: allProjects,
    isSuccess: getAllProjectsSuccess,
    isLoading: getAllProjectsLoading,
  } = useQuery({
    queryKey: ['allProjects'],
    queryFn: getAllProjects,
  });

  const getTokenBalance = async (userAddress: string, coinType: string) => {
    return await coinClient.checkBalance(userAddress, { coinType });
  };

  const invest = async (investAmount: number, creator_address: string) => {
    if (!account?.address || !account?.publicKey) {
      toast.error('Please connect wallet first');
    } else {
      const payload: Types.TransactionPayload = {
        type: 'entry_function_payload',
        function: `${TREASURY_MODULE_ID}invest`,
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: [creator_address, investAmount! * 10 ** 8],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      await client
        .waitForTransaction(transactionRes?.hash || '', { checkSuccess: true })
        .then(() => {
          toast.success(`Successfully invested ${investAmount} APT`);
        });
    }
  };

  const convert = async (
    fundingType: string,
    founderType: string,
    creatorAddress: string,
    convertAmount: number
  ) => {
    if (!account?.address || !account?.publicKey) {
      toast.error('Please connect wallet first');
    } else {
      const payload: Types.TransactionPayload = {
        type: 'entry_function_payload',
        function: `${TREASURY_MODULE_ID}convert_all`,
        type_arguments: [fundingType, founderType],
        arguments: [creatorAddress],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      await client
        .waitForTransaction(transactionRes?.hash || '', { checkSuccess: true })
        .then(() => {
          toast.success(`Successfully converted ${convertAmount} APT`);
        });
    }
  };

  const redeem = async (
    coinType: string,
    createAddress: string,
    redeemAmount: number
  ) => {
    if (!account?.address || !account?.publicKey) {
      toast.error('Please connect wallet first');
    } else {
      const payload: Types.TransactionPayload = {
        type: 'entry_function_payload',
        function: `${TREASURY_MODULE_ID}redeem_all`,
        type_arguments: [coinType],
        arguments: [createAddress],
      };
      const transactionRes = await signAndSubmitTransaction(
        payload
        // txOptions
      );
      await client
        .waitForTransaction(transactionRes?.hash || '', { checkSuccess: true })
        .then(() => {
          toast.success(`Successfully redeemed ${redeemAmount * 0.9} APT`);
        });
    }
  };

  return {
    getTokenBalance,
    invest,
    convert,
    redeem,
    allProjects,
    getAllProjectsSuccess,
    getAllProjectsLoading,
  };
}
