import { CSSProperties, useEffect, useRef, useState } from "react";
// import { init, getInstanceByDom, ECharts, SetOptionOpts, EChartsOption } from "echarts";

// Tree-shakeable approach. //
import * as echarts from "echarts/core";
import {
  BarChart,
  BarSeriesOption,
  CandlestickChart,
  LinesChart,
  CandlestickSeriesOption,
  LineSeriesOption,
  PieChart,
  PieSeriesOption,
  LineChart,
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  TitleComponentOption,
  DatasetComponentOption,
  GridComponentOption,
  TooltipComponentOption,
  DataZoomComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
  GraphicComponent,
  AxisPointerComponent,
  GridSimpleComponent,
  LegendComponent,
  LegendPlainComponent,
  LegendScrollComponent,
  SingleAxisComponent,
  MarkLineComponent,
  MarkPointComponent,
} from "echarts/components";

import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";


// Register the required components
const chartComponentsInUse = [
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LinesChart,
  CandlestickChart,
  GraphicComponent,
  GridSimpleComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  SingleAxisComponent,
  AxisPointerComponent,
  LegendComponent,
  LegendPlainComponent,
  LegendScrollComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  CanvasRenderer,
  // SVGRenderer
];

// Combine an Option type with only required components and charts via ComposeOption
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | CandlestickSeriesOption
>;

export interface ReactEChartsProps {
  option: ECOption /* You may also just use the minimal type: EChartsOption */;
  style?: CSSProperties;
  settings?: echarts.SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export function useChart({ option, style, settings, loading, theme = "dark" }: ReactEChartsProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();
  
  useEffect(() => {
    echarts.use(chartComponentsInUse);
  }, []);
  
  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined;
    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, theme);
      setChart(chart);
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
      const chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return {
    ReactCharts: <div ref={chartRef} style={{ width: "100%", height: "100%", ...style }} />,
    chart,
  };
}

export function ReactEChartCustom({
  option,
  style,
  settings,
  loading,
  theme = "dark",
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined;
    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, theme);
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
      const chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: "100%", height: 500, ...style }} />;
}

export default ReactEChartCustom;
