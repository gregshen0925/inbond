import {
    client,
    MODULE_ADDRESS,
    INBOND_MODULE_ID,
  } from './aptosClient';
  
  export const getAllProjects = async () => {
    const { type, data } = await client.getAccountResource(
      MODULE_ADDRESS,
      INBOND_MODULE_ID + 'ProjectInfoList'
    );
    return { type, data };
  };
  