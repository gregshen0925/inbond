import { useWallet } from '@manahippo/aptos-wallet-adapter';
import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { motion } from 'framer-motion';
import useOnClickOutside from '../../../lib/hooks/use-click-outside';

type Props = {
  setWalletInfoModalOn: Dispatch<SetStateAction<boolean>>;
};

const InboxModal = ({ setWalletInfoModalOn }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const { account, disconnect } = useWallet();
  const clickOutsidehandler = () => {
    setWalletInfoModalOn(false);
  };
  const handleDisconnect = () => {
    disconnect();
    setWalletInfoModalOn(false);
  };
  const handleCopyText = () => {
    navigator.clipboard.writeText(account?.address?.toString() || '');
    setCopied(true);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  return (
    <div className="h-modal fixed z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 backdrop-blur-sm md:inset-0 md:h-full">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="dark:bg-black-700 relative overflow-y-scroll rounded-2xl bg-black shadow"
        >
          <button
            onClick={() => setWalletInfoModalOn(false)}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
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

          <div className="rounded-t border-b py-4 px-6 dark:border-gray-800">
            <div className="flex justify-center p-5">
              {/* <Image
                className="rounded-full bg-white object-contain"
                height={100}
                width={100}
                src={avatar!}
                alt=""
              /> */}
            </div>
            <div className="flex flex-col items-center space-y-5">
              {/* <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white lg:text-2xl">
                {username}
              </h3> */}
              <motion.div
                whileTap={{
                  scale: 0.8,
                  borderRadius: '100%',
                }}
              >
                <button onClick={handleCopyText} className="cursor-pointer">
                  {copied ? (
                    <div className="font-bold text-white">✅ Copied</div>
                  ) : (
                    <div>
                      <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
                        {account?.address?.toString().substring(0, 5) +
                          '...' +
                          account?.address
                            ?.toString()
                            .substring(
                              account?.address?.toString().length - 5,
                              account?.address?.toString().length
                            )}
                      </h3>
                    </div>
                  )}
                </button>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 p-6">
            <motion.div
              whileTap={{
                scale: 0.8,
                borderRadius: '100%',
              }}
            >
              <button
                onClick={handleDisconnect}
                className="cursor-pointer rounded-lg bg-gray-600 px-2 py-2 text-sm text-white hover:bg-gray-500"
              >
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxModal;
