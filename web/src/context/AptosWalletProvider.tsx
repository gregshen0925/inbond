import React, { type FC } from 'react';
import {
  WalletAdapterNetwork,
  MartianWalletAdapter,
  AptosWalletAdapter,
  RiseWalletAdapter,
  // FewchaWalletAdapter,
  WalletProvider,
  PontemWalletAdapter,
  SpikaWalletAdapter,
  BitkeepWalletAdapter,
  BloctoWalletAdapter,
} from '@manahippo/aptos-wallet-adapter';
import { useMemo } from 'react';

type WalletProvider = {
  children: React.ReactNode;
};

export const AptosWalletProvider: FC<WalletProvider> = ({ children }) => {
  const wallets = useMemo(
    () => [
      new BloctoWalletAdapter({
        network: WalletAdapterNetwork.Testnet,
        bloctoAppId: 'InBond',
      }),
      new MartianWalletAdapter(),
      new AptosWalletAdapter(),
      new RiseWalletAdapter(),
      // new FewchaWalletAdapter(),
      new PontemWalletAdapter(),
      new SpikaWalletAdapter(),
      new BitkeepWalletAdapter(),
    ],
    []
  );
  return (
    <WalletProvider
      wallets={wallets}
      autoConnect={true}
      onError={(error: Error) => {
        console.log('wallet errors: ', error);
      }}
    >
      {children}
    </WalletProvider>
  );
};
