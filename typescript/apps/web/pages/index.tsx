import {
  useMantineTheme,
  Space,
  Skeleton,
} from '@mantine/core';
import { ReactElement, useState } from 'react';
import { useSession } from '../hooks/authentication';
import HomePage from '../components/HomePage';
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
  // console.log('isAuth', isAuth);
  return data.status == 'success' ? (
    <Layout>
      <HomePage />
    </Layout>
  ) : (
    <LandingPage isLoading={false} />
  );
}

// export default function Home() {
//   const { signOutCustom } = useSignOut();
//   // const [theme] = useThemeAtom();
//   const data = useSession();
//   const { data: { me } = {}, isLoading } = useMeQuery(client, {}, { staleTime: 600 * 1000 });

//   const theme = useMantineTheme();
//   const [opened, setOpened] = useState(false);
//   // if (isLoading) {
//   //   return <>Loading...</>;
//   // }

//   return (
//     <Skeleton visible={isLoading}>
//       <Suspense fallback={<Skeleton visible={isLoading} />}>
//         <AppShell
//           styles={{
//             main: {
//               background:
//                 theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
//             },
//           }}
//           navbarOffsetBreakpoint="sm"
//           asideOffsetBreakpoint="sm"
//           fixed
//           navbar={
//             <Navbar
//               p="md"
//               hiddenBreakpoint="sm"
//               hidden={!opened}
//               width={{
//                 // When viewport is larger than theme.breakpoints.sm, Navbar width will be 200
//                 sm: 200,
//                 // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
//                 lg: 300,
//                 // When other breakpoints do not match base width is used, defaults to 100%
//                 // base: 100,
//               }}
//             >
//               <Navbar.Section>{/* Header with logo */}</Navbar.Section>
//               <Navbar.Section grow mt="md" component={ScrollArea} mx="-xs" px="xs">
//                 <Navlinks />
//               </Navbar.Section>
//               <Navbar.Section>
//                 <SimpleGrid>
//                   <Tooltip
//                     wrapLines
//                     withArrow
//                     transition="fade"
//                     transitionDuration={200}
//                     label={me?.username}
//                     color="dark"
//                   >
//                     <Indicator inline label="New" size={16}>
//                       <Avatar color="blue" radius="lg">
//                         {me?.username?.slice(0, 2) ?? <Star size={24} />}
//                       </Avatar>
//                     </Indicator>
//                   </Tooltip>

//                   <Button variant="gradient" component="a" onClick={() => signOutCustom()}>
//                     Sign out
//                   </Button>
//                 </SimpleGrid>
//               </Navbar.Section>
//             </Navbar>
//           }
//           aside={
//             <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
//               <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
//                 <SimpleGrid cols={1}>
//                   <Text spellCheck>{me?.username}</Text>
//                   <Divider />
//                   <Text spellCheck>{me?.email}</Text>
//                   <Divider />
//                   <Text spellCheck>{me?.postCount}</Text>
//                   <Divider />
//                 </SimpleGrid>
//               </Aside>
//             </MediaQuery>
//           }
//           footer={
//             <Footer height={60} p="md">
//               <Container>
//                 <Anchor href="https://codebreather.com" target="_blank" rel="noopener noreferrer">
//                   Powered by Code breather
//                 </Anchor>
//               </Container>
//             </Footer>
//           }
//           header={
//             <Header height={70} p="md">
//               <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
//                 <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
//                   <Burger
//                     opened={opened}
//                     onClick={() => setOpened((o) => !o)}
//                     size="sm"
//                     color={theme.colors.gray[6]}
//                     mr="xl"
//                   />
//                 </MediaQuery>

//                 <Text>{data?.status === 'success' && data.data?.session.userId}</Text>
//               </div>
//             </Header>
//           }
//         >
//           <HomePage />
//           <ScrollToTop />
//         </AppShell>
//       </Suspense>
//     </Skeleton>
//   );
// }

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  // Pass data to the page via props
  return { props: {} };
}
