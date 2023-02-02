import { useWallet } from '@manahippo/aptos-wallet-adapter';
import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { motion } from 'framer-motion';
import useOnClickOutside from '../../../lib/hooks/use-click-outside';
import { useBlockchain } from '@/lib/hooks/use-blockchain';

type Props = {
  setRedeemModalOn: Dispatch<SetStateAction<boolean>>;
  redeemAmount: number;
  creatorAddress: string;
  coinType: string;
  setRedeemAmount: Dispatch<SetStateAction<number | undefined>>;
};

const RedeemModal = ({
  setRedeemModalOn,
  redeemAmount,
  creatorAddress,
  coinType,
  setRedeemAmount,
}: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setRedeemModalOn(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);

  const { redeem } = useBlockchain();

  const handleRedeem = async () => {
    if (!redeemAmount) {
      setRedeemModalOn(false);
    }
    redeem(coinType, creatorAddress, redeemAmount).then(() => {
      //   refetch();
      setRedeemModalOn(false);
      setRedeemAmount(0);
    });
  };

  return (
    <div className="h-modal fixed z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-80 backdrop-blur-sm md:inset-0 md:h-full">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="dark:bg-black-700 relative overflow-y-scroll rounded-2xl bg-black shadow"
        >
          <button
            onClick={() => setRedeemModalOn(false)}
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

          <div className="rounded-t border-b py-7 px-6 dark:border-gray-800">
            <div className="flex flex-col items-center space-y-5">
              <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white lg:text-2xl">
                Are You Sure?
              </h3>
            </div>
          </div>

          <div className="pt-4 text-center text-lg text-gray-900 dark:text-white">
            You can only redeem 90% of your investment!
          </div>

          <div className="flex justify-center space-x-2 p-6">
            <motion.div
              whileTap={{
                scale: 0.8,
                borderRadius: '100%',
              }}
            >
              <button
                onClick={handleRedeem}
                className="cursor-pointer rounded-lg bg-red-600 px-2 py-2 text-sm text-white hover:bg-red-500"
              >
                Redeem
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemModal;
