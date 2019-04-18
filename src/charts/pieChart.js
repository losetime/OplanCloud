import BaseChart from "./baseChart";
export default class pieChart extends BaseChart {
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
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: "库存情况",
          type: "pie",
          radius: "75%",
          center: ["55%", "50%"],
          clockwise: false,
          data: [
            {
              value: 45,
              name: "CARD"
            },
            {
              value: 25,
              name: "SSD"
            },
            {
              value: 15,
              name: "U盘"
            }
          ],
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#999",
                fontSize: 14
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 4,
              borderColor: "#ffffff"
            },
            emphasis: {
              borderWidth: 0,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ],
      color: ["#61D2C4", "#F8DACB", "#B2E3DB"]
    };
    this.chart.setOption(this.option, true, true);
  }
}
