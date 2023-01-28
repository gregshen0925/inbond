import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import NftDropDown from '@/components/bond/nft-dropdown';
import type { BondData } from '@/types/typing';
import { useBlockchain } from '@/lib/hooks/use-blockchain';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getBond } from '@/lib/utils/getBond';
import { useRouter } from 'next/router';

export default async function BondDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { invest } = useBlockchain();
  const [investAmount, setInvestAmount] = useState<number | undefined>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestAmount(Number(e.target.value));
  };

  const route = typeof id === 'string' ? id : '/';
  const params = route.split('+');

  const {
    data: bondQuery,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['getBondInfo'],
    queryFn: () => getBond(params[0], params[1]),
  });

  const BondData = (bondQuery?.data as BondData) || null;

  const handleInvest = async (investAmount: number) => {
    if (!investAmount) {
      setInvestAmount(0);
      return;
    }
    await invest(investAmount).then(() => {
      setInvestAmount(0);
      refetch();
    });
  };
  if (isSuccess)
    return (
      <div className="flex flex-grow">
        <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
          <div className="relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 rtl:md:pr-6 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
            <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
              <div className="relative aspect-square max-h-full overflow-hidden rounded-lg">
                {BondData?.image_url ? (
                  <Image
                    src={BondData?.image_url}
                    // layout="fill"
                    width={500}
                    height={500}
                    alt={BondData?.name}
                    className="h-full bg-gray-200 dark:bg-light-dark"
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
            <div className="block">
              <div className="block">
                <div className="flex justify-between">
                  <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                    {BondData?.name}
                  </h2>
                  {/* <div className="mt-1.5 shrink-0 ltr:ml-3 rtl:mr-3 xl:mt-2">
                    <NftDropDown />
                  </div> */}
                </div>
                <AnchorLink
                  href={'/'}
                  className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5"
                >
                  Created on
                  {/* {minted_date} */}
                  <ArrowLinkIcon className="h-3 w-3 ltr:ml-2 rtl:mr-2" />
                </AnchorLink>
                <div className="mt-4 flex flex-wrap gap-6 pt-0.5 lg:-mx-6 lg:mt-6 lg:gap-0">
                  <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 lg:px-6 lg:ltr:border-r lg:rtl:border-l">
                    <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                      Created By
                    </h3>
                    <AnchorLink
                      href={`${BondData?.external_url}`}
                      className="inline-flex"
                    >
                      <div className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        {BondData?.creator}
                      </div>
                    </AnchorLink>
                  </div>
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
                <ParamTab
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
                          {BondData?.description}
                        </div>
                      </div>
                      <div className="block">
                        {/* <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Owner
                      </h3> */}
                        {/* <AnchorLink href={owner?.slug} className="inline-block">
                        <ListCard
                          item={owner}
                          className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        />
                      </AnchorLink> */}
                      </div>
                      {/* <div className="block">
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
                    </div> */}
                    </div>
                  </TabPanel>
                  <TabPanel className="focus:outline-none">
                    <div className="flex flex-col-reverse">
                      {/* {nftData?.bids?.map((bid) => (
                        <FeaturedCard
                          item={bid}
                          key={bid?.id}
                          className="mb-3 first:mb-0"
                        />
                      ))} */}
                    </div>
                  </TabPanel>
                  {/* <TabPanel className="focus:outline-none">
                  <div className="flex flex-col-reverse">
                    {nftData?.history?.map((item) => (
                      <FeaturedCard
                        item={item}
                        key={item?.id}
                        className="mb-3 first:mb-0"
                      />
                    ))}
                  </div>
                </TabPanel> */}
                </ParamTab>
              </div>
              <div className="pb-3 text-white">
                Progress : {Number(BondData?.funding.value) / 10 ** 8}/
                {Number(BondData?.target_funding_size) / 10 ** 8} APT
              </div>
              <div className="flex space-x-2 pb-4">
                <input
                  type="number"
                  id="investAmount"
                  value={investAmount}
                  onChange={handleChange}
                  className="dark:shadow-sm-light block w-[150px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="0 APT"
                  required={true}
                />
                <motion.div
                  whileTap={{
                    scale: 0.8,
                    borderRadius: '100%',
                  }}
                >
                  <button
                    className="rounded-xl bg-green-500 px-2 py-2 font-bold hover:bg-green-400 disabled:cursor-not-allowed"
                    onClick={() => handleInvest(investAmount!)}
                    disabled={!investAmount || investAmount < 0}
                  >
                    Invest
                  </button>
                </motion.div>
              </div>
            </div>
            {/* <NftFooter
            className="hidden md:block"
            currentBid={nftData?.bids[nftData?.bids?.length - 1]}
            auctionTime={Date.now() + 4000000 * 10}
            isAuction={isAuction}
            price={price}
          /> */}
          </div>
          {/* <NftFooter
          currentBid={nftData?.bids[nftData?.bids?.length - 1]}
          auctionTime={Date.now() + 4000000 * 10}
          isAuction={isAuction}
          price={price}
        /> */}
        </div>
      </div>
    );
  else return <></>;
}
