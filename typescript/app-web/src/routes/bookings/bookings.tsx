import { bookingsRoute } from "./index.js";
import { router } from "../../router.js";
import { MultiSelect, SegmentedControl, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { tradingChartOption } from "../../charts/tradingChartsOptions.js";
import { useChart } from "../../charts/useChart.js";
import { useMatch } from "@tanstack/react-router";

export const bookingsIndexRoute = bookingsRoute.createRoute({
	path: "/",
	component: BookingsHome,
});

function BookingsHome() {
	const {
		// loaderData: { invoices },
		Link,
		status,
	} = useMatch(bookingsIndexRoute.id);

	const { ReactCharts: TAChart } = useChart({
		option: tradingChartOption,
		// theme: "light",
	});

	return (
		<div className="p-2">
			<div className="p-2">
				Bookings Page
				<Demo />
			</div>
			<div className="p-2">
				<Demo2 />
			</div>
			<SimpleGrid style={{ minHeight: "60vh" }} my="lg">
				<TAChart />
			</SimpleGrid>
			<br />
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
