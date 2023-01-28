import Image from '@/components/ui/image';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { BondData } from '@/types/typing';
import { useQuery } from '@tanstack/react-query';
import { getBond } from '@/lib/utils/getBond';

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
  const { data: bondQuery } = useQuery({
    queryKey: ['getBondInfo'],
    queryFn: () => getBond(creatorAddress, coinType),
  });

  const BondData = (bondQuery?.data as BondData) || null;

  return (
    <a href={`/bond-details/${creatorAddress}+${coinType}`}>
      <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
        <div className="p-4">
          <div className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <Avatar
              image={BondData?.image_url}
              alt={BondData?.name}
              size="sm"
              className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
            />
            <span className="overflow-hidden text-ellipsis">
              {BondData?.name}
            </span>
          </div>
        </div>
        <div className="relative block w-full pb-full">
          <Image
            src={BondData?.image_url}
            // placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>

        <div className="p-5">
          <div className="mt-1.5 flex">
            <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
              {BondData?.creator}
              <Verified className="ltr:ml-1 rtl:mr-1" />
            </div>
          </div>
          <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
            Target Size: {Number(BondData?.target_funding_size) / 10 ** 8} APT
          </div>
          <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
            Already Raised: {Number(BondData?.funding?.value) / 10 ** 8} APT
          </div>
          <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
            You&apos;ve Invested: {investedAmount} APT
          </div>
        </div>
      </div>
    </a>
  );
}
