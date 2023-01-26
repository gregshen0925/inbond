import SingleNft from '@/assets/images/single-nft.jpg';

import Bitcoin from '@/assets/images/currency/bitcoin.svg';
import Ethereum from '@/assets/images/currency/ethereum.svg';
import Aptos from '@/assets/images/aptos.png';
import Avatar1 from '@/assets/images/avatar/1.png';
import Avatar2 from '@/assets/images/avatar/2.png';
import Avatar3 from '@/assets/images/avatar/3.png';
import Avatar4 from '@/assets/images/avatar/4.png';
import Avatar5 from '@/assets/images/avatar/5.png';
import Avatar6 from '@/assets/images/avatar/6.png';
import Avatar7 from '@/assets/images/avatar/7.png';
import InJoyLabs from '@/assets/images/injoylabslogo-dark.png';
import Greg from '@/assets/images/Greg.jpg';

export const nftData = {
  isAuction: true,
  name: 'InJoy Labs Bond 1',
  image: InJoyLabs,
  minted_date: 'Jan 13, 2023',
  minted_slug: 'https://etherscan.io/',
  price: 1500,
  description: 'This is a test bond created by InJoy Labs',
  creator: { id: 1, logo: Greg, name: '@gregshen0925', slug: '#' },
  collection: { id: 1, logo: InJoyLabs, name: 'InJoy Labs', slug: '#' },
  owner: { id: 1, logo: Greg, name: '@gregshen0925', slug: '#' },
  block_chains: [
    { id: 1, logo: Bitcoin, name: 'Ethereum', slug: '#' },
    { id: 2, logo: Ethereum, name: 'Bitcoin', slug: '#' },
    { id: 3, logo: Aptos, name: 'Aptos', slug: '#' },
  ],
  bids: [
    {
      id: 1,
      label: 'Bid Placed',
      name: 'ronson',
      authorSlug: '#',
      created_at: '2022-01-22T17:26:22.000000Z',
      avatar: Avatar1,
      amount: 1501,
      transactionUrl: '#',
    },
    {
      id: 2,
      label: 'Bid Placed',
      name: 'Cameron',
      authorSlug: '#',
      created_at: '2022-02-22T17:26:22.000000Z',
      avatar: Avatar2,
      amount: 1599,
      transactionUrl: '#',
    },
    {
      id: 3,
      label: 'Bid Placed',
      name: 'Williamson',
      authorSlug: '#',
      created_at: '2022-03-22T17:26:22.000000Z',
      avatar: Avatar3,
      amount: 1600,
      transactionUrl: '#',
    },
    {
      id: 4,
      label: 'Bid Placed',
      name: 'ronson',
      authorSlug: '#',
      created_at: '2022-01-22T17:26:22.000000Z',
      avatar: Avatar4,
      amount: 1700,
      transactionUrl: '#',
    },
    {
      id: 5,
      label: 'Bid Placed',
      name: 'Cameron',
      authorSlug: '#',
      created_at: '2022-02-22T17:26:22.000000Z',
      avatar: Avatar5,
      amount: 1900,
      transactionUrl: '#',
    },
    {
      id: 6,
      label: 'Bid Placed',
      name: 'Williamson',
      authorSlug: '#',
      created_at: '2022-03-22T17:26:22.000000Z',
      avatar: Avatar6,
      amount: 2000,
      transactionUrl: '#',
    },
  ],
  history: [
    {
      id: 1,
      label: 'Created',
      name: 'Williamson',
      authorSlug: '#',
      created_at: '2022-03-22T17:26:22.000000Z',
      avatar: Avatar3,
      amount: null,
      transactionUrl: '#',
    },
    {
      id: 2,
      label: 'Listed',
      name: 'Cameron',
      authorSlug: '#',
      created_at: '2022-02-22T17:26:22.000000Z',
      avatar: Avatar2,
      amount: null,
      transactionUrl: '#',
    },
    {
      id: 3,
      label: 'Bid Placed',
      name: 'ronson',
      authorSlug: '#',
      created_at: '2022-01-22T17:26:22.000000Z',
      avatar: Avatar1,
      amount: 2000,
      transactionUrl: '#',
    },
  ],
};
