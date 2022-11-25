import { useState } from "react";

import {
  createStyles,
  Navbar,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
} from "@tabler/icons";
import { router } from "../router.js";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: "0 0 60px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: "44px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

// type p = Parameters<typeof router["Link"]>["0"]["to"];
// const k : p = "ewe"
/*
type LinkInfo = {
  to: typeof router["allRouteInfo"]["routePaths"];
  icon: React.FunctionComponent<{}>;
  label: string;
};
const mainLinksMockdata: LinkInfo[] = [
  // { to: ".", icon: IconHome2, label: "Home" },
  { to: "/", icon: IconHome2, label: "Home" },
  { to: "/dashboard", icon: IconGauge, label: "Dashboard" },
  {
    to: "/bookings",
    icon: IconDeviceDesktopAnalytics,
    label: "Analytics",
  },
  { to: "/expensive", icon: IconCalendarStats, label: "Releases" },
  { to: "/authenticated", icon: IconUser, label: "Account" },
  // { to: "/layout-a", icon: IconFingerprint, label: "Security" },
  // { to: "/layout-b", icon: IconSettings, label: "Settings" },
];
*/
const mainLinksMockdata = [
  { to: "." as const, icon: IconHome2, label: "Home" },
  { to: "/dashboard" as const, icon: IconGauge, label: "Dashboard" },
  {
    to: "/bookings" as const,
    icon: IconDeviceDesktopAnalytics,
    label: "Analytics",
  },
  { to: "/expensive" as const, icon: IconCalendarStats, label: "Releases" },
  { to: "/authenticated" as const, icon: IconUser, label: "Account" },
  // { to: "/layout-a" as const, icon: IconFingerprint, label: "Security" },
  // { to: "/layout-b" as const, icon: IconSettings, label: "Settings" },
] as const;

const linksMockdata = [
  "Security",
  "Settings",
  "Dashboard",
  "Releases",
  "Account",
  "Orders",
  "Clients",
  "Databases",
  "Pull Requests",
  "Open Issues",
  "Wiki pages",
];

export function DoubleNavbar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Releases");
  const [activeLink, setActiveLink] = useState("Settings");

  const mainLinksx = mainLinksMockdata.map(({ to, label, ...o }) => {
    return (
      <router.Link
        to={to}
        key={to}
        activeOptions={{
          // If the route points to the root of it's parent,
          // make sure it's only active if it's exact
          exact: to === ".",
        }}
        //   className={"block py-2 px-3 text-blue-700"}
        // Make "active" links bold
        //   activeProps={{ className: "font-bold" }}
      >
        {/* {label} */}
        <Tooltip
          label={label}
          position="right"
          withArrow
          transitionDuration={0}
          key={label}
        >
          <UnstyledButton
            onClick={() => setActive(label)}
            className={cx(classes.mainLink, {
              [classes.mainLinkActive]: label === active,
            })}
          >
            <o.icon stroke="1.5" />
            {/* <o.icon stroke={1.5} /> */}
          </UnstyledButton>
        </Tooltip>
      </router.Link>
    );
  });
  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionDuration={0}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === active,
        })}
      >
        <link.icon stroke="1.5" />
        {/* <link.icon stroke={1.5} /> */}
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <router.Link
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link,
      })}
      href="/"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </router.Link>
  ));

  return (
    <Navbar height={750} width={{ sm: 60 }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            {/* <MantineLogo type="mark" size={30} /> */}
          </div>
          {mainLinksx}
        </div>
        {/* <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}
        </div> */}
      </Navbar.Section>
    </Navbar>
  );
}
