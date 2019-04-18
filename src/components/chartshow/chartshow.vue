<template>
  <div class="wind" id="wind">
    <div class="content_body">
      <div class="content_body_top">
        <div class="title">电源投产时间</div>
        <ganttChart :config="productTime" class="gantt-chart"></ganttChart>
      </div>
      <div class="content-pie-wrap">
        <div class="content-pie-chart">
          <div class="title">传统电源指定出力分析</div>
          <lineChart :config="lineOutput" class="line-chart"></lineChart>
        </div>
        <div class="content-pie-chart">
          <div class="title">机组报价</div>
          <lineChart :config="machineOffer" class="line-chart"></lineChart>
        </div>
      </div>
      <div class="content-pie-wrap">
        <div class="content-pie-chart">
          <div class="title">电源结构与电源布局分析</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <pieChart :config="layoutAnalyze1"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze2"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze3"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze4"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze5"></pieChart>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="content-pie-chart">
          <div class="title">不同类型机组的容量地理分布图</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <pieChart :config="layoutAnalyze6"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze7"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze8"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze9"></pieChart>
            </el-carousel-item>
            <el-carousel-item>
              <pieChart :config="layoutAnalyze10"></pieChart>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="content-pie-wrap">
        <div class="content-pie-chart">
          <div class="title">机组利用小时数分析</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <barChart :config="hourAnalyze1"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="hourAnalyze2"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="hourAnalyze3"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="hourAnalyze4"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="hourAnalyze5"></barChart>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="content-pie-chart">
          <div class="title">机组调峰贡献分析</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <scatterChart :config="contributAnalyze1"></scatterChart>
            </el-carousel-item>
            <el-carousel-item>
              <scatterChart :config="contributAnalyze2"></scatterChart>
            </el-carousel-item>
            <el-carousel-item>
              <scatterChart :config="contributAnalyze3"></scatterChart>
            </el-carousel-item>
            <el-carousel-item>
              <scatterChart :config="contributAnalyze4"></scatterChart>
            </el-carousel-item>
            <el-carousel-item>
              <scatterChart :config="contributAnalyze5"></scatterChart>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ganttChart from "./chartshow/ganttChart";
import lineChart from "./chartshow/lineChart";
import pieChart from "./chartshow/pieChart";
import barChart from "./chartshow/barChart";
import scatterChart from "./chartshow/scatterChart";
export default {
  data() {
    return {
      styles: null,
      show_fullChart: true,
      show_fullTable: true,
      fullScreen_flag: true,
      top_DomWH: null,
      bottom_DomWH: null,
      visibleHeight: 0,
      productTime: {
        id: "gantt-chart",
        yAxis: {
          name: "电源类型",
          data: ["风电", "火电", "水电"]
        },
        xAxis: {
          name: "时间/年"
        }
      },
      //出力分析
      lineOutput: {
        id: "lineOutput",
        yAxis: {
          name: "功率/MW"
        },
        xAxis: {
          name: "时间/年"
        }
      },
      //机组报价
      machineOffer: {
        id: "machineOffer",
        yAxis: {
          name: "报价/万元"
        },
        xAxis: {
          name: "时间/年"
        }
      },
      // 电源结构与电源布局分析
      layoutAnalyze1: {
        id: "layoutAnalyze1",
        title: "2018年"
      },
      layoutAnalyze2: {
        id: "layoutAnalyze2",
        title: "2017年"
      },
      layoutAnalyze3: {
        id: "layoutAnalyze3",
        title: "2016年"
      },
      layoutAnalyze4: {
        id: "layoutAnalyze4",
        title: "2015年"
      },
      layoutAnalyze5: {
        id: "layoutAnalyze5",
        title: "2014年"
      },
      layoutAnalyze6: {
        id: "layoutAnalyze6",
        title: "2018年"
      },
      layoutAnalyze7: {
        id: "layoutAnalyze7",
        title: "2017年"
      },
      layoutAnalyze8: {
        id: "layoutAnalyze8",
        title: "2016年"
      },
      layoutAnalyze9: {
        id: "layoutAnalyze9",
        title: "2015年"
      },
      layoutAnalyze10: {
        id: "layoutAnalyze10",
        title: "2014年"
      },
      hourAnalyze1: {
        id: "hourAnalyze1",
        title: "2018年",
        yAxis: {
          name: "机组平均利用小时数/h"
        },
        xAxis: {
          name: "机组类型"
        }
      },
      hourAnalyze2: {
        id: "hourAnalyze2",
        title: "2017年",
        yAxis: {
          name: "机组平均利用小时数/h"
        },
        xAxis: {
          name: "机组类型"
        }
      },
      hourAnalyze3: {
        id: "hourAnalyze3",
        title: "2016年",
        yAxis: {
          name: "机组平均利用小时数/h"
        },
        xAxis: {
          name: "机组类型"
        }
      },
      hourAnalyze4: {
        id: "hourAnalyze4",
        title: "2015年",
        yAxis: {
          name: "机组平均利用小时数/h"
        },
        xAxis: {
          name: "机组类型"
        }
      },
      hourAnalyze5: {
        id: "hourAnalyze5",
        title: "2014年",
        yAxis: {
          name: "机组平均利用小时数/h"
        },
        xAxis: {
          name: "机组类型"
        }
      },
      contributAnalyze1: {
        id: "contributAnalyze1",
        title: "2018年"
      },
      contributAnalyze2: {
        id: "contributAnalyze2",
        title: "2017年"
      },
      contributAnalyze3: {
        id: "contributAnalyze3",
        title: "2016年"
      },
      contributAnalyze4: {
        id: "contributAnalyze4",
        title: "2015年"
      },
      contributAnalyze5: {
        id: "contributAnalyze5",
        title: "2014年"
      }
    };
  },
  methods: {
    //表格点击后触发
    getdetailData() {
      // console.log(val);
    },
    goNetwork() {
      window.location.href = "/network.html#/chartMap/networkBrowse";
    },
    goChartshow() {
      window.location.href = "/chartshow.html#/chartshow";
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.styles = this.$el.style;
    });
  },
  components: {
    ganttChart,
    lineChart,
    pieChart,
    barChart,
    scatterChart
  }
};
</script>

<style scoped lang="scss">
@mixin title {
  font-size: var(--titleThree);
  height: 50px;
  line-height: 50px;
  width: 100%;
  padding-left: 20px;
}
.wind {
  // height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  .content_body {
    .content_body_top {
      width: 100%;
      height: 450px;
      .gantt-chart {
        width: 100%;
        height: 400px;
      }
      .title {
        @include title;
      }
    }
    .content-pie-wrap {
      width: 100%;
      height: 480px;
      display: flex;
      justify-content: space-around;
      .title {
        @include title;
      }
      .content-pie-chart {
        width: 48%;
        height: 400px;
        .line-chart {
          width: 100%;
          height: 100%;
        }
        .el-carousel__item h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 200px;
          margin: 0;
        }
        .el-carousel__item {
          background-color: #ffffff;
        }
      }
    }
  }
}
</style>
