import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import { SpringPlay } from '../charts/d3/App';

export const Page: NextPageWithLayout = () => <p>hello world! Shown if you dont want with the layout</p>;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {/* <HomePage /> */}
      <SpringPlay />
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
