import {
  Affix,
  Burger,
  Center,
  createStyles,
  Drawer,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { Globe, Logout, SwitchHorizontal } from "tabler-icons-react";
import React from "react";
import { linkData, useActiveLinkStyle } from "./Navlinks.tsx";
import { useSignOut } from "../../hooks/authentication/useSignOut.tsx";
import { useNavToggleAtom } from "./atoms.tsx";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorScheme === "dark"
      ? theme.colors.dark[0]
      : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
        : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?(): void;
}

function NavbarLink({ icon, label, onClick, href = "#" }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  const { isActive } = useActiveLinkStyle();
  return (
    <Tooltip
      label={label}
      position="right"
      withArrow={true}
      transitionDuration={0}
    >
      {/* Update to tan router */}
      <a href={href}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: isActive(href) })}
        >
          {icon}
        </UnstyledButton>
      </a>
    </Tooltip>
  );
}

export function SideNavbarSlim() {
  const { opened, toggleNav, setNavState } = useNavToggleAtom();
  const { signOutCustom } = useSignOut();

  const links = linkData.map((link) => (
    <NavbarLink {...link} key={link.label} href={link.href} />
  ));

  return (
    <>
      <Affix position={{ top: -5, left: opened ? 60 : 0 }} zIndex={33334}>
        <Burger
          opened={opened}
          onClick={() => toggleNav()}
          size="sm"
          color="green"
        />
      </Affix>
      <Drawer
        opened={opened}
        onClose={() => setNavState(false)}
        title="Well"
        withOverlay={false}
        size={80}
        style={{ width: 80 }}
        withCloseButton={false}
        lockScroll={false}
      >
        <Navbar width={{ base: 80 }} p="md">
          <Center>
            <Globe />
          </Center>
          <Navbar.Section grow={true} mt={50}>
            <Stack align="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack align="center" spacing={0}>
              <NavbarLink icon={<SwitchHorizontal />} label="Change account" />
              <NavbarLink
                onClick={signOutCustom}
                icon={<Logout />}
                label="Logout"
              />
            </Stack>
          </Navbar.Section>
        </Navbar>
      </Drawer>
    </>
  );
}
