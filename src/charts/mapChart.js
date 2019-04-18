import echarts from "echarts";
import "echarts-amap";
import { netWorkData } from "../assets/service/wpSimluateService";
export default class MapChart {
  constructor() {
    this.originalData = null;
    this.chart = null;
    this.num = 0.3;
    this.lineData = [];
    this.line_500Data = [];
    this.line_220Data = [];
    this.line_800Data = [];
    this.point_101Data = [];
    this.point_102Data = [];
    this.point_103Data = []; //500kv变电站
    this.point_104Data = [];
    this.point_105Data = [];
    this.point_106Data = [];
    this.point_107Data = [];
    this.point_108Data = [];
    this.point_109Data = [];
    this.point_110Data = [];
    this.point_111Data = [];
    this.point_112Data = [];
    this.point_113Data = [];
    this.point_1000Data = [];
  }
  init(divId) {
    this.chart = echarts.init(document.getElementById(divId));
    this.initChartOption();
  }
  resize() {
    this.chart.resize();
  }
  async showChart() {
    let res = await netWorkData();
    if (res.err_code == 0) {
      this.originalData = res.data;
      this.analyzeData();
    } else {
      console.log(res.msg);
    }
    this.chart.setOption(this.option);
  }
  analyzeData() {
    for (let item of this.originalData) {
      //拿出各类型起始点位置
      switch (item.from_station_type_id) {
        case 103:
          this.point_103Data.push({
            name: item[0].fromName,
            value: item[0].coords[0]
          });
          break;
        case 105:
          this.point_105Data.push({
            name: item[0].fromName,
            value: item[0].coords[0]
          });
          break;
        case 108:
          this.point_108Data.push({
            name: item[0].fromName,
            value: item[0].coords[0]
          });
          break;
        case 109:
          this.point_109Data.push({
            name: item[0].fromName,
            value: item[0].coords[0]
          });
          break;
      }
      //拿出各类型结束点位置
      switch (item.to_station_type_id) {
        case 103:
          this.point_103Data.push({
            name: item[0].toName,
            value: item[0].coords[1]
          });
          break;
        case 105:
          this.point_105Data.push({
            name: item[0].toName,
            value: item[0].coords[1]
          });
          break;
        case 108:
          this.point_108Data.push({
            name: item[0].toName,
            value: item[0].coords[1]
          });
          break;
        case 109:
          this.point_109Data.push({
            name: item[0].toName,
            value: item[0].coords[1]
          });
          break;
      }
      //通过各种判断剥离出线坐标
      for (let index in item) {
        /**
         * index为item的每个键名
         * 通过!isNaN(parseInt(index))判断键名是否为数字，如果是则说明该对象是一条线坐标
         * index.includes("0") == false  如果为true,说明这条线为中心线,我们是不需要显示中心线的,只是为了定位point点的位置
         * 为false说明这条线不是中心线,才让这个index进来
         * 目的是为了排除这条潮流的中线
         */
        //获得全部显示的线,为了显示潮流效果
        if (!isNaN(parseInt(index))) {
          if (item.line_number == 1) {
            this.lineData.push(item[index]);
          } else if (index.includes("0") == false) {
            this.lineData.push(item[index]);
          }
        }
        switch (item.line_type_id) {
          case 4: //确定是500kv
            if (!isNaN(parseInt(index))) {
              if (item.line_number == 1) {
                this.line_500Data.push(item[index]);
              } else if (index.includes("0") == false) {
                this.line_500Data.push(item[index]);
              }
            }
            break;
          case 8:
            if (!isNaN(parseInt(index))) {
              if (item.line_number == 1) {
                this.line_220Data.push(item[index]);
              } else if (index.includes("0") == false) {
                this.line_220Data.push(item[index]);
              }
            }
            break;
          case 22:
            if (!isNaN(parseInt(index))) {
              if (item.line_number == 1) {
                this.line_800Data.push(item[index]);
              } else if (index.includes("0") == false) {
                this.line_800Data.push(item[index]);
              }
            }
            break;
        }
      }
    }
    // console.log(this.lineData);
  }
  startChart() {
    this.option.series[0].effect.show = true;
    this.chart.setOption(this.option);
  }
  stopChart() {
    this.option.series[0].effect.show = false;
    this.chart.setOption(this.option);
  }
  initChartOption() {
    // 得到的数据结构：{fromName: "大同", toName: "高石", coords: Array(2)}
    this.option = {
      title: {
        text: "山西电网规划图"
      },
      amap: {
        maxPitch: 60,
        pitch: 10, //45 俯仰角
        viewMode: "3D",
        zoom: 7.45,
        expandZoomRange: true,
        zooms: [3, 20],
        mapStyle: "amap://styles/d89a9d28a1c4f4ed4a3cd3bf461be304", //地图主题
        center: [112.595875, 36.972726], //中心点
        rotation: 0, //顺时针旋转角度
        resizeEnable: true
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        top: "bottom",
        left: "right",
        data: [],
        textStyle: {
          color: "#fff"
        },
        selectedMode: "single"
      },
      series: [
        // 小球阴影
        {
          // name: item[0] + " 电网规划图",
          type: "lines",
          coordinateSystem: "amap",
          polyline: true,
          zlevel: 1,
          effect: {
            show: true,
            constantSpeed: 30,
            period: 6, //动画的周期
            trailLength: 0.6,
            color: "rgba(255,255,255,0.8)",
            symbolSize: 1
          },
          lineStyle: {
            normal: {
              color: "#35BBC0",
              width: 0,
              curveness: 0
            }
          },
          data: this.lineData
        },

        //小球和线条
        {
          // name: item[0] + " 电网规划图",
          type: "lines",
          coordinateSystem: "amap",
          polyline: true,
          zlevel: 3,
          effect: {
            show: false,
            period: 6,
            trailLength: 0,
            symbolSize: 1.3
          },
          lineStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FFF3C0" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFD220" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              // color: "#D67A4F",
              width: 1,
              opacity: 1,
              curveness: 0
            }
          },
          data: this.line_220Data
        },
        {
          // name: item[0] + " 电网规划图",
          type: "lines",
          coordinateSystem: "amap",
          polyline: true,
          zlevel: 3,
          effect: {
            show: false,
            period: 6,
            trailLength: 0,
            symbolSize: 1.3
          },
          lineStyle: {
            normal: {
              // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              //   {
              //     offset: 0,
              //     color: "rgb(97,229,137)"
              //   },
              //   {
              //     offset: 1,
              //     color: "rgb(143,248,175)"
              //   }
              // ]),
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#43D66F" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#B5FFCB" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              // color: "#199AC1",
              width: 1,
              opacity: 1,
              curveness: 0
            }
          },
          data: this.line_500Data
        },
        {
          // name: item[0] + " 电网规划图",
          type: "lines",
          coordinateSystem: "amap",
          polyline: true,
          zlevel: 3,
          effect: {
            show: false,
            period: 6,
            trailLength: 0,
            symbolSize: 1.3
          },
          lineStyle: {
            normal: {
              color: {
                type: "radial",
                x: 0.5,
                y: 1,
                r: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0F1F7D" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#AAB2E2" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              // color: "#EB000E",
              width: 1.5,
              opacity: 1,
              curveness: 0
            }
          },
          data: this.line_800Data
        },

        //拐角icon
        {
          type: "scatter",
          symbol:
            "image://https://orait.oss-cn-hangzhou.aliyuncs.com/oraitStatic/img/chartImg/500变电.svg",
          coordinateSystem: "amap",
          zlevel: 4,
          rippleEffect: {
            show: false,
            brushType: "stroke"
          },
          label: {
            normal: {
              show: false,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: 18,
          itemStyle: {
            normal: {
              show: false
            }
          },
          data: this.point_103Data
        },
        {
          type: "scatter",
          symbol:
            "image://https://orait.oss-cn-hangzhou.aliyuncs.com/oraitStatic/img/chartImg/500变电.svg", //220变电
          coordinateSystem: "amap",
          zlevel: 4,
          rippleEffect: {
            show: false,
            brushType: "stroke"
          },
          label: {
            normal: {
              show: false,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: 18,
          itemStyle: {
            normal: {
              show: false
            }
          },
          data: this.point_105Data
        },
        {
          type: "scatter",
          symbol:
            "image://https://orait.oss-cn-hangzhou.aliyuncs.com/oraitStatic/img/chartImg/风电站.svg",
          coordinateSystem: "amap",
          zlevel: 4,
          rippleEffect: {
            show: false,
            brushType: "stroke"
          },
          label: {
            normal: {
              show: false,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: 18,
          itemStyle: {
            normal: {
              show: false
            }
          },
          data: this.point_108Data
        },
        {
          type: "scatter",
          symbol:
            "image://https://orait.oss-cn-hangzhou.aliyuncs.com/oraitStatic/img/chartImg/火电站.svg",
          coordinateSystem: "amap",
          zlevel: 4,
          rippleEffect: {
            show: false,
            brushType: "stroke"
          },
          label: {
            normal: {
              show: false,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: 18,
          itemStyle: {
            normal: {
              show: false
            }
          },
          data: this.point_109Data
        }
      ]
    };
    this.chart.setOption(this.option);
    var map = this.chart
      .getModel()
      .getComponent("amap")
      .getAMap();
    var layer = this.chart
      .getModel()
      .getComponent("amap")
      .getLayer();
    //右边工具
    AMap.plugin(["AMap.ControlBar"], function() {
      var bar = new AMap.ControlBar();
      map.addControl(bar);
    });
    //左边工具
    AMap.plugin(["AMap.ToolBar"], function() {
      map.addControl(new AMap.ToolBar());
    });

    AMap.event.addListener(map, "zoomend", () => {
      console.log("当前缩放级别：" + map.getZoom());
      console.log("俯视视角" + map.getPitch());
      console.log("俯视视角" + map.getPitch());
    });
    layer.render = () => {
      // let series = myChart.getOption().seriesIndexes;
      // myChart.setOption({
      //     series: []
      // });
      this.chart.setOption(this.option);
      // console.log('当前缩放级别：' + map.getZoom());
      // console.log('俯视视角：' + map.getPitch());
      // console.log('顺时针：' + map.getRotation());
    };
  }
}
