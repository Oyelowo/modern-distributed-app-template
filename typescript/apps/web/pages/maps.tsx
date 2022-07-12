import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import { SquareRoot } from '../charts/d3/App';

export const Page: NextPageWithLayout = () => (
  <p>hello world! Shown if you dont want with the layout</p>
);

Page.getLayout = function getLayout(_page: ReactElement) {
  return (
    <Layout>
      <SquareRoot />
    </Layout>
  );
};

export default Page;
