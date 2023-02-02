import Button from '@/components/ui/button';
import Feeds from '@/components/search/feeds';
import { useDrawer } from '@/components/drawer-views/context';
import { Filters, GridSwitcher, SortList } from '@/components/search/filters';
import { OptionIcon } from '@/components/icons/option';
import { useBlockchain } from '@/lib/hooks/use-blockchain';

type KV = {
  key: string;
  value: string;
};

type AllProjects = {
  funding_type_map: {
    data: KV[];
  };
};

export default function Search() {
  const { openDrawer } = useDrawer();
  const { allProjects, getAllProjectsSuccess } = useBlockchain();
  const allProjectsData = (allProjects?.data as AllProjects) || null;
  const projectsArray: KV[] = [];

  allProjectsData?.funding_type_map.data.forEach((project) => {
    projectsArray.push(project);
  });

  return (
    <>
      {getAllProjectsSuccess ? (
        <div className="grid grid-cols-3 xl:grid-cols-4"
        // "grid 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]"
        >
          <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10 col-span-3 xl:col-span-3">
            <div className="relative z-10 mb-6 flex items-center justify-between">
              <div className="flex gap-6 3xl:gap-8">
                <SortList />
                <div className="hidden 3xl:block">
                  <GridSwitcher />
                </div>
                <div className="hidden sm:block 2xl:hidden">
                  <Button
                    shape="rounded"
                    size="small"
                    variant="ghost"
                    color="gray"
                    onClick={() => openDrawer('DRAWER_SEARCH')}
                    className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
                  >
                    <OptionIcon className="relative h-auto w-[18px]" />
                  </Button>
                </div>
              </div>
            </div>
            <Feeds projectsArray={projectsArray} />
          </div>

          <div className="hidden 2xl:block 2xl:col-span-1 pt-10"
          // "hidden border-dashed border-gray-200 ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8 dark:border-gray-700 2xl:block"
          >
            <Filters />
          </div>

          {/* <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">
            <Button onClick={() => openDrawer('DRAWER_SEARCH')} fullWidth>
              Filters
            </Button>
          </div> */}
        </div>
      ) : (
        'Fetching data...'
      )}
    </>
  );
}
