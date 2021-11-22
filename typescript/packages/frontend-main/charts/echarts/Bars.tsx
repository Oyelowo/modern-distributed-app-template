import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { init, getInstanceByDom, ECharts, EChartsOption, SetOptionOpts } from "echarts";

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export function useChart({ option, style, settings, loading, theme="dark" }: ReactEChartsProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return {
    ReactCharts: <div ref={chartRef} style={{ width: "100%", height: 500, ...style }} />,
  };
}

export function ReactECharts({ option, style, settings, loading, theme = "dark" }: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: "100%", height: 500, ...style }} />;
}

const Bars = () => {
  // const [chartRef, setChartRef] = useState();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    const myChart = init(chartRef.current);

    // Specify the configuration items and data for the chart
    const option = {
      title: {
        text: "ECharts Getting Started Example",
      },
      tooltip: {},
      legend: {
        data: ["sales"],
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
    };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
  }, []);
  // Initialize the echarts instance based on the prepared dom

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default Bars;
