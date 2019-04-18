<template>
  <div class="wind" id="wind">
    <div class="content_body">
      <div class="content_body_top">
        <div class="title">线路投产时间</div>
        <ganttChart :config="productTime" class="gantt-chart"></ganttChart>
      </div>
      <div class="content-pie-wrap">
        <div class="content-pie-chart">
          <div class="title">风电模拟出力概率密度</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <barChart :config="probabilityDensity1"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity2"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity3"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity4"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity5"></barChart>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="content-pie-chart">
          <div class="title">各片区与总出力概率分布</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import ganttChart from "./chartshow/ganttChart";
import lineChart from "./chartshow/lineChart";
import barChart from "./chartshow/barChart";
export default {
  data() {
    return {
      slides: 5,
      productTime: {
        id: "gantt-chart",
        yAxis: {
          name: "电源类型",
          data: ["变电站", "线路", "发电站"]
        },
        xAxis: {
          name: "时间/年"
        }
      },
      // 概率密度
      probabilityDensity1: {
        id: "probabilityDensity1",
        title: "2018年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "风电出力/%"
        }
      },
      probabilityDensity2: {
        id: "probabilityDensity2",
        title: "2017年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "风电出力/%"
        }
      },
      probabilityDensity3: {
        id: "probabilityDensity3",
        title: "2016年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "风电出力/%"
        }
      },
      probabilityDensity4: {
        id: "probabilityDensity4",
        title: "2015年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "风电出力/%"
        }
      },
      probabilityDensity5: {
        id: "probabilityDensity5",
        title: "2014年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "风电出力/%"
        }
      },
      //概率分布
      probabilityDist1: {
        id: "probabilityDist1",
        title: "2018年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist2: {
        id: "probabilityDist2",
        title: "2017年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist3: {
        id: "probabilityDist3",
        title: "2016年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist4: {
        id: "probabilityDist4",
        title: "2015年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist5: {
        id: "probabilityDist5",
        title: "2014年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
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
  components: {
    ganttChart,
    lineChart,
    barChart
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
