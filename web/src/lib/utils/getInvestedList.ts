import {
    client,
    TREASURY_MODULE_ID,
  } from './aptosClient';
  import { useWallet } from "@manahippo/aptos-wallet-adapter";

  
  export const getInvestedList = async () => {
    // const {account} = useWallet()
    // if (!account?.address) return
    const { type, data } = await client.getAccountResource(
      // account?.address,
      "0x462bd61cb6dd005307fd857541c7d8a706fffaa97ceaa38a6278c25cc7fb7387",
      TREASURY_MODULE_ID + 'Bonds'
    );
    return { type, data };
  };