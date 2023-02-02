import cn from 'classnames';
import { NextSeo } from 'next-seo';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import VolumeChart from '@/components/ui/chats/volume-chart';
import InvestedGrid from '../ui/invested-projects-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { getInvestedList } from '@/lib/utils/getInvestedList';
import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import type { investedData } from '@/types/typing';
import { APT_TYPE } from '@/lib/utils/aptosClient';

type Props = {
  className?: string;
};

export default function ModernScreen({ className }: Props) {
  const { account } = useWallet();

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
  const { isGridCompact } = useGridSwitcher();

  return (
    <>
      <NextSeo title="InBond" description="InBond - By InJoy Labs" />
      {/* <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <CoinSlider coins={coinSlideData} />
        </div>
        <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
          <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              My Balance
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              $10,86,000
            </div>
            <TopupButton />
          </div>
        </div>
      </div> */}

      <div className="py-5 text-2xl font-bold text-gray-900 dark:text-white">
        My Investments
      </div>
      <div
        className={cn(
          'grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
          // isGridCompact
          //   ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
          //   : '3xl:!grid-cols-3 4xl:!grid-cols-4',
          className
        )}
      >
        {investedData
          ? investedData.voting_powers.data.map((project, idx) => (
              <div key={project.key}>
                <InvestedGrid
                  creatorAddress={project.key}
                  coinType={APT_TYPE}
                  investedAmount={
                    investedData?.voting_powers.data[idx].value / 10 ** 8
                  }
                />
              </div>
            ))
          : null}
      </div>
      {/* <div>{investedData?.voting_powers.data[0].key}</div>
      <div>{investedData?.voting_powers.data[0].value / 10 ** 8}</div> */}

      {/* <div>{investedData.voting_powers[0]}</div> */}

      {/* <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <VolumeChart />
      </div> */}

      {/* <div className="my-8 sm:my-10">
        <TopCurrencyTable />
      </div> */}

      {/* <div className="flex flex-wrap">
        <div
          className={cn(
            'w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]'
          )}
        >
          <TransactionTable />
        </div>
        <div
          className={cn(
            'order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]'
          )}
        >
          <OverviewChart />
          <TopPools />
        </div>
      </div> */}
    </>
  );
}
