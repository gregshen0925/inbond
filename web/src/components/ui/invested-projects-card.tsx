import Image from '@/components/ui/image';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { getBond } from '@/lib/utils/getBond';
import type { BondData } from '@/types/typing';
import { useEffect, useState } from 'react';
import { client, TREASURY_MODULE_ID } from '@/lib/utils/aptosClient';

type Props = {
  creatorAddress: string;
  coinType: string;
  investedAmount: number;
};

export default function InvestedGrid({
  creatorAddress,
  coinType,
  investedAmount,
}: Props) {
  // const { data: bondQuery } = useQuery({
  //   queryKey: ['getBondInfo'],
  //   queryFn: () => getBond(creatorAddress, coinType),
  // });

  // const BondData = (bondQuery?.data as BondData) || null;

  const [bondData, setBondData] = useState<BondData>({
    founder_type: '',
    creator: '',
    description: '',
    external_url: '',
    funding: { value: '0' },
    image_url: '',
    name: '',
    target_funding_size: '',
  });

  useEffect(() => {
    const getBondData = async () => {
      const resource = await client.getAccountResource(
        creatorAddress,
        TREASURY_MODULE_ID + `Treasury<${coinType}>`
      );
      setBondData(resource.data as BondData);
    };
    getBondData();
  }, [creatorAddress, coinType]);

  return (
    <a href={`/bond-details/${creatorAddress}&${coinType}`}>
      <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
        <div className="p-4">
          <div className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <Avatar
              image={bondData?.image_url}
              alt={bondData?.name}
              size="sm"
              className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
            />
            <span className="overflow-hidden text-ellipsis">
              {bondData?.name}
            </span>
          </div>
        </div>
        <div className="relative block w-full pb-full">
          <Image
            src={bondData?.image_url}
            // placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>

        <div className="p-5">
          <div className="mt-1.5 flex">
            <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
              {bondData?.creator}
              <Verified className="ltr:ml-1 rtl:mr-1" />
            </div>
          </div>
          <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
            Target Size: {Number(bondData?.target_funding_size) / 10 ** 8} $APT
          </div>
          <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
            Raised: {Number(bondData?.funding?.value) / 10 ** 8} $APT
          </div>
          {investedAmount ? (
            <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
              You&apos;ve Invested: {investedAmount} $APT
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
}
