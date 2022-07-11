import { ReactElement } from 'react';
import HomePage from '../components/HomePage';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';

const Page: NextPageWithLayout = () => <p>hello world</p>;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

export default Page;

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  // Pass data to the page via props
  return { props: {} };
}
