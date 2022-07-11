import { useMantineTheme, Space, Skeleton } from '@mantine/core';
import { ReactElement, useState } from 'react';
import { useSession } from '../hooks/authentication/useSession';
import HomePage from '../components/Homepage/HomePage';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import LandingPage from '../components/LandingPage/LandingPage';

const Page: NextPageWithLayout = () => <p>hello world</p>;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Shown />;
};

export default Page;

function Shown() {
  const data = useSession();
  // const { data: { me } = {} } = useMeQuery(client, {}, { staleTime: 600 * 1000 });
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  if (data.status === 'loading') {
    return (
      <>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
        <Skeleton height="20vh" mt={6} radius="xl" />
        <Skeleton height="10vh" mt={6} radius="xl" />
        <Skeleton height="25vh" mt={6} radius="xl" />
        <Space />
        <Skeleton height="30vh" mt={6} radius="xl" />
      </>
    );
  }

  return data.status == 'success' ? (
    <Layout>
      <HomePage />
    </Layout>
  ) : (
    <LandingPage isLoading={false} />
  );
}
