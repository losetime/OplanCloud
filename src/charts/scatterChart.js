import BaseChart from "./baseChart";
export default class scatterChart extends BaseChart {
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
      grid: {
        top: "15%",
        bottom: "15%",
        left: 150,
        right: 150
      },
      xAxis: {
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
      yAxis: {
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
          symbolSize: 20,
          itemStyle: {
            color: "#58EDD9"
          },
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
          ],
          type: "scatter"
        }
      ]
    };
    this.chart.setOption(this.option, true, true);
  }
}
