import cn from 'classnames';
import BondGrid from '@/components/ui/bond-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { useQuery } from '@tanstack/react-query';
import { BondData } from '@/types';
import { getBond } from '@/pages/api/getBond';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();
  const { data: bondQuery } = useQuery({
    queryKey: ['bond'],
    queryFn: getBond,
  });

  const BondData = (bondQuery?.data as BondData) || null;
  console.log(BondData);

  // const bondsInfo = useQuery({
  //   queryKey: ['bonds'],
  //   queryFn: getBondInfo,
  // });
  return (
    <div
      className={cn(
        'grid gap-5 sm:grid-cols-2 md:grid-cols-3',
        isGridCompact
          ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
          : '3xl:!grid-cols-3 4xl:!grid-cols-4',
        className
      )}
    >
      {/* {BondList.map((BondData) => (
        <div>
        <BondGrid
        description={BondData.description}
        external_url={BondData.external_url}
        funding={BondData.funding}
        image_url={BondData.image_url}
        names={BondData.names}
        target_funding_size={BondData.target_funding_size}
        />
        </div>
      ))} */}
      <BondGrid
        description={BondData?.description}
        external_url={BondData?.external_url}
        funding={BondData?.funding}
        image_url={BondData?.image_url}
        name={BondData?.name}
        target_funding_size={BondData?.target_funding_size}
        creator={BondData?.creator}
      />
    </div>
  );
}
