import cn from 'classnames';
import BondGrid from '@/components/ui/bond-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { BondData } from '@/types';
import { useBlockchain } from '@/lib/hooks/use-blockchain';
import { client, TREASURY_MODULE_ID } from '@/lib/utils/aptosClient';
import { useMemo } from 'react';

type KV = {
  key:string,
  value:string
}

type Props={
  projectsArray:KV[]
  className?: string;
}

export default function Feeds({ projectsArray, className }: Props) {
  const { isGridCompact } = useGridSwitcher();

  // const BondData = (bondQuery?.data as BondData) || null;

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
      {projectsArray?projectsArray.map((project) => (
        <div key={project.key}>
        <BondGrid
        project={project}
        />
        </div>
      )):null}


    </div>
  );
}
