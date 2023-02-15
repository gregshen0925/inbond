import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types/typing';
import Head from 'next/head';
import { AptosWalletProvider } from '@/context/AptosWalletProvider';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import mixpanel from 'mixpanel-browser';

// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import '@/assets/css/styles.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const toastOptions = {
  style: {
    background: 'rgb(0, 0, 0)',
    color: 'white',
  },
  success: {
    className: 'border border-green-500',
    iconTheme: {
      primary: '#10B981',
      secondary: 'white',
    },
  },
  error: {
    className: 'border border-red-500',
    iconTheme: {
      primary: '#EF4444',
      secondary: 'white',
    },
  },
  loading: { className: 'border border-yello-300' },
};

const queryClient = new QueryClient();

if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
    debug: true,
    ignore_dnt: true,
  });
}

function InBondApp({ Component, pageProps }: AppPropsWithLayout) {
  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <link rel="icon" href="https://i.imgur.com/W7K187R.png" />
        <title>InBond</title>
      </Head>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        <Toaster position="top-center" toastOptions={toastOptions} />
        <AptosWalletProvider>
          <QueryClientProvider client={queryClient}>
            <div className="font-mono">
              {getLayout(<Component {...pageProps} />)}
            </div>
          </QueryClientProvider>
          <SettingsButton />
          <SettingsDrawer />
          <ModalsContainer />
          <DrawersContainer />
        </AptosWalletProvider>
      </ThemeProvider>
    </>
  );
}

export default InBondApp;
