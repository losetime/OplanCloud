<template>
  <div class="wind" id="wind">
    <div class="content_body">
      <div class="content_body_top">
        <div class="title">新能源投产时间</div>
        <ganttChart :config="productTime" class="gantt-chart"></ganttChart>
      </div>
      <div class="content-outputChart-wrap">
        <div class="title">风电出力模拟</div>
        <outputChart class="output-chart" :config="outputChart1"></outputChart>
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
      <div class="content-outputChart-wrap">
        <div class="title">光伏出力模拟</div>
        <outputChart class="output-chart" :config="outputChart2"></outputChart>
      </div>
      <div class="content-pie-wrap">
        <div class="content-pie-chart">
          <div class="title">风电模拟出力概率密度</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <barChart :config="probabilityDensity6"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity7"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity8"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity9"></barChart>
            </el-carousel-item>
            <el-carousel-item>
              <barChart :config="probabilityDensity10"></barChart>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="content-pie-chart">
          <div class="title">各片区与总出力概率分布</div>
          <el-carousel :autoplay="false" :interval="4000" indicator-position="none" height="400px">
            <el-carousel-item>
              <lineChart :config="probabilityDist6"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist7"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist8"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist9"></lineChart>
            </el-carousel-item>
            <el-carousel-item>
              <lineChart :config="probabilityDist10"></lineChart>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import outputChart from "./chartshow/outputChart";
import ganttChart from "./chartshow/ganttChart";
import lineChart from "./chartshow/lineChart";
import barChart from "./chartshow/barChart";
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
      slides: 5,
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
      outputChart1: {
        id: "outputChart1"
      },
      outputChart2: {
        id: "outputChart2"
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
      probabilityDensity6: {
        id: "probabilityDensity6",
        title: "2018年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "光伏出力/%"
        }
      },
      probabilityDensity7: {
        id: "probabilityDensity7",
        title: "2017年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "光伏出力/%"
        }
      },
      probabilityDensity8: {
        id: "probabilityDensity8",
        title: "2016年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "光伏出力/%"
        }
      },
      probabilityDensity9: {
        id: "probabilityDensity9",
        title: "2015年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "光伏出力/%"
        }
      },
      probabilityDensity10: {
        id: "probabilityDensity10",
        title: "2014年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "光伏出力/%"
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
      },
      probabilityDist6: {
        id: "probabilityDist6",
        title: "2018年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist7: {
        id: "probabilityDist7",
        title: "2017年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist8: {
        id: "probabilityDist8",
        title: "2016年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist9: {
        id: "probabilityDist9",
        title: "2015年",
        yAxis: {
          name: "概率密度"
        },
        xAxis: {
          name: "每小时出力变化/%"
        }
      },
      probabilityDist10: {
        id: "probabilityDist10",
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
  mounted() {
    this.$nextTick(function() {
      this.styles = this.$el.style;
    });
  },
  components: {
    outputChart,
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
