import Image from '@/components/ui/image';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import type { BondData, KV } from '@/types/typing';
import { useEffect, useState } from 'react';
import { client, TREASURY_MODULE_ID } from '@/lib/utils/aptosClient';

type Props = {
  project: KV;
};

export default function BondGrid({ project }: Props) {
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
    const getResource = async () => {
      setBondData(
        (
          await client.getAccountResource(
            project.key,
            TREASURY_MODULE_ID + `Treasury<${project.value}>`
          )
        ).data as BondData
      );
    };
    getResource();
  }, [project]);

  return (
    <a href={`/bond-details/${project.key}&${project.value}`}>
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
            Target Size: {Number(bondData?.target_funding_size) / 10 ** 8} APT
          </div>
          <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
            Raised: {Number(bondData?.funding?.value) / 10 ** 8} APT
          </div>
        </div>
      </div>
    </a>
  );
}
