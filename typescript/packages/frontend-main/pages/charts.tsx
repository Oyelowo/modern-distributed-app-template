
import React from "react";
import MyD3Charts from "../charts/d3/App";
import ReactEChartCustom from "../charts/echarts/ChartWithHooks";
import ReactEcharts from "../charts/echarts/ReactEcharts";

const Charts = () => {
  return (
    <div>
      <ReactEcharts />

      <MyD3Charts />
      <ReactEChartCustom
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
    </div>
  );
};

export default Charts
