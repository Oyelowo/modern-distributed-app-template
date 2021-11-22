import { CardTailWindExample, getLowo, TextField, useInterval } from "@oyelowo/lib-core";
import { EChartsOption } from "echarts";
import React, { useEffect, useState } from "react";
import Bars, { ReactECharts, useChart } from "./Bars";

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
const pieOption: EChartsOption = {
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
const barOption: EChartsOption = {
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

const ReactEcharts = () => {
  const [isBar, setIsBar] = useState(false);
  const { ReactCharts } = useChart({
    option: isBar ? barOption : pieOption,
  });

  useInterval(() => setIsBar(prev => !prev), 2000);

  return (
    <main>
      another name {getLowo()} <br />
      Home of grind!
      {ReactCharts}
      <ReactECharts
        style={{ height: 500 }}
        theme="dark"
        settings={{}}
        option={{
          title: {
            text: "Simple Bar Chart",
          },
          tooltip: {},
          legend: {
            data: ["sales"],
            top: 20,
            left: 12,
          },
          xAxis: {
            data: ["Helsinki", "Vantaa", "Espoo", "Ontario", "Canada", "Finland"],
          },
          yAxis: {},
          series: [
            {
              name: "My hoods",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        }}
      />
      <div tw="text-blue-600">Separate Enter</div>
    </main>
  );
};

export default ReactEcharts;
