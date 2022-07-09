import { CallbackDataParams } from 'echarts/types/dist/shared';
import { useEffect } from 'react';
import { ThemeOfECharts, useChart } from './ChartWithHooks';
import { taChartOption } from './TAChart';

export const useCandleChart = ({ theme }: { theme: ThemeOfECharts }) => {
  const { ReactCharts: CandleStickCharts, chart } = useChart({
    option: taChartOption,
    theme,
  });
  //   useEffect(() => {
  //     chart?.dispatchAction({
  //       type: "legendSelect",
  //       name: "LineData",
  //     });
  //     chart?.dispatchAction({
  //       type: "legendUnSelect",
  //       name: "LineData",
  //     });
  //   }, []);

  //   useEffect(() => {
  //     chart?.on("legendselectchanged", (params: CallbackDataParams) => {
  //       //   if (params.name === "lineData") {
  //       //     selectGraph(params);

  //       //     unselectGrap(params);
  //       //   }
  //       selectGraph(params);

  //       unselectGrap(params);
  //     });

  //     function selectGraph(params) {
  //       chart?.dispatchAction({
  //         type: "legendSelect",
  //         // legend name
  //         name: params.name,
  //       });
  //     }

  //     function unselectGrap(params) {
  //       //    if (params.name !== "LineData") {
  //       //      chart?.dispatchAction({
  //       //        type: "legendUnSelect",
  //       //        // legend name
  //       //        name: "LineData",
  //       //      });
  //       //      return
  //       //    }
  //       for (const legend in params.selected) {
  //         // if (legend !== params.name) {
  //         //   chart?.dispatchAction({
  //         //     type: "legendUnSelect",
  //         //     // legend name
  //         //     name: legend,
  //         //   });
  //         // }
  //         if (params.name === "LineData" && legend !== params.name) {
  //           chart?.dispatchAction({
  //             type: "legendUnSelect",
  //             // legend name
  //             name: legend,
  //           });
  //         }
  //         // if (params.name !== "LineData" && legend !== params.name) {
  //         //   chart?.dispatchAction({
  //         //     type: "legendUnSelect",
  //         //     // legend name
  //         //     name: "LineData",
  //         //   });
  //         // }
  //         // if (legend !== params.name) {
  //         //   chart?.dispatchAction({
  //         //     type: "legendUnSelect",
  //         //     // legend name
  //         //     name: legend,
  //         //   });
  //         // }
  //       }
  //     }
  //     // return () => {};
  //   }, [chart]);

  return {
    CandleStickCharts,
    chart,
  };
};
