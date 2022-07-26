/* eslint-disable prefer-destructuring */
//time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9

// import { graphic } from 'echarts/core';
import { ECOption } from './useChart';
import taJsonData from './TAChartData.json';

type Prepend<I, T extends unknown[]> = [I, ...T];

type DatumWithoutDate = [number, number, number, number, number, number, number, number, number];
type Datum = Prepend<string, DatumWithoutDate>;

function splitData(rawData: Datum[]) {
  const datas: DatumWithoutDate[] = [];
  const times: string[] = [];
  const opens: number[] = [];
  const vols: number[] = [];
  const macds: number[] = [];
  const difs: number[] = [];
  const deas: number[] = [];

  rawData.forEach((data) => {
    const [time0, open1, close2, min3, max4, vol5, tag6, macd7, dif8, dea9] = data;
    datas.push([open1, close2, min3, max4, vol5, tag6, macd7, dif8, dea9]);
    times.push(time0);
    opens.push(open1);
    vols.push(vol5);
    macds.push(macd7);
    difs.push(dif8);
    deas.push(dea9);
  });
  return {
    datas,
    opens,
    times,
    vols,
    macds,
    difs,
    deas,
  };
}

const data = splitData((taJsonData as any).data);

function fenduans() {
  const markLineData = [];
  let idx = 0;
  let tag = 0;
  let vols = 0;
  for (let i = 0; i < data.times.length; i += 1) {
    if (data.datas[i][5] !== 0 && tag === 0) {
      idx = i;
      // [, , , vols] = data.datas[i];
      vols = data.datas[i][4];
      tag = 1;
    }
    if (tag === 1) {
      vols += data.datas[i][4];
    }
    if (data.datas[i][5] !== 0 && tag === 1) {
      markLineData.push([
        {
          xAxis: idx,
          yAxis:
            data.datas[idx][1] > Number(data.datas[idx][0])
              ? data.datas[idx][3].toFixed(2)
              : data.datas[idx][2].toFixed(2),
          value: vols,
        },
        {
          xAxis: i,
          yAxis:
            data.datas[i][1] > Number(data.datas[i][0])
              ? data.datas[i][3].toFixed(2)
              : data.datas[i][2].toFixed(2),
        },
      ]);
      idx = i;
      vols = data.datas[i][4];
      tag = 2;
    }

    if (tag === 2) {
      vols += data.datas[i][4];
    }
    if (data.datas[i][5] !== 0 && tag === 2) {
      markLineData.push([
        {
          xAxis: idx,
          yAxis:
            data.datas[idx][1] > Number(data.datas[idx][0])
              ? data.datas[idx][3].toFixed(2)
              : data.datas[idx][2].toFixed(2),
          value: `${(vols / (i - idx + 1)).toFixed(2)} M`,
        },
        {
          xAxis: i,
          yAxis:
            data.datas[i][1] > Number(data.datas[i][0])
              ? data.datas[i][3].toFixed(2)
              : data.datas[i][2].toFixed(2),
        },
      ]);
      idx = i;
      vols = data.datas[i][4];
    }
  }
  return markLineData;
}

function calculateMA(dayCount: number) {
  return data.times.map((time, i) => {
    const lastDateOfDayCount = data.datas.slice(i - dayCount, i);
    const closes = lastDateOfDayCount.map(([_open, close, ...others]) => close);
    const mean = closes.reduce((acc, val) => acc + val, 0) / closes.length;
    return mean.toFixed(2);
  });
}

export const taChartOption: ECOption = {
  // Get background from chart theme
  // backgroundColor: "#19232d",
  title: {
    //text: "Oyelowo.com",
    //top: -20
    //left: 0,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      animation: false,
      type: 'cross',
      lineStyle: {
        color: '#376df4',
        width: 2,
        opacity: 1,
      },
    },
  },
  legend: {
    data: ['OLHC', 'MA5', 'MA10', 'MA20', 'MA30'],
    inactiveColor: '#777',
  },
  grid: [
    {
      left: '3%',
      right: '1%',
      height: '56%',
    },
    {
      left: '3%',
      right: '1%',
      top: '69%',
      height: '10%',
    },
    {
      left: '3%',
      right: '1%',
      top: '82%',
      height: '14%',
      // bottom: 80,
    },
  ],
  xAxis: [
    {
      type: 'category',
      data: data.times,
      scale: true,
      boundaryGap: [0, 1], // Cross-check
      axisLine: { onZero: false },
      splitLine: { show: true },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      // axisPointer: {
      //   handle: {
      //     show: true,
      //     margin: 30,
      //     color: "#FD1050",
      //   },
      // },
    },
    {
      type: 'category',
      gridIndex: 1,
      data: data.times,
      axisLabel: { show: false },
      // axisPointer: {
      //   handle: {
      //     show: true,
      //     margin: 30,
      //     color: "#FD1050",
      //   },
      // },
    },
    {
      type: 'category',
      gridIndex: 2,
      data: data.times,
      axisLabel: { show: false },
      // axisPointer: {
      //   handle: {
      //     show: true,
      //     margin: 30,
      //     color: "#FD1050",
      //   },
      // },
    },
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: false,
      },
      splitLine: {
        show: true,
      },
    },
    {
      gridIndex: 1,
      splitNumber: 3,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: true },
    },
    {
      gridIndex: 2,
      splitNumber: 4,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: true },
    },
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 0],
      start: 20,
      end: 100,
      handleIcon:
        'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      dataBackground: {
        areaStyle: {
          color: '#8392A5',
        },
        lineStyle: {
          opacity: 0.8,
          color: '#8392A5',
        },
      },
      brushSelect: false,
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      // top: "97%",
      bottom: '0%',
      start: 20,
      end: 100,
    },
    {
      show: false,
      xAxisIndex: [0, 2],
      type: 'slider',
      start: 20,
      end: 100,
    },
  ],
  series: [
    {
      name: 'OLHC',
      type: 'candlestick',
      data: data.datas,
      itemStyle: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B',
      },
      markArea: {
        silent: true,
        itemStyle: {
          color: 'Honeydew',
        },
        data: fenduans() as any,
      },
      markPoint: {
        data: [
          { type: 'max', name: 'Peak' },
          { type: 'min', name: 'trough' },
        ],
      },
      markLine: {
        label: {
          position: 'middle',
          color: 'Blue',
          fontSize: 15,
        },
        data: fenduans() as any,
        symbol: ['circle', 'none'],
      },
    },
    // {
    //   name: "LineData",
    //   type: "line",
    //   symbol: "none",
    //   sampling: "lttb",
    //   itemStyle: {
    //     color: "rgb(255, 70, 131)",
    //   },
    //   areaStyle: {
    //     color: new graphic.LinearGradient(
    //       0,
    //       0,
    //       0,
    //       1,
    //       [
    //         {
    //           offset: 0,
    //           color: "rgba(0,179,244,0.3)",
    //         },
    //         {
    //           offset: 1,
    //           color: "rgba(0,179,244,0)",
    //         },
    //       ],
    //       false,
    //     ),
    //     shadowColor: "rgba(0,179,244, 0.9)",
    //     shadowBlur: 20,
    //   },
    //   data: data.opens,
    // },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1,
      },
    },
    {
      name: 'Volumn',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.vols,
      itemStyle: {
        color: (params) => {
          let colorList;
          if (data.datas[params.dataIndex][1] > Number(data.datas[params.dataIndex][0])) {
            colorList = '#FD1050';
          } else {
            colorList = '#0CF49B';
          }
          return colorList;
        },
      },
    },
    {
      name: 'MACD',
      type: 'bar',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: data.macds,
      itemStyle: {
        color: (params) => {
          let colorList;
          if (params.data >= 0) {
            colorList = '#FD1050';
          } else {
            colorList = '#0CF49B';
          }
          return colorList;
        },
      },
    },
    {
      name: 'DIF',
      type: 'line',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: data.difs,
    },
    {
      name: 'DEA',
      type: 'line',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: data.deas,
    },
  ],
};
