import { useMeQuery } from '@oyelowo/graphql-client';
import {
  AppShell,
  useMantineTheme,
  Skeleton,
} from '@mantine/core';
import { ReactElement, Suspense, useState } from 'react';
import { ScrollToTop } from '../Scroll/ScrollToTop';
import { client } from '../../config/client';
import { useSession, useSignOut } from '../../hooks/authentication';
import { SideNavbarSlim } from '../NavbarCustom/SideNavbarSlim';

export function Layout({ children }: { children: ReactElement }) {
  const { signOutCustom } = useSignOut();
  // const [theme] = useThemeAtom();
  const data = useSession();
  const { data: { me } = {}, isLoading } = useMeQuery(client, {}, { staleTime: 600 * 1000 });

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // if (isLoading) {
  //   return <>Loading...</>;
  // }

  return (
    <Skeleton visible={isLoading}>
      <Suspense fallback={<Skeleton visible={isLoading} />}>
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={<SideNavbarSlim />}
          //   footer={
          //     <Footer height={60} p="md">
          //       <Container>
          //         <Anchor href="https://codebreather.com" target="_blank" rel="noopener noreferrer">
          //           Powered by Code breather
          //         </Anchor>
          //       </Container>
          //     </Footer>
          //   }
        //   header={<HeaderSimple links={linkData} />}
        >
          {children}
          <ScrollToTop />
        </AppShell>
      </Suspense>
    </Skeleton>
  );
}
