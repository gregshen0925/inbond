import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import NftDropDown from '@/components/bond/nft-dropdown';
import type { BondData, investedData } from '@/types/typing';
import { useBlockchain } from '@/lib/hooks/use-blockchain';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getBond } from '@/lib/utils/getBond';
import { useRouter } from 'next/router';
import ApexDonutChart from '../ui/chart/ApexDonutChart';
import BondFooter from './bond-footer';
import toast from 'react-hot-toast';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { getInvestedList } from '@/lib/utils/getInvestedList';
import { APT_TYPE } from '@/lib/utils/aptosClient';

export default function BondDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { invest, getTokenBalance, convert, redeem } = useBlockchain();
  const [investAmount, setInvestAmount] = useState<number | undefined>();
  const [redeemAmount, setRedeemAmount] = useState<number | undefined>();
  const [convertAmount, setConvertAmount] = useState<number | undefined>();
  const [aptBalance, setAptBalance] = useState<number | undefined>();
  const { account, connected } = useWallet();

  const route = typeof id === 'string' ? id : '/';
  const params = route.split('&');

  function refreshPage() {
    window.location.reload();
  }

  const {
    data: bondQuery,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['getBondInfo'],
    queryFn: () => getBond(params[0], params[1]),
  });

  const bondData = (bondQuery?.data as BondData) || null;

  const { data: tokenBalance, refetch: refetchTokenBalance } = useQuery({
    queryKey: ['getTokenBalance'],
    queryFn: () =>
      getTokenBalance(
        account?.address?.toString()!,
        params[1],
      ),
    enabled: !!account?.address?.toString(),
  });

  const {
    data: investedList,
    isSuccess: investedListSuccess,
    isLoading: investedListLoading,
  } = useQuery({
    enabled: !!account?.address?.toString(),
    queryKey: ['investedList'],
    queryFn: () => getInvestedList(account?.address?.toString() || '0x0'),
  });

  const investedData: investedData = investedList?.data as investedData;

  const investedValue: number[] = [];

  for (let i = 0; i < investedData?.voting_powers.data.length; i++) {
    if (investedData?.voting_powers.data[i].key === params[0]) {
      investedValue.push(investedData?.voting_powers.data[i].value);
    }
  }

  const handleInvestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestAmount(Number(e.target.value));
  };
  const handleRedeemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedeemAmount(Number(e.target.value));
  };
  const handleConvertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConvertAmount(Number(e.target.value));
  };

  const handleInvest = async (investAmount: number) => {
    if (!investAmount) {
      setInvestAmount(0);
      return;
    }
    await invest(investAmount, params[0]).then(() => {
      refetch();
    });
  };

  const handleConvert = async (convertAmount: number) => {
    if (!convertAmount) {
      setConvertAmount(0);
      return;
    }
    // toast.error('Still in development...');
    await convert(params[1], bondData.founder_type, params[0], convertAmount).then(() => {
      refetch();
    });
  };

  const handleRedeem = async (redeemAmount: number) => {
    if (!redeemAmount) {
      setRedeemAmount(0);
      return;
    }
    // toast.error('Still in development...');
    await redeem(params[1], params[0], redeemAmount).then(() => {
      refetch();
    });
  };

  const handleSetTokenMax = async () => {
    setInvestAmount(
      Math.floor(Number((await refetchTokenBalance()).data) / 10 ** 8)
    );
  };

  return (
    <>
      {isLoading ? (
        <div>
          <div>Loading...</div>
          <button className="animate pulse" onClick={refreshPage}>
            Click me if it takes more than 3 seconds
          </button>
        </div>
      ) : null}
      {isSuccess ? (
        <div className="flex flex-grow">
          <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
            <div className="relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 rtl:md:pr-6 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
              <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
                <div className="relative aspect-square max-h-full overflow-hidden rounded-lg">
                  {bondData?.image_url ? (
                    <Image
                      src={bondData?.image_url}
                      // layout="fill"
                      width={500}
                      height={500}
                      alt={bondData?.name}
                      className="h-full bg-gray-200 dark:bg-light-dark"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
              <div className="block">
                <div className="block">
                  <div className="flex justify-center ">
                    <h2 className="text-3xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white ">
                      {bondData?.name}
                    </h2>
                    {/* <div className="mt-1.5 shrink-0 ltr:ml-3 rtl:mr-3 xl:mt-2">
                    <NftDropDown />
                  </div> */}
                  </div>
                  {/* <AnchorLink
                    href={'/'}
                    className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5"
                  >
                    Created on
                    {minted_date}
                    <ArrowLinkIcon className="h-3 w-3 ltr:ml-2 rtl:mr-2" />
                  </AnchorLink> */}
                  <div className="mt-4 flex flex-wrap gap-6 pt-0.5 lg:-mx-6 lg:mt-6 lg:gap-0">
                    {/* <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 lg:px-6 lg:ltr:border-r lg:rtl:border-l">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Created By
                      </h3>
                      <AnchorLink
                        href={`${bondData?.external_url}`}
                        className="inline-flex"
                      >
                        <div className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                          {bondData?.creator}
                        </div>
                      </AnchorLink>
                    </div> */}
                    {/* <div className="shrink-0 lg:px-6">
                    <h3 className="text-heading-style mb-2.5 uppercase text-gray-900 dark:text-white">
                      Collection
                    </h3>
                    <AnchorLink href="#" className="inline-flex">
                      <ListCard
                      item={collection}
                      className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    />
                    </AnchorLink>
                  </div> */}
                  </div>
                </div>
                <div className="mt-5 flex flex-col pb-5 xl:mt-9">
                  {/* <ParamTab
                    tabMenu={[
                      {
                        title: 'Details',
                        path: 'details',
                      },
                      // {
                      //   title: 'Bids',
                      //   path: 'bids',
                      // },
                      // {
                      //   title: 'History',
                      //   path: 'history',
                      // },
                    ]}
                  >
                    <TabPanel className="focus:outline-none">
                      <div className="space-y-6">
                        <div className="block">
                          <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                            Description
                          </h3>
                          <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                            {bondData?.description}
                          </div>
                        </div>
                        <div className="block">
                          <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Owner
                      </h3>
                          <AnchorLink href={owner?.slug} className="inline-block">
                        <ListCard
                          item={owner}
                          className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        />
                      </AnchorLink>
                        </div>
                        <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Blockchain
                      </h3>
                      <div className="flex flex-col gap-2">
                        {block_chains?.map((item: any) => (
                          <AnchorLink
                            href="#"
                            className="inline-flex"
                            key={item?.id}
                          >
                            <ListCard
                              item={item}
                              className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            />
                          </AnchorLink>
                        ))}
                      </div>
                    </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="focus:outline-none">
                      <div className="flex flex-col-reverse">
                        {nftData?.bids?.map((bid) => (
                        <FeaturedCard
                          item={bid}
                          key={bid?.id}
                          className="mb-3 first:mb-0"
                        />
                      ))}
                      </div>
                    </TabPanel>
                    <TabPanel className="focus:outline-none">
                  <div className="flex flex-col-reverse">
                    {nftData?.history?.map((item) => (
                      <FeaturedCard
                        item={item}
                        key={item?.id}
                        className="mb-3 first:mb-0"
                      />
                    ))}
                  </div>
                </TabPanel>
                  </ParamTab> */}
                  <div className="pb-5">
                    <div className="py-2 text-center text-2xl text-gray-900 dark:text-white">
                      Creator
                    </div>
                    <div className="text-center text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400 sm:text-lg ">
                      {bondData?.creator}
                    </div>
                  </div>
                  <div className="pb-5">
                    <div className="py-2 text-center text-2xl text-gray-900 dark:text-white">
                      Description
                    </div>
                    <div className="text-center text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400 sm:text-lg lg:text-left">
                      {bondData?.description}
                    </div>
                  </div>
                  <ApexDonutChart />
                </div>

                <div className="flex justify-center pb-10 text-gray-900 dark:text-white">
                  Progress : {Number(bondData?.funding.value) / 10 ** 8}/
                  {Number(bondData?.target_funding_size) / 10 ** 8}{' '}
                  {params[1] == APT_TYPE ? '$APT' : null}
                </div>

                <div className="flex justify-center pb-10 text-gray-900 dark:text-white">
                  You&apos;ve invested :{' '}
                  {investedValue[0] ? investedValue[0] / 10 ** 8 : 0}{' '}
                  {params[1] == APT_TYPE ? '$APT' : null}
                </div>

                <div className="flex justify-center space-x-2 pb-4">
                  <div>
                    <input
                      type="number"
                      id="investAmount"
                      value={investAmount || undefined}
                      onChange={handleInvestChange}
                      className="dark:shadow-sm-light block w-[150px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="0"
                      required={true}
                    />
                  </div>
                  <button
                    className="rounded-xl bg-gray-800 px-2 py-2"
                    onClick={handleSetTokenMax}
                  >
                    Max
                  </button>
                  <motion.div
                    whileTap={{
                      scale: 0.8,
                      borderRadius: '100%',
                    }}
                  >
                    <button
                      className="rounded-xl bg-blue-500 px-3 py-2 font-bold hover:bg-blue-400 disabled:cursor-not-allowed"
                      onClick={() => handleInvest(investAmount!)}
                      disabled={!investAmount || investAmount < 0}
                    >
                      Invest
                    </button>
                  </motion.div>
                </div>

                <div className="flex justify-center space-x-2 pb-4">
                  <div>
                    <input
                      type="number"
                      id="investAmount"
                      value={convertAmount || undefined}
                      onChange={handleConvertChange}
                      className="dark:shadow-sm-light block w-[150px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="0"
                      required={true}
                    />
                  </div>
                  <button
                    className="rounded-xl bg-gray-800 px-2 py-2"
                    onClick={() => setConvertAmount(investedValue[0] / 10 ** 8)}
                  >
                    Max
                  </button>
                  <motion.div
                    whileTap={{
                      scale: 0.8,
                      borderRadius: '100%',
                    }}
                  >
                    <button
                      className="rounded-xl bg-green-500 px-2 py-2 font-bold hover:bg-green-400 disabled:cursor-not-allowed"
                      onClick={() => handleConvert(convertAmount!)}
                      disabled={!convertAmount || convertAmount < 0}
                    >
                      Convert
                    </button>
                  </motion.div>
                </div>

                <div className="flex justify-center space-x-2 pb-4 last:pb-10">
                  <div>
                    <input
                      type="number"
                      id="redeemAmount"
                      value={redeemAmount || undefined}
                      onChange={handleRedeemChange}
                      className="dark:shadow-sm-light block w-[150px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="0"
                      required={true}
                    />
                  </div>
                  <button
                    className="rounded-xl bg-gray-800 px-2 py-2"
                    onClick={() => setRedeemAmount(investedValue[0] / 10 ** 8)}
                  >
                    Max
                  </button>
                  <motion.div
                    whileTap={{
                      scale: 0.8,
                      borderRadius: '100%',
                    }}
                  >
                    <button
                      className="rounded-xl bg-red-500 px-3 py-2 font-bold hover:bg-red-400 disabled:cursor-not-allowed"
                      onClick={() => handleRedeem(redeemAmount!)}
                      disabled={!redeemAmount || redeemAmount < 0}
                    >
                      Redeem
                    </button>
                  </motion.div>
                </div>
                {/* <ApexDonutChart /> */}
              </div>
              <BondFooter
                className="hidden md:block"
                // auctionTime={Date.now() + 4000000 * 10}
                // isAuction={isAuction}
                // price={price}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
