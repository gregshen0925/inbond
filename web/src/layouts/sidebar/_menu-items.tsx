import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';

export const menuItems = [
  {
    name: 'Explore Bonds',
    icon: <CompassIcon />,
    href: routes.home,
  },
  {
    name: 'Dashboard',
    icon: <HomeIcon />,
    href: routes.dashboard,
  },
  // {
  //   name: 'Farm',
  //   icon: <FarmIcon />,
  //   href: routes.farms,
  // },
  // {
  //   name: 'Swap',
  //   icon: <ExchangeIcon />,
  //   href: routes.swap,
  // },
  // {
  //   name: 'Liquidity',
  //   icon: <PoolIcon />,
  //   href: routes.liquidity,
  // },

  // {
  //   name: 'Profile',
  //   icon: <ProfileIcon />,
  //   href: routes.profile,
  // },
  {
    name: 'Vote',
    icon: <VoteIcon />,
    href: routes.vote,
    dropdownItems: [
      // {
      //   name: 'Explore',
      //   href: routes.vote,
      // },
      {
        name: 'Vote with pools',
        href: routes.proposals,
      },
      {
        name: 'Create proposal',
        href: routes.createProposal,
      },
    ],
  },
  {
    name: 'Create Bond',
    icon: <PlusCircle />,
    href: routes.createBond,
  },
];
