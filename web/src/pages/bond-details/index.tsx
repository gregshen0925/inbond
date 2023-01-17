import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import NftDetails from '@/components/nft/nft-details';
import { nftData } from '@/data/static/single-nft';
import RootLayout from '@/layouts/_root-layout';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const BondDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  // const { layout } = useLayout();

  // if (layout === LAYOUT_OPTIONS.MINIMAL) {
  //   return <MinimalNFTDetails product={nftData} />;
  // }

  // if (layout === LAYOUT_OPTIONS.RETRO) {
  //   return <RetroNFTDetails product={nftData} />;
  // }

  // if (layout === LAYOUT_OPTIONS.CLASSIC) {
  //   return <ClassicNFTDetails product={nftData} />;
  // }

  return (
    <>
      <NextSeo title="Bond details" description="" />
      <NftDetails product={nftData} />
    </>
  );
};

BondDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout contentClassName="!pb-0">{page}</RootLayout>;
};

export default BondDetailsPage;
