import { AppShell, useMantineTheme } from "@mantine/core";
import { ReactElement } from "react";
import { ScrollToTop } from "../Scroll/ScrollToTop.jsx";
import { SideNavbarSlim } from "../NavbarCustom/SideNavbarSlim.jsx";

export function Layout({ children }: { children: ReactElement }) {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed={true}
      navbar={<SideNavbarSlim />}
      // footer={
      //   <Footer height={60} p="md">
      //     <Container>
      //       <Anchor href="https://codebreather.com" target="_blank" rel="noopener noreferrer">
      //         Powered by Code breather
      //       </Anchor>
      //     </Container>
      //   </Footer>
      // }
      // header={<HeaderSimple links={linkData} />}
    >
      {children}
      <ScrollToTop />
    </AppShell>
  );
}
