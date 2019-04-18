import BaseChart from "./baseChart";
export default class GanttChart extends BaseChart {
  constructor(config) {
    super(config);
    this.config = config;
  }
  initChart() {
    this.option = {
      color: ["#58EDD9"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function(params) {
          var tar = params[1];
          return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
        }
      },
      grid: {
        top: "15%",
        bottom: "15%",
        left: 150,
        right: 150
      },
      xAxis: {
        type: "value",
        nameTextStyle: {
          color: "#A49691"
        },
        axisLine: {
          lineStyle: {
            color: "#A49691"
          }
        }
      },
      yAxis: {
        type: "category",
        name: this.config.yAxis.name,
        splitLine: { show: false },
        nameTextStyle: {
          color: "#A49691"
        },
        axisLine: {
          lineStyle: {
            color: "#A49691"
          }
        },
        data: this.config.yAxis.data
      },
      series: [
        {
          name: "辅助",
          type: "bar",
          stack: "总量",
          itemStyle: {
            normal: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            },
            emphasis: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            }
          },
          data: [0, 1700, 1400]
        },
        {
          name: "实际",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "inside"
            }
          },
          barMaxWidth: 20,
          barBorderRadius: 10,
          data: [2900, 1200, 300]
        }
      ]
    };

    this.chart.setOption(this.option, true, true);
  }
}
