<template>
  <div class="wind" id="wind">
    <div class="content_body">
      <div class="content-outputChart-wrap">
        <div class="title">电量与电力分析</div>
        <outputChart class="output-chart" :config="outputChart1"></outputChart>
      </div>
      <div class="content-body-wrap">
        <!-- <lineChart :config="maxLoadAnalyze" class="line-chart"></lineChart> -->
        <div class="content-pie-chart">
          <div class="title">最大负荷分析</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <lineChart :config="probabilityDist1"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist2"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist3"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist4"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist5"></lineChart>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="content-pie-chart">
          <div class="title">负荷分析</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import outputChart from "./chartshow/outputChart";
import lineChart from "./chartshow/lineChart";
import pieChart from "./chartshow/pieChart";
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
      //最大负荷分析
      maxLoadAnalyze: {
        title: "最大负荷分析",
        id: "maxLoadAnalyze"
      },
      outputChart1: {
        id: "outputChart1"
      },
      probabilityDist1: {
        id: "probabilityDist1",
        title: "2018年",
        yAxis: {
          name: "最大负荷"
        },
        xAxis: {
          name: "小时 "
        }
      },
      probabilityDist2: {
        id: "probabilityDist2",
        title: "2017年",
        yAxis: {
          name: "最大负荷"
        },
        xAxis: {
          name: "小时 "
        }
      },
      probabilityDist3: {
        id: "probabilityDist3",
        title: "2016年",
        yAxis: {
          name: "最大负荷"
        },
        xAxis: {
          name: "小时 "
        }
      },
      probabilityDist4: {
        id: "probabilityDist4",
        title: "2015年",
        yAxis: {
          name: "最大负荷"
        },
        xAxis: {
          name: "小时 "
        }
      },
      probabilityDist5: {
        id: "probabilityDist5",
        title: "2014年",
        yAxis: {
          name: "最大负荷"
        },
        xAxis: {
          name: "小时 "
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
    outputChart,
    lineChart,
    pieChart
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
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  .content_body {
    .content-outputChart-wrap {
      width: 100%;
      height: 550px;
      .title {
        @include title;
      }
      .output-chart {
        height: 450px;
      }
    }
    .content-body-wrap {
      width: 100%;
      height: 450px;
      display: flex;
      justify-content: space-around;
      .line-chart {
        width: 50%;
        height: 400px;
      }
      .title {
        @include title;
      }
      .content-pie-chart {
        width: 50%;
        height: 450px;
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
