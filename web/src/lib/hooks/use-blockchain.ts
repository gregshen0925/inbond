import { getBond } from "@/lib/utils/getBond";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useQuery } from "@tanstack/react-query";
import type { Types } from "aptos";
import toast from "react-hot-toast";
import { client, CREATOR_ADDRESS, TREASURY_MODULE_ID } from '../utils/aptosClient';
import { getInvestedList } from '../utils/getInvestedList';
import { getAllProjects } from '../utils/getAllProjects';

export function useBlockchain(){
    const {
        account,
        signAndSubmitTransaction,
        connected,
        wallet: currentWallet,
        signMessage,
        signTransaction,
      } = useWallet();


      const {
        data: investedList,
        isSuccess:investedListSuccess,
        isLoading:investedListLoading,
      } = useQuery({
        queryKey: ['investedList'],
        queryFn: getInvestedList,
      })

      const {
        data: allProjects,
        isSuccess:getAllProjectsSuccess,
        isLoading:getAllProjectsLoading,
      } = useQuery({
        queryKey: ['allProjects'],
        queryFn: getAllProjects,
      })

      const invest = async (investAmount:number)=>{
        if (!account?.address || !account?.publicKey){
            toast.error("Please connect wallet first")
        }
        else {
            const payload: Types.TransactionPayload = {
              type: "entry_function_payload",
              function: `${TREASURY_MODULE_ID}invest`,
              type_arguments: ["0x1::aptos_coin::AptosCoin"],
              arguments: [CREATOR_ADDRESS,investAmount!*10**8],
            };
            const transactionRes = await signAndSubmitTransaction(
              payload
              // txOptions
            );
            await client
              .waitForTransaction(transactionRes?.hash || "", { checkSuccess: true })
              .then(() => {
                toast.success(`Successfully invested ${investAmount} APT`)
              });
      }
    }

      return {
        //  bondQuery,
        //  bondQuerySuccess, 
        //  bondQueryLoading,
         invest,
         investedList, 
         investedListSuccess,
         investedListLoading,
         allProjects,
         getAllProjectsSuccess,
         getAllProjectsLoading
        }
}