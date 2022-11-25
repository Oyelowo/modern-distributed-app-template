import {
	ChartInfographic,
	Globe,
	HotelService,
	Settings,
} from "tabler-icons-react";
import {
	Group,
	MantineTheme,
	Text,
	ThemeIcon,
	UnstyledButton,
} from "@mantine/core";

interface MainLinkProps {
	icon: React.ReactNode;
	color: string;
	label: string;
	href: string;
}

export function useActiveLinkStyle() {
	// TODO: use tan router
	// const router = useRouter();
	const getActiveBg = (theme: MantineTheme) =>
		theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0];

	return {
		// getActiveStyle: (link: string, theme: MantineTheme) =>
		//   router.pathname === link ? getActiveBg(theme) : "",
		// isActive: (link: string) => router.pathname === link,
		isActive: (link: string) => false,
		getActiveStyle: (link: string, theme: MantineTheme) => "purple",
		getActiveBg,
	};
}

function MainLink({ icon, color, label, href }: MainLinkProps) {
	const { getActiveStyle, getActiveBg } = useActiveLinkStyle();
	return (
		<a href={href}>
			<UnstyledButton
				sx={(theme) => ({
					display: "block",
					width: "100%",
					padding: theme.spacing.xs,
					borderRadius: theme.radius.sm,
					color:
						theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
					backgroundColor: getActiveStyle(href, theme),

					"&:hover": {
						backgroundColor: getActiveBg(theme),
					},
				})}
			>
				<Group>
					<ThemeIcon color={color} variant="light">
						{icon}
					</ThemeIcon>

					<Text size="sm">{label}</Text>
				</Group>
			</UnstyledButton>
		</a>
	);
}

export const linkData = [
	{
		icon: <ChartInfographic />,
		color: "blue",
		label: "Dashboard",
		href: "/dashboard",
	},
	{ icon: <Settings />, color: "teal", label: "Settings", href: "/settings" },
	{ icon: <Globe />, color: "cyan", label: "Maps", href: "/maps" },
	{
		icon: <HotelService />,
		color: "indigo",
		label: "Bookings",
		href: "/bookings",
	},
];

export function Navlinks() {
	const links = linkData.map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}
