import cn from 'classnames';
import Header from '@/layouts/header/header';
import Sidebar from '@/layouts/sidebar/_default';
import { OpenWalletProvider } from '@/context/OpenWalletProvider';
import useOpenWallet from '@/hooks/useOpenWallet';
import WalletInfoModal from '@/components/modals/WalletInfoModal';
import ConnectModal from '@/components/modals/ConnectModal';

export default function ModernLayout({
  children,
  contentClassName,
}: React.PropsWithChildren<{ contentClassName?: string }>) {
  const {
    connectModalOn,
    setConnectModalOn,
    walletInfoModalOn,
    setWalletInfoModalOn,
  } = useOpenWallet();
  return (
    <div className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80">
      <Header />
      <Sidebar className="hidden xl:block" />

      <main
        className={cn(
          'min-h-[100vh] px-4 pt-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 3xl:px-10 3xl:pt-0.5',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
