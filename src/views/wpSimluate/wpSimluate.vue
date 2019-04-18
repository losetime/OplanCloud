<template>
  <div class="wpSimluate" id="wpSimluate" @click="globalFlagFn">
    <loadStart v-show="loadingShow == true"></loadStart>
    <div class="header-wrap">
      <Header></Header>
    </div>
    <div class="b-wrap">
      <div class="m-content">
        <router-view />
        <transition name="baddata-fade">
          <baddata class="baddata" v-show="globalFlag == 5"></baddata>
        </transition>
        <transition name="feedback-fade">
          <feedback v-show="globalFlag == 8"></feedback>
        </transition>
        <transition name="parameter-fade">
          <parameter
            class="parameter-wrap"
            :showParam="true"
            :title="parameterTitle"
            @startSimluate="startSimluate"
            v-show="globalFlag == 4"
            ref="parameter"
          ></parameter>
        </transition>
        <transition name="actualData-fade">
          <actualData
            class="actualData-wrap"
            v-show="globalFlag == 6"
          ></actualData>
        </transition>
      </div>
      <div class="r-content">
        <el-tooltip
          class="item"
          effect="dark"
          content="出力模拟"
          placement="left"
          :hide-after="3000"
        >
          <i class="iconfont icon-baobiaoguanli" @click.stop="isjumpChartUrl && change_globalFlag(4, -4)">
            <i class="line"></i>
          </i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="反馈"
          placement="top"
          :hide-after="3000"
        >
          <i
            class="iconfont icon-xiaoxi" style="display:none;"
            @click.stop="change_globalFlag(8, -8)"
          ></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>

import header from "../../components/common/header";
//反馈
import feedback from "../../components/common/sideBar/feedback";
//开始模拟
import parameter from "../../components/common/sideBar/parameter";
import loadStart from "../../globalComponents/loading";
import { start_parameter } from "../../assets/service/wpSimluateService.js";
import systemSet from "../../minxis/systemSet";
export default {
  data() {
    return {
      parameterTitle: ["模拟开始时间", "模拟结束时间", "开始模拟"]
    };
  },
  mixins:[systemSet],
  computed:{
    isjumpChartUrl(){
      let jumpChartUrl = this.$store.state.module_global.jumpChartUrl;
      if(jumpChartUrl.funcCheck == 1 && (jumpChartUrl.secondLevelMenuCheck == 1 || jumpChartUrl.secondLevelMenuCheck == 3)){
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    globalFlagFn() {
      this.$store.commit("set_globalFlag", 0);
    },
    //控制菜单的隐藏显示
    change_globalFlag(show, hide) {
      if (this.globalFlag == show) {
        this.$store.commit("set_globalFlag", hide);
      } else {
        this.$store.commit("set_globalFlag", show);
      }
    },
    startSimluate(endDate) {
      start_parameter(endDate).then(res => {
        if (res.err_code == 0) {
          //会返回一个simulationStart
          this.$store.commit("set_simulationStart", res.data.simulationStart);
          this.$refs.parameter.successCallback();
        } else {
          this.$refs.parameter.errorCallback();
          this.$message({
            type: "error",
            message: "模拟失败，请稍后重试"
          });
        }
      });
    }
  },
  components: {
    Header: header,
    feedback: feedback,
    parameter: parameter,
    loadStart: loadStart
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/global"; //引用这个文件后，可以指定自定义字体
@media screen and (max-width: 1499px) {
  .b-wrap {
    .m-content {
      width: 97%;
    }
  }
}
@media screen and (min-width: 1500px) {
  .b-wrap {
    .m-content {
      width: 97%;
    }
  }
}
@media screen and (max-width: 1151px) {
  .wpSimluate {
    width: 1152px;
  }
}
@media screen and (min-width: 1152px) {
  .wpSimluate {
    width: 100%;
  }
}

@media screen and (max-height: 863px) {
  .wpSimluate {
    .b-wrap {
      height: 864px;
    }
  }
}
@media screen and (min-height: 864px) {
  .wpSimluate {
    .b-wrap {
      height: var(--WrapH);
    }
  }
}
.wpSimluate {
  height: 100%;
  overflow: hidden;
  font-family: "SourceHanSansSC-Normal";
  .header-wrap {
    width: 100%;
    height: 50px;
  }

  .b-wrap {
    position: relative;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    position: relative;
    .l-content {
      height: 100%;
      width: 220px;
      background-color: #fff;
      border-right: 1px solid rgba(172, 172, 172, 0.2);
    }
    .m-content {
      height: 100%;
      background-color: #ffffff;
      position: relative;
      .parameter-fade-enter-active {
        transition: all 0.3s ease;
      }
      .parameter-fade-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .parameter-fade-enter,
      .parameter-fade-leave-to {
        width: 0;
      }
      .feedback-fade-enter-active {
        transition: all 0.3s ease;
      }
      .feedback-fade-leave-active {
        transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .feedback-fade-enter,
      .feedback-fade-leave-to {
        width: 0;
      }
      .parameter-content {
        position: absolute;
        right: 5px;
        top: 5px;
        background-color: #f3f3f2;
        // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
        z-index: 10000;
      }
      .actualData-wrap {
        position: absolute;
        right: 5px;
        top: 5px;
        // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
        z-index: 10000;
      }
      .box {
        position: absolute;
        right: 5px;
        bottom: 5px;
        z-index: 10000;
      }
    }
    .r-content {
      height: 100%;
      width: 60px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      border-left: 1px solid rgba(172, 172, 172, 0.2);
      i {
        display: block;
        font-size: var(--iconTwo);
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        color: var(--fontColor);
        i.line {
          width: 40px;
          height: 1px;
          display: block;
          background-color: #a49691;
          position: absolute;
          bottom: 0;
        }
        &:hover {
          background-color: #f5f5f5;
          color: var(--systemColor);
        }
        &:last-of-type {
          //反馈位置,待改动位置
          position: absolute;
          bottom: 40px;
          color: var(--systemColor);
        }
      }
    }
  }
}
</style>
