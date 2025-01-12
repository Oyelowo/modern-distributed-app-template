import {
	Button,
	Container,
	createStyles,
	Group,
	List,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { Check } from "tabler-icons-react";
import { WorldAtFingerTips } from "../Illustrations/WorldInHand.js";
import { GetStarted } from "./GetStarted.js";

const useStyles = createStyles((theme) => ({
	inner: {
		display: "flex",
		justifyContent: "space-between",
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	content: {
		maxWidth: 480,
		marginRight: theme.spacing.xl * 3,

		[theme.fn.smallerThan("md")]: {
			maxWidth: "100%",
			marginRight: 0,
		},
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan("xs")]: {
			fontSize: 28,
		},
	},

	control: {
		[theme.fn.smallerThan("xs")]: {
			flex: 1,
		},
	},

	image: {
		flex: 1,
		height: 400,
		fill: theme.primaryColor,

		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},

	highlight: {
		position: "relative",
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
				: theme.colors[theme.primaryColor][0],
		borderRadius: theme.radius.sm,
		padding: "4px 12px",
	},
}));

export default function LandingPage() {
	const { classes } = useStyles();
	return (
		<div>
			<Container>
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title}>
							The <span className={classes.highlight}>world</span> at your{" "}
							<br /> fingertips
						</Title>
						<Text color="dimmed" mt="md">
							The only app you will ever need
						</Text>

						<List
							mt={30}
							spacing="sm"
							size="sm"
							icon={
								<ThemeIcon size={20} radius="xl">
									<Check size={12} />
								</ThemeIcon>
							}
						>
							<List.Item>
								<b>Social and physical environmental</b> – All the effects
								around Access the World. trusted by 5million people
							</List.Item>
							<List.Item>
								<b>Simple</b> – You dont need to be a rocket scientist to use
								important info
							</List.Item>
							<List.Item>
								<b>Detailed</b> – The only app you will ever need. Don&apos;t
								believe? Try yourself
							</List.Item>
						</List>

						<Group mt={30}>
							{/* <SignUpFormModal></SignUpFormModal> */}
							<Button radius="xl" size="md" className={classes.control}>
								Learn More
							</Button>

							<GetStarted
								variant="default"
								radius="xl"
								size="md"
								className={classes.control}
							/>
						</Group>
					</div>
					<WorldAtFingerTips className={classes.image} />
				</div>
			</Container>
		</div>
	);
}
