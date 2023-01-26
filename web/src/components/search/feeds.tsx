import cn from 'classnames';
import { BondList } from '@/data/static/bond-list';
import BondGrid from '@/components/ui/bond-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBondInfo } from '@/pages/api/getBondsInfo';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();
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
      {BondList.map((bond) => (
        <BondGrid
          key={bond.id}
          name={bond.name}
          image={bond.image}
          author={bond.author}
          authorImage={bond.authorImage}
          price={bond.price}
          collection={bond.collection}
        />
      ))}
    </div>
  );
}
