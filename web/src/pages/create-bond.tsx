import type { NextPageWithLayout } from '@/types/typing';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import CreateBond from '@/components/create-bond/create-bond';

const CreateBondPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="" description="" />
      <CreateBond />
    </>
  );
};

CreateBondPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateBondPage;
