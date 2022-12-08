import { dashboardRoute } from "./index.js";
import { MultiSelect, SegmentedControl, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { tradingChartOption } from "../../charts/tradingChartsOptions.js";
import { useChart } from "../../charts/useChart.js";
import { useMatch } from "@tanstack/react-router";

export const dashboardIndexRoute = dashboardRoute.createRoute({
	path: "/",
	component: DashboardHome,
});

function DashboardHome() {
	const {
		loaderData: { invoices },
	} = useMatch(dashboardIndexRoute.id);
	const { ReactCharts: TAChart } = useChart({
		option: tradingChartOption,
		// theme: "light",
	});

	return (
		<div className="p-2">
			<div className="p-2">
				xxx Welcome to the dashboard! You have{" "}
				<strong>{invoices.length} total invoices</strong>.<h1>My chart</h1>
				<SimpleGrid style={{ minHeight: "60vh" }} my="lg">
					<TAChart />
				</SimpleGrid>
				<br />
				<Demo />
			</div>
			<div className="p-2">
				Welcome to the dashboard! You have{" "}
				<strong>{invoices.length} total invoices</strong>.
				<Demo2 />
			</div>
		</div>
	);
}

const data = [
	{ value: "react", label: "React" },
	{ value: "ng", label: "Angular" },
	{ value: "svelte", label: "Svelte" },
	{ value: "vue", label: "Vue" },
	{ value: "riot", label: "Riot" },
	{ value: "next", label: "Next.js" },
	{ value: "blitz", label: "Blitz.js" },
];

function Demo() {
	return (
		<MultiSelect
			data={data}
			label="Your favorite frameworks/libraries"
			placeholder="Pick all that you like"
		/>
	);
}

function Demo2() {
	const [value, setValue] = useState("react");
	return (
		<SegmentedControl
			value={value}
			onChange={setValue}
			data={[
				{ label: "React", value: "react" },
				{ label: "Angular", value: "ng" },
				{ label: "Vue", value: "vue" },
				{ label: "Svelte", value: "svelte" },
			]}
		/>
	);
}
