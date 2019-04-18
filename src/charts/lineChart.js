import BaseChart from "./baseChart";
export default class lineChart extends BaseChart {
  constructor(config) {
    super(config);
    this.config = config;
  }
  initChart() {
    this.option = {
      title: {
        text: this.config.title,
        bottom: 0,
        left: "50%"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#ddd"
          }
        }
      },
      // legend: {
      //   right: 20,
      //   orient: "vertical",
      //   data: ["今日", "昨日"]
      // },
      grid: {
        top: "15%",
        bottom: "15%",
        left: 150,
        right: 150
      },
      xAxis: {
        type: "category",
        name: this.config.xAxis.name,
        nameTextStyle: {
          color: "#A49691"
        },
        axisLine: {
          lineStyle: {
            color: "#A49691"
          }
        },
        data: [
          "00:00",
          "2:00",
          "4:00",
          "6:00",
          "8:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
          "22:00"
        ],
        boundaryGap: false
      },
      yAxis: {
        type: "value",
        name: this.config.yAxis.name,
        nameTextStyle: {
          color: "#A49691"
        },
        axisLine: {
          lineStyle: {
            color: "#A49691"
          }
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "昨日",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: [
            "1200",
            "1400",
            "808",
            "811",
            "626",
            "488",
            "1600",
            "1100",
            "500",
            "300",
            "1998",
            "822"
          ],
          areaStyle: {
            normal: {
              color: "#F0FAF8"
            }
          },
          itemStyle: {
            normal: {
              color: "#58EDD9"
            }
          }
        }
      ]
    };
    this.chart.setOption(this.option, true, true);
  }
}
