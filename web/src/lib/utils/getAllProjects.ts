import {
    client,
    CREATOR_ADDRESS,
    FOUNDERINFOS_MODULE_ID,
  } from './aptosClient';
  
  export const getAllProjects = async () => {
    const { type, data } = await client.getAccountResource(
      CREATOR_ADDRESS,
      FOUNDERINFOS_MODULE_ID + 'FounderInfos'
    );
    return { type, data };
  };
  