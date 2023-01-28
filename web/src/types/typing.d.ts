import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

type Value = {
  value: string;
};

export type CoinTypes = {
  icon: JSX.Element;
  code: string;
  name: string;
  price: number;
};

export interface Attachment {
  id: string;
  original: string;
  thumbnail: string;
}

export type BondData = {
  creator: string;
  description: string;
  external_url: string;
  funding: Value;
  image_url: string;
  name: string;
  target_funding_size: string;
};

export type KV = {
  key: string;
  value: string;
};
