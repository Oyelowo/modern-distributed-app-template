// QQ:996192181

import { data } from './chartMultiData';
import { ECOption } from './ChartWithHooks';

let KNAME = '';
// let macd;
const Zstart = 80;
const Zend = 100;

let color2: string = '';
let color1: string = '';
const ColorLink = 0;

if (ColorLink === 0) {
  color2 = '#0CF49B';
  color1 = '#FD1050';
} else {
  color1 = '#0CF49B';
  color2 = '#FD1050';
}

KNAME = 'k multichart';

export const multiChartOptions: ECOption = {
  // use chart theme
  // backgroundColor: "#19232d",
  tooltip: {
    show: true,
    trigger: 'axis',
    triggerOn: 'mousemove|click',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: [
    {
      show: true,
      scale: true,
      nameGap: 15,
      gridIndex: 0,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: data.times,
      axisPointer: {
        label: {
          show: false,
        },
      },
    },
    {
      show: true,
      scale: true,
      gridIndex: 1,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      data: data.times,
    },

    {
      show: true,
      scale: true,
      nameGap: 15,
      gridIndex: 2,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: data.times,
      axisPointer: {
        label: {
          show: false,
        },
      },
    },
    {
      show: true,
      scale: true,
      gridIndex: 3,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      data: data.times,
    },

    //=====================================

    {
      show: true,
      scale: true,
      nameGap: 15,
      gridIndex: 4,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: data.times,
      axisPointer: {
        label: {
          show: false,
        },
      },
    },
    {
      show: true,
      scale: true,
      gridIndex: 5,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      data: data.times,
    },

    {
      show: true,
      scale: true,
      nameGap: 15,
      gridIndex: 6,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: data.times,
      axisPointer: {
        label: {
          show: false,
        },
      },
    },
    {
      show: true,
      scale: true,
      gridIndex: 7,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      data: data.times,
    },
  ],
  yAxis: [
    {
      position: 'right',
      scale: true,
      gridIndex: 0,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },
    {
      position: 'right',
      gridIndex: 1,
      splitNumber: 2,
      minInterval: 0,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },

    {
      position: 'right',
      scale: true,
      gridIndex: 2,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },
    {
      position: 'right',
      gridIndex: 3,
      splitNumber: 2,
      minInterval: 0,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },

    //==================================

    {
      position: 'right',
      scale: true,
      gridIndex: 4,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },
    {
      position: 'right',
      gridIndex: 5,
      splitNumber: 2,
      minInterval: 0,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },

    {
      position: 'right',
      scale: true,
      gridIndex: 6,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },
    {
      position: 'right',
      gridIndex: 7,
      splitNumber: 2,
      minInterval: 0,
      axisLine: {
        lineStyle: {
          color: '#4a657a',
        },
      },
      axisLabel: {
        color: '#4a657a',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '4a657a',
          type: 'dashed',
        },
      },
    },
  ],
  title: {
    text: KNAME,
    textStyle: {
      color: '#4a657a',
    },
  },
  dataZoom: [
    {
      show: false,
      type: 'inside',
      start: Zstart,
      end: Zend,
      xAxisIndex: [0, 0],
    },
    {
      show: false,
      type: 'slider',
      start: Zstart,
      end: Zend,
      xAxisIndex: [0, 1],
    },

    {
      show: false,
      type: 'inside',
      start: Zstart,
      end: Zend,
      xAxisIndex: [2, 2],
    },
    {
      show: false,
      type: 'slider',
      start: Zstart,
      end: Zend,
      xAxisIndex: [2, 3],
    },

    //===================================

    {
      show: false,
      type: 'inside',
      start: Zstart,
      end: Zend,
      xAxisIndex: [4, 4],
    },
    {
      show: false,
      type: 'slider',
      start: Zstart,
      end: Zend,
      xAxisIndex: [4, 5],
    },

    {
      show: false,
      type: 'inside',
      start: Zstart,
      end: Zend,
      xAxisIndex: [6, 6],
    },
    {
      show: false,
      type: 'slider',
      start: Zstart,
      end: Zend,
      xAxisIndex: [6, 7],
    },
  ],
  axisPointer: {
    show: true,
    type: 'line',
    // "link": [{
    //     "xAxisIndex": "all"
    // }]
  },
  toolbox: {
    feature: {
      restore: {},
      dataZoom: {},
    },
  },
  series: [
    {
      type: 'candlestick',
      name: 'candlestick1',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: data.datas,

      itemStyle: {
        color: color1,
        color0: color2,
        borderColor: color1,
        borderColor0: color2,
      },
    },

    {
      type: 'bar',
      name: 'bar1',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.vols,
      barCategoryGap: '20%',
      itemStyle: {
        color(params) {
          let colorList;
          if (data.datas[params.dataIndex][1] > Number(data.datas[params.dataIndex][0])) {
            colorList = color1;
          } else {
            colorList = color2;
          }
          return colorList;
        },
      },
    },

    {
      type: 'candlestick',
      name: 'candlestick2',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: data.datas,

      itemStyle: {
        color: color1,
        color0: color2,
        borderColor: color1,
        borderColor0: color2,
      },
    },

    {
      type: 'bar',
      name: 'bar2',
      xAxisIndex: 3,
      yAxisIndex: 3,
      data: data.vols,
      barCategoryGap: '20%',
      itemStyle: {
        color(params) {
          let colorList;
          if (data.datas[params.dataIndex][1] > Number(data.datas[params.dataIndex][0])) {
            colorList = color1;
          } else {
            colorList = color2;
          }
          return colorList;
        },
      },
    },

    //============================

    {
      type: 'candlestick',
      name: 'candlestick3',
      xAxisIndex: 4,
      yAxisIndex: 4,
      data: data.datas,

      itemStyle: {
        color: color1,
        color0: color2,
        borderColor: color1,
        borderColor0: color2,
      },
    },

    {
      type: 'bar',
      name: 'bar3',
      xAxisIndex: 5,
      yAxisIndex: 5,
      data: data.vols,
      barCategoryGap: '20%',
      itemStyle: {
        color(params) {
          let colorList;
          if (data.datas[params.dataIndex][1] > Number(data.datas[params.dataIndex][0])) {
            colorList = color1;
          } else {
            colorList = color2;
          }
          return colorList;
        },
      },
    },

    {
      type: 'candlestick',
      name: 'candlestick4',
      xAxisIndex: 6,
      yAxisIndex: 6,
      data: data.datas,

      itemStyle: {
        color: color1,
        color0: color2,
        borderColor: color1,
        borderColor0: color2,
      },
    },

    {
      type: 'bar',
      name: 'bar4',
      xAxisIndex: 7,
      yAxisIndex: 7,
      data: data.vols,
      barCategoryGap: '20%',
      itemStyle: {
        color: (params) => {
          let colorList;
          if (data.datas[params.dataIndex][1] > Number(data.datas[params.dataIndex][0])) {
            colorList = color1;
          } else {
            colorList = color2;
          }
          return colorList;
        },
      },
    },
  ],
  legend: [
    {
      data: [],
      show: true,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
    },
    {
      show: false,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
    },
  ],

  grid: [
    {
      show: true,
      top: '30px',
      left: '0.5%',
      right: '55%',
      bottom: '65%',
      borderColor: '#4a657a',
    },
    {
      show: true,
      left: '0.5%',
      right: '55%',
      top: '35%',
      bottom: '60%',
      borderColor: '#4a657a',
    },

    {
      show: true,
      top: '30px',
      left: '95%',
      right: '50%',
      bottom: '65%',
      borderColor: '#4a657a',
    },
    {
      show: true,
      left: '95%',
      right: '50%',
      top: '35%',
      bottom: '60%',
      borderColor: '#4a657a',
    },

    //=================================

    {
      show: true,
      top: '45%',
      left: '0.5%',
      right: '55%',
      bottom: '20%',
      borderColor: '#4a657a',
    },
    {
      show: true,
      left: '0.5%',
      right: '55%',
      top: '80%',
      bottom: '15%',
      borderColor: '#4a657a',
    },

    {
      show: true,
      top: '45%',
      left: '95%',
      right: '50%',
      bottom: '20%',
      borderColor: '#4a657a',
    },
    {
      show: true,
      left: '95%',
      right: '50%',
      top: '80%',
      bottom: '15%',
      borderColor: '#4a657a',
    },
  ],
};
