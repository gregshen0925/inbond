import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { targetNetwork } from '@/lib/constants/targetNetwork';

type Props = {
  setConnectModalOn: Dispatch<SetStateAction<boolean>>;
  setWalletInfoModalOn: Dispatch<SetStateAction<boolean>>;
};

const ConnectButton = ({ setWalletInfoModalOn, setConnectModalOn }: Props) => {
  const { account, connected, network } = useWallet();
  const [address, setAddress] = useState<string | null | undefined>(null);
  useEffect(() => {
    setAddress(account?.address?.toString());
  }, [connected, account]);
  return (
    <div>
      <motion.div
        whileTap={{
          scale: 0.8,
          borderRadius: '100%',
        }}
      >
        <div className="button-container-1">
          <span className="mas">
            {`${
              connected
                ? network?.name?.toString().toLowerCase() == targetNetwork ||
                  'Aptos testnet'
                  ? network?.name
                  : 'Wrong Network'
                : 'Connect Wallet'
            }`}
          </span>
          <button
            onClick={() =>
              connected ? setWalletInfoModalOn(true) : setConnectModalOn(true)
            }
            type="button"
            name="Hover"
          >
            <div className={`${connected ? null : 'animate-pulse'}`}>
              {`${
                connected
                  ? network?.name?.toString().toLowerCase() == targetNetwork ||
                    'Aptos testnet'
                    ? network?.name
                    : 'Wrong Network'
                  : 'Connect Wallet'
              }`}
            </div>
          </button>
        </div>
      </motion.div>

      <div className="justify-end py-1 text-center text-sm font-bold text-white">
        {address
          ? account?.address?.toString().substring(0, 5) +
            '...' +
            account?.address
              ?.toString()
              .substring(
                account?.address?.toString().length - 5,
                account?.address?.toString().length
              )
          : null}
      </div>
    </div>
  );
};

export default ConnectButton;
