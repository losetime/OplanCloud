import BaseChart from "./baseChart";
export default class barChart extends BaseChart {
  constructor(config) {
    super(config);
    this.config = config;
  }
  initChart() {
    this.option = {
      color: ["#58EDD9"],
      title: {
        text: this.config.title,
        bottom: 0,
        left: "50%"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: "15%",
        bottom: "15%",
        left: 150,
        right: 150
      },
      xAxis: [
        {
          type: "category",
          name: this.config.xAxis.name,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          },
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
        }
      ],
      yAxis: [
        {
          type: "value",
          name: this.config.yAxis.name,
          nameTextStyle: {
            color: "#A49691"
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#A49691"
            }
          }
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    this.chart.setOption(this.option, true, true);
  }
}
