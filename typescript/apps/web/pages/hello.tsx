import { Button, getLowo, useInterval } from "@oyelowo/ui";
import { useState } from "react";
import { ECOption, ReactEChartCustom, useChart } from "../charts/echarts/ChartWithHooks";
import Link from "next/link";

const dataset = {
  dimensions: ["name", "score"],
  source: [
    ["Oyelowo Oyedayo", 314],
    ["Maria Koko", 351],
    ["Samuel Koiv ", 287],
    ["Saul Paul", 219],
    ["Sakar Sark", 253],
    ["Alexi Lab", 165],
    ["Port Proxy", 318],
    ["Service Mesh", 366],
  ],
};
const pieOption: ECOption = {
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
      radius: [0, "50%"],
      universalTransition: true,
      animationDurationUpdate: 1000,
    },
  ],
};
const barOption: ECOption = {
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

const Hello = () => {
  const [isBar, setIsBar] = useState(false);
  const { ReactCharts } = useChart({
    option: isBar ? barOption : pieOption,
  });

  useInterval(() => setIsBar((prev) => !prev), 2000);

  return (
    <main>
      another name {getLowo()} <br />
      <Button>
        <Link href="/">Go Home</Link>
      </Button>
      <h1>Home of grind!</h1>
      {ReactCharts}
      <br />
      <ReactEChartCustom
        style={{ height: 500 }}
        theme="dark"
        settings={{}}
        option={{
          title: {
            text: "Charts of darkness",
          },
          tooltip: {},
          legend: {
            data: ["sales"],
            top: 20,
            left: 12,
          },
          xAxis: {
            data: ["Shirts", "Cardigans", "Chiffons", "Pants", "Heels", "Socks"],
          },
          yAxis: {},
          series: [
            {
              name: "sales",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        }}
      />
      <div className="text-blue-600">Separate Enter</div>
    </main>
  );
};

export default Hello;
