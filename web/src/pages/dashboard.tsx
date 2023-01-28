import type { NextPageWithLayout } from '@/types/typing';
import { NextSeo } from 'next-seo';
import ModernScreen from '@/components/screens/modern-screen';
import RootLayout from '@/layouts/_root-layout';

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Dashboard" description="Dashboard" />
      <ModernScreen />
    </>
  );
};

DashboardPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default DashboardPage;
