<!-- 负荷模拟K线图 -->
<template>
  <div class="outputChart-wrap">
    <div class="wrapper" v-show="SID != null">
      <div class="chartInfo-wrap" @dblclick="fullScreen">
        <chartInfo :chart_InfoList="chart_InfoList"></chartInfo>
      </div>
      <!-- 操作区域 -->
      <div class="handle-wrap">
        <div
          :class="{ 'handle-btn': true, 'btn-checked': btnChecked == 1 }"
          @click="handleBtnFn(1)"
        >
          分时
        </div>
        <div
          :class="{ 'handle-btn': true, 'btn-checked': btnChecked == 2 }"
          @click="handleBtnFn(2)"
        >
          K线图
        </div>
        <div class="handle-classify" v-show="btnChecked == 2">
          <p
            v-for="(item, index) in klineMenu"
            :key="index"
            :class="{ 'time-checked': timeChecked == index }"
            @click="creatKline(item.value, index)"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
      <!-- 图表显示区域 -->
      <div
        class="chart-wrap"
        :id="this.config.id"
        @mousedown.shift.exact="updateData($event)"
      ></div>
    </div>
    <div class="warning" v-show="SID == null">
      <p>导入数据后即可查看图表</p>
    </div>
    <div class="check-data-btn" v-show="btnChecked == 1 && SID != null">
      <div class="btn-item" @click="updateData(-1)">
        <i class="iconfont icon-a-zuo"></i>
      </div>
      <div class="btn-item" @click="updateData(1)">
        <i class="iconfont icon-a-you"></i>
      </div>
    </div>
    <dialogBox
      v-show="dialogVisible"
      content="有坏数据存在，请修复后查看图表"
      @close="dialogVisible = false"
    >
      <span slot="footer">
        <div class="cancel" @click="dialogVisible = false">取消</div>
        <div class="dom" @click.stop="dialogSure">确认</div>
      </span>
    </dialogBox>
  </div>
</template>

<script>
import chartInfo from "./chartInfo";
import Kline from "../../../charts/Kline.js"; //K线图
import TiemShare from "../../../charts/TiemShare.js";
import {
  get_kline,
  get_timeshare
} from "../../../assets/service/wpSimluateService.js";
import dialogBox from "../../../globalComponents/dialogBox";
export default {
  props: ["config"],
  data() {
    return {
      chartData: null,
      kline: null, //K线图对象
      tiemShare: null, //分时对象
      btnChecked: 1, //分时 or K线图
      timeChecked: 0, //K线图的日周年月
      dialogVisible: false, //dialog的显示隐藏
      //K线图菜单
      klineMenu: [
        { label: "日", value: "D" },
        { label: "周", value: "W" },
        { label: "月", value: "M" },
        { label: "年", value: "A" }
      ],
      chart_InfoList: {
        quantity: 0, //电量
        mean: 0, //负荷
        MA7: 0,
        max_load: 0,
        min_load: 0,
        avg_load: 0
      },
      SID: null,
      count: 5
    };
  },
  computed: {
    //计算属性只能对数据进行监听，计算属性最后会返回一个值
    theme() {
      return "light"; //计算属性最后返回的值在哪里使用
    },
    htmlHeight() {
      return this.$store.state.module_global.htmlHeight;
    },
    htmlWidth() {
      return this.$store.state.module_global.htmlWidth;
    },
    sidFlag() {
      return this.$store.state.module_global.sidFlag;
    },
    globalFlag() {
      return this.$store.state.module_global.globalFlag;
    },
    simulationStart() {
      return this.$store.state.module_global.simulationStart;
    }
  },
  watch: {
    htmlHeight() {
      this.resizeChart();
    },
    htmlWidth() {
      this.resizeChart();
    },
    //sid变化后重新刷新数据
    sidFlag(val) {
      this.btnChecked = 1;
      this.SID = val;
      this.creatTimeShare();
    },
    globalFlag(val) {
      /**
       *  val值说明
       *  401 模拟数据完成
       *  501 修复坏数据
       *  502 修复异常数据
       *  503 忽略异常数据
       *   */
      if (val == 401 || val == 501 || val == 502 || val == 503) {
        if (this.btnChecked == 1) {
          if (val == 501 || val == 502 || val == 503) {
            this.creatTimeShare(true); //不同的值message的提示不同
          } else {
            this.creatTimeShare(false);
          }
        } else if (this.btnChecked == 2) {
          switch (this.timeChecked) {
            case 0:
              this.creatKline("D", 0);
              break;
            case 1:
              this.creatKline("W", 1);
              break;
            case 2:
              this.creatKline("M", 2);
              break;
            case 3:
              this.creatKline("A", 3);
              break;
          }
        }
      }
    }
  },
  methods: {
    //图表全屏
    fullScreen() {
      this.$store.commit("set_globalFlag", 201);
    },
    //图表自适应
    resizeChart() {
      if (this.btnChecked == 1 && this.tiemShare != null) {
        this.tiemShare.chart.resize();
      } else if (this.btnChecked == 2 && this.kline != null) {
        this.kline.chart.resize();
      }
    },
    // 坏数据对话框
    dialogSure() {
      this.dialogVisible = false;
      this.$store.commit("set_globalFlag", 5);
    },
    //动态加载图表数据
    updateData(flag) {
      let dataLength = 10; //请求的数据长度
      let line_chartStart = 0;
      //向左
      if (flag == -1) {
        //边界判定，如果小于等于0，line_chartStart会计算为负数
        line_chartStart =
          parseInt(localStorage.getItem("line_chartStart")) - dataLength;
        if (line_chartStart > 0) {
          this.$store.commit("set_loading", true);
          this.sendLineReq(line_chartStart, dataLength);
        } else {
          this.$message({
            type: "waring",
            message: "没有数据了！"
          });
        }
        // 向右
      } else {
        line_chartStart =
          parseInt(localStorage.getItem("line_chartStart")) + dataLength;
        this.$store.commit("set_loading", true);
        this.sendLineReq(line_chartStart, dataLength);
      }
    },
    /**
     * 创建K线图
     * @arg {String} 请求的参数：日-D 周-W 月-M 年-A
     * @active {Number}  按钮当前选中项
     * this.chartData.data的数据结构:[192.75, 251.25, 130, 288, 5298, 57.01, 1, "2015-01-01"]=[K线,K线,K线,K线,柱状图,标识符,时间]
     */
    creatKline(arg, active) {
      this.timeChecked = active;
      this.$store.commit("set_loading", true); //开始动画
      get_kline(arg).then(res => {
        if (res.err_code == 0) {
          this.chartData = res.data;
          this.$store.commit("set_loading", false);
          localStorage.setItem(
            "boxplot_chartStart",
            parseInt(this.chartData.start) + this.count
          );
          let config = {
            id: this.config.id,
            data: this.chartData
          };
          this.kline = new Kline(config);
          this.kline.initDiv(); //调用图表初始化函数
          this.kline.initChart();
          this.watch_Kline(); //监听图表
        } else if (res.err_code == 4002) {
          this.$store.commit("set_loading", false);
          this.dialogVisible = true;
        }
      });
    },
    //创建折线图
    creatTimeShare(bloe) {
      let dataLength = 10; //请求的数据长度
      let line_chartStart = 0;
      if (this.simulationStart != null) {
        line_chartStart = this.simulationStart - 5;
        this.$store.commit("set_simulationStart", null);
      }
      this.$store.commit("set_loading", true);
      this.sendLineReq(line_chartStart, dataLength, bloe);
    },
    //折线图发送请求
    sendLineReq(start, count, bloe) {
      get_timeshare(start, count).then(res => {
        if (res.err_code == 0) {
          console.log(res);
          this.chartData = res.data;
          let config = {
            id: this.config.id,
            data: this.chartData
          };
          this.tiemShare = new TiemShare(config);
          this.$store.commit("set_loading", false);
          if (bloe) {
            this.messageBox();
          }
          localStorage.setItem("line_chartStart", start);
          this.chart_InfoList.max_load = this.chartData.max.toFixed(2);
          this.chart_InfoList.min_load = this.chartData.min.toFixed(2);
          this.chart_InfoList.avg_load = this.chartData.avg.toFixed(2);
          this.tiemShare.initDiv(config);
          this.tiemShare.initChart();
          this.watch_timeShare();
        } else if (res.err_code == 4002) {
          this.$store.commit("set_loading", false);
          this.dialogVisible = true;
        }
      });
    },
    //提示框
    messageBox() {
      if (this.globalFlag == 501 || this.globalFlag == 502) {
        this.$message({
          type: "success",
          message: "修复成功"
        });
      } else {
        this.$message({
          type: "success",
          message: "已忽略"
        });
      }
    },
    //监听K线图图表每个数据项的值
    watch_Kline() {
      let _this = this;
      Object.defineProperty(this.kline, "dataIndex", {
        set: function(val) {
          if (_this.chartData.data[val][6] == 1) {
            _this.chart_InfoList.quantity = `实际电量：${
              _this.chartData.data[val][4]
            }`; //实际电量
            _this.chart_InfoList.mean = `实际负荷：${
              _this.chartData.data[val][5]
            }`; //实际负荷
          } else {
            _this.chart_InfoList.quantity = `模拟电量：${
              _this.chartData.data[val][4]
            }`; //模拟电量
            _this.chart_InfoList.mean = `模拟负荷：${
              _this.chartData.data[val][5]
            }`; //模拟负荷
          }
          _this.chart_InfoList.MA7 = _this.chartData.MA7[val]; //MA7均线
        }
      });
    },
    //监听折线图图表每个数据项的值
    watch_timeShare() {
      let _this = this;
      Object.defineProperty(this.tiemShare, "dataIndex", {
        set: function(val) {
          if (_this.chartData.data[val][3] == 1) {
            _this.chart_InfoList.quantity = `实际电量：${
              _this.chartData.data[val][1]
            }`; //实际电量
            _this.chart_InfoList.mean = `实际负荷：${
              _this.chartData.data[val][0]
            }`; //实际负荷
          } else {
            _this.chart_InfoList.quantity = `模拟电量：${
              _this.chartData.data[val][1]
            }`; //模拟电量
            _this.chart_InfoList.mean = `模拟负荷：${
              _this.chartData.data[val][0]
            }`; //模拟负荷
          }
          // _this.chart_InfoList.MA7 = _this.chartData.MA7[val]; //MA7均线
        }
      });
    },
    //显示分时 or K线图
    handleBtnFn(index) {
      switch (index) {
        case 1:
          this.btnChecked = 1;
          this.creatTimeShare();
          break;
        case 2:
          this.btnChecked = 2;
          this.creatKline("D", 0);
          break;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (localStorage.getItem("SID")) {
        this.SID = localStorage.getItem("SID");
        this.creatTimeShare();
      }
    });
  },
  components: {
    chartInfo,
    dialogBox
  }
};
</script>

<style lang="scss" scoped>
.outputChart-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .wrapper {
    width: 100%;
    height: 100%;
  }
  .warning {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: #ccc;
      font-size: var(--titleSix);
    }
  }
  .check-data-btn {
    position: absolute;
    bottom: 50px;
    left: 50%;
    display: flex;
    .btn-item {
      margin-right: 40px;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;

      cursor: pointer;
      i {
        font-size: 30px;
        color: #ebebeb;
      }
      :hover {
        background: #cdcdcd;
        border-radius: 50%;
      }
    }
  }
}
.chartInfo-wrap {
  height: 70px;
  padding-left: 85px;
  box-sizing: border-box;
  margin-top: 12px;
  cursor: crosshair;
}
.handle-wrap {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 85px;
  box-sizing: border-box;
  font-size: var(--titleSix);
  .handle-btn {
    width: 90px;
    height: 30px;
    line-height: 30px;
    background: rgba(228, 228, 228, 1);
    text-align: center;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
  .btn-checked {
    background: #58edd9;
  }
  .handle-classify {
    width: 240px;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 20px;
    p {
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      &:hover {
        border-bottom: 1px solid var(--systemColor);
      }
    }
    .time-checked {
      border-bottom: 1px solid var(--systemColor);
    }
  }
}
.chart-wrap {
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccd0d6;
}
</style>
