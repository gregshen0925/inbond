import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { StaticImageData } from 'next/image';
import { BondData } from '@/types';
import { CREATOR_ADDRESS } from '@/utils/aptosClient';

export default function BondGrid({
  creator,
  description,
  external_url,
  funding,
  image_url,
  name,
  target_funding_size,
}: BondData) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="p-4">
        <AnchorLink
          href="/"
          className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <Avatar
            image={image_url}
            alt={name}
            size="sm"
            className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
          />
          <span className="overflow-hidden text-ellipsis">{name}</span>
        </AnchorLink>
      </div>
      <AnchorLink
        href={`/bond-details/${CREATOR_ADDRESS}`}
        className="relative block w-full pb-full"
      >
        <Image
          src={image_url}
          // placeholder="blur"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </AnchorLink>

      <div className="p-5">
        {/* <AnchorLink
          href="/bond-details/injoy-labs-phase-1"
          className="text-sm font-medium text-black dark:text-white"
        >
          {names}
        </AnchorLink> */}
        <div className="mt-1.5 flex">
          <AnchorLink
            href="/bond-details/injoy-labs-phase-1"
            className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
          >
            {creator}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </AnchorLink>
        </div>
        <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
          Target Size: {Number(target_funding_size) / 10 ** 8} APT
        </div>
        <div className="text-md mt-4 font-medium text-gray-900 dark:text-white">
          Already Raised: {Number(funding?.value) / 10 ** 8} APT
        </div>
      </div>
    </div>
  );
}
