import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import CreateNFT from '@/components/create-nft/create-nft';

const CreateBondPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="" description="" />
      <CreateNFT />
    </>
  );
};

CreateBondPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateBondPage;
