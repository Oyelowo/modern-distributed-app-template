import { useInterval } from "@mantine/hooks";
import { useState } from "react";
import { ECOption, ThemeOfECharts, useChart } from "./useChart.js";

const dataset = {
	dimensions: ["name", "score"],
	source: [
		["Oyelowo Oyedayo", 314],
		["Maria Koko", 351],
		["Samuel Koiv ", 287],
		["Vuokko Mika", 219],
		["Sakar Sark", 253],
		["Alexi Rikki", 165],
		["Timo Kimo", 318],
		["Service Mesh", 366],
	],
};

// const pieOption: EChartsOption = {
const pieOption: ECOption = {
	// backgroundColor: '#19232d',
	title: {
		text: "Pie of pier",
	},
	tooltip: {},
	dataset: [dataset],
	series: [
		{
			type: "pie",
			// associate the series to be animated by id
			id: "Score",
			radius: [20, "50%"],
			universalTransition: true,
			animationDurationUpdate: 1000,
			itemStyle: {
				borderRadius: 7,
				borderWidth: 2,
			},
		},
	],
};

const barOption: ECOption = {
	// backgroundColor: '#19232d',
	dataset: [dataset],
	xAxis: {
		type: "category",
	},
	yAxis: {},
	series: [
		{
			type: "bar",
			// associate the series to be animated by id
			id: "Score",
			// Each data will have a different color
			colorBy: "data",
			encode: { x: "name", y: "score" },
			universalTransition: true,
			animationDurationUpdate: 1000,
		},
	],
};

const ReactEcharts = ({ theme }: { theme: ThemeOfECharts }) => {
	const [isBar, setIsBar] = useState(false);
	const { ReactCharts } = useChart({
		option: isBar ? barOption : pieOption,
		theme,
	});

	useInterval(() => setIsBar((prev) => !prev), 2000);

	return <ReactCharts />;
};

export default ReactEcharts;
