import BaseChart from "./baseChart";
export default class Kline extends BaseChart {
  constructor(config) {
    super(config);
    this.realityKline = "#58EDD9";
    this.simulateKline = "rgba(97, 210, 196, 1)";
    this.config = config;
  }
  initChart() {
    this.option = {
      animation: false,
      dataset: {
        source: this.config.data.data
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          snap: false
        },
        backgroundColor: "rgba(245, 245, 245, 0.8)",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        textStyle: {
          color: "#000"
        },
        formatter: params => {
          // trigger: "axis"返回的是数组，trigger: "item"返回的是对象,
          this.dataIndex = params[0].dataIndex;
        }
      },
      axisPointer: {
        link: { xAxisIndex: "all" },
        snap: false,
        label: {
          backgroundColor: "#777"
        }
      },
      grid: [
        {
          top: "7%",
          bottom: "40%",
          left: 150,
          right: 150,
          height: "50%"
        },
        {
          top: "65%",
          bottom: 0,
          left: 150,
          right: 150,
          height: "30%"
        }
      ],
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          axisLine: { onZero: false },
          splitLine: { show: false },
          axisTick: {
            alignWithLabel: true
          },
          min: "dataMin",
          max: "dataMax",

          axisPointer: {
            z: 100,
            label: {
              show: false
            }
          }
        },
        {
          type: "category",
          gridIndex: 1,
          boundaryGap: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: "dataMin",
          max: "dataMax"
        }
      ],
      yAxis: [
        {
          name: "负荷（MW）",
          scale: true,
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          nameLocation: "center",
          nameGap: 50,
          axisLabel: {
            formatter: function(params) {
              if (params < 1000 && params > 0) {
                return params;
              } else if (params == 0) {
                return;
              } else {
                return params / 1000 + "k";
              }
            }
          }
        },
        {
          name: "电量（MW·h）",
          // scale: true,
          gridIndex: 1,
          // splitNumber: 2,
          nameLocation: "center",
          nameGap: 50,
          axisLabel: {
            formatter: function(params) {
              if (params < 1000 && params > 0) {
                return params;
              } else if (params == 0) {
                return;
              } else {
                return params / 1000 + "k";
              }
            }
          },
          axisLine: { show: true },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: [0, 1],
          start: 0,
          end: 100
        },
        {
          xAxisIndex: [0, 1],
          type: "inside",
          bottom: 10,
          start: 0,
          end: 100
        }
      ],
      visualMap: [
        {
          show: true,
          dimension: 6,
          top: "1",
          right: "270",
          seriesIndex: 0,
          orient: "horizontal",
          inverse: true,
          pieces: [
            {
              value: 1,
              color: this.realityKline
            },
            {
              value: -1,
              color: this.simulateKline
            }
          ],
          formatter: function(value) {
            if (value == 1) {
              return "实际K线"; // 范围标签显示内容。
            } else {
              return "模拟K线"; // 范围标签显示内容。
            }
          }
        },
        {
          show: true,
          dimension: 6,
          seriesIndex: 1,
          top: "0",
          right: "60",
          orient: "horizontal",
          inverse: true,
          pieces: [
            {
              value: 1,
              color: this.realityKline
            },
            {
              value: -1,
              color: this.simulateKline
            }
          ],
          formatter: function(value) {
            if (value == 1) {
              return "实际总电量"; // 范围标签显示内容。
            } else {
              return "模拟总电量"; // 范围标签显示内容。
            }
          }
        }
      ],
      series: [
        {
          type: "candlestick",
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            color: this.realityKline,
            color0: null,
            borderColor: null,
            borderColor0: null
          },
          large: true,
          largeThreshold: 2000,
          encode: {
            x: 7,
            y: [0, 1, 2, 3]
          }
        },
        {
          name: "Volumn",
          type: "bar",
          large: true,
          largeThreshold: 2000,
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: this.realityKline
          },
          encode: {
            x: 7,
            y: 4
          }
        }
      ]
    };
    this.chart.setOption(this.option, true);
  }
}
