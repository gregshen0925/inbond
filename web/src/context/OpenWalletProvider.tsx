import ConnectModal from '@/components/modals/ConnectModal';
import WalletInfoModal from '@/components/modals/WalletInfoModal';
import useOpenWallet from '@/hooks/useOpenWallet';

import React, { useState, type FC } from 'react';

type OpenWalletProvider = {
  children: React.ReactNode;
};

export const OpenWalletProvider: FC<OpenWalletProvider> = ({ children }) => {
  const {
    connectModalOn,
    setConnectModalOn,
    walletInfoModalOn,
    setWalletInfoModalOn,
  } = useOpenWallet();
  return (
    <div>
      {connectModalOn ? (
        <ConnectModal setConnectModalOn={setConnectModalOn} />
      ) : null}
      {walletInfoModalOn ? (
        <WalletInfoModal setWalletInfoModalOn={setWalletInfoModalOn} />
      ) : null}
      {children}
    </div>
  );
};
