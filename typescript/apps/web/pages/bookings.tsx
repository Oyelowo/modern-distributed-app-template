import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';

const Page: NextPageWithLayout = () => <p>hello world</p>;

Page.getLayout = function getLayout(_page: ReactElement) {
  return (
    <Layout>
      <>Booker</>
    </Layout>
  );
};

export default Page;

export async function getServerSideProps() {
  return { props: {} };
}
