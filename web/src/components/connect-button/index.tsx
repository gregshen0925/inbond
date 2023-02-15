import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { targetNetwork } from '@/lib/constants/targetNetwork';
import mixpanel from 'mixpanel-browser';
import { Mixpanel } from '@/lib/utils/Mixpanel';

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

  const handleOpenWalletModal = () => {
    setConnectModalOn(true);
    Mixpanel.track('A user is openning Connect Wallet Modal!', {
      result: 'success',
    });
  };

  return (
    <div className="pt-4">
      <motion.div
        whileTap={{
          scale: 0.8,
          borderRadius: '100%',
        }}
      >
        {/* <div className="button-container-1"> */}
        {/* <span className="mas">
            {`${
              connected
                ? network?.name?.toLowerCase() ==
                  (targetNetwork || 'Aptos testnet')
                  ? network?.name
                  : `Switch to ${targetNetwork}`
                : 'Connect Wallet'
            }`}
          </span> */}
        <button
          onClick={
            connected ? () => setWalletInfoModalOn(true) : handleOpenWalletModal
          }
          // type="button"
          // name="Hover"
          className="rounded-2xl border-[1px] border-white bg-black px-2 py-2 font-mono text-white sm:px-4 sm:py-4"
        >
          <div className={`${connected ? null : 'animate-pulse'}`}>
            {`${
              connected
                ? network?.name?.toLowerCase() ==
                  (targetNetwork || 'Aptos testnet')
                  ? network?.name
                  : `Switch to ${targetNetwork}`
                : 'Connect Wallet'
            }`}
          </div>
        </button>
        {/* </div> */}
      </motion.div>

      <div className="justify-end py-1 text-center text-sm font-bold dark:text-white ">
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
