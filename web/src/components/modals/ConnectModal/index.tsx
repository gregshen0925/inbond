import React, { useRef, type Dispatch, type SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import useOnClickOutside from '../../../lib/hooks/use-click-outside';
import mixpanel from 'mixpanel-browser';
import { Mixpanel } from '@/lib/utils/Mixpanel';

interface Props {
  setConnectModalOn: Dispatch<SetStateAction<boolean>>;
}

const ConnectModal = ({ setConnectModalOn }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setConnectModalOn(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const { wallets, connect } = useWallet();

  const renderWalletConnectorGroup = () => {
    return wallets.map((wallet) => {
      const option = wallet.adapter;

      const handleConnect = () => {
        connect(option.name);
        setConnectModalOn(false);
        Mixpanel.track(`A user is connecting with ${option.name}`, {
          result: 'success',
        });
      };

      return (
        <motion.div
          whileTap={{
            scale: 0.8,
            rotate: 0,
            borderRadius: '100%',
          }}
          key={wallet.adapter.name}
        >
          <li>
            <div className="group flex items-center rounded-lg bg-gray-800 p-3 text-base font-bold text-white hover:bg-gray-500 hover:shadow">
              <button
                onClick={handleConnect}
                id={option.name.split(' ').join('_')}
                key={option.name}
                // className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base">
                className="w-full"
              >
                <div className="flex space-x-4">
                  {/* <Image
                    className="h-8 w-8 rounded-full object-fill"
                    src={option.icon}
                    alt="wallet name"
                    width={2}
                    height={2}
                  /> */}
                  <img
                    className="h-8 w-8 rounded-full"
                    alt=""
                    src={option.icon}
                  />

                  <div className="pt-1">{option.name}</div>
                  {option.name === 'Martian' ||
                  option.name === 'Petra' ||
                  option.name === 'Blocto' ? (
                    <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-400">
                      Popular
                    </span>
                  ) : null}
                </div>
              </button>
            </div>
          </li>
        </motion.div>
      );
    });
  };

  return (
    <div className="h-modal fixed z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 backdrop-blur-sm md:inset-0 md:h-full">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative rounded-2xl bg-black shadow"
        >
          <button
            onClick={() => setConnectModalOn(false)}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="rounded-t border-b border-gray-800 py-4 px-6">
            <h3 className="text-base font-semibold text-white lg:text-2xl ">
              Connect Wallet
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm font-normal text-gray-400">
              Currently not available for mobile
            </p>
            <ul className="my-4 space-y-3">{renderWalletConnectorGroup()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
