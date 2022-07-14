import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import { TableDataGrid } from '../components/Table/TableDataGrid';

const Page: NextPageWithLayout = () => <p>hello world</p>;

Page.getLayout = function getLayout(_page: ReactElement) {
  return (
    <Layout>
      <>
        <TableDataGrid />
      </>
    </Layout>
  );
};

export default Page;
