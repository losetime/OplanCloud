<template>
  <div class="baddata" @click.stop>
    <i class="iconfont icon-guanbi" @click="closeBadData"></i>
    <div class="data-box">
      <div class="data">
        <div class="fix-data" @click="repair_error">
          <i class="iconfont icon-xiufuhuaishuju"></i> <span>修复坏数据</span>
        </div>
        <div class="abnormal-data" @click="repair_exception">
          <i class="iconfont icon-xiufuyichangshuju"></i>
          <span>修复异常数据</span>
        </div>
        <div class="ignore-data" @click="neglect_exception">
          <i class="iconfont icon-hulveyichangshuju"></i>
          <span>忽略异常数据</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  repair_error,
  repair_exception
} from "../../../assets/service/wpSimluateService.js";

export default {
  data() {
    return {};
  },
  methods: {
    closeBadData() {
      this.$store.commit("set_globalFlag", 0);
    },
    //修复坏数据
    repair_error() {
      repair_error().then(res => {
        if (res.err_code == 0) {
          this.$store.commit("set_globalFlag", 501);
        } else {
          //提示框显示，并显示内容
          this.$store.commit("set_globalFlag", 0);
          this.$message({
            type: "error",
            message: "修复失败，请稍后重试"
          });
        }
      });
    },
    //修复异常数据
    repair_exception() {
      repair_exception().then(res => {
        if (res.err_code == 0) {
          this.$store.commit("set_globalFlag", 502);
        } else {
          this.$store.commit("set_globalFlag", 0);
          this.$message({
            type: "error",
            message: "修复失败，请稍后重试"
          });
        }
      });
    },
    //忽略异常数据
    neglect_exception() {
      this.$store.commit("set_globalFlag", 503);
    }
  }
};
</script>

<style scoped lang="scss">
.baddata {
  width: 240px;
  height: 200px;
  i.icon-guanbi {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    color: #fff;
  }
  .data-box {
    background: url("/oplan/img/wpSimluate/实际数据.png") no-repeat;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    overflow: hidden;
    .data {
      margin: 46px 47px;
      .fix-data,
      .abnormal-data,
      .ignore-data {
        width: 147px;
        height: 28px;
        background-color: #fff;
        margin-bottom: 12px;
        line-height: 28px;
        display: flex;
        padding-left: 14px;
        box-sizing: border-box;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        cursor: pointer;
        i,
        span {
          line-height: 28px;
          font-size: var(--titleSix);
          font-family: "Source Han Sans CN";
          font-weight: 400;
        }
        i {
          margin-right: 20px;
          color: #707070;
          font-size: var(--titleSix);
        }
        &:hover {
          color: #f57e51;
          i {
            color: #f57e51;
          }
        }
      }
      .fix-data {
        margin-top: 12px;
      }
    }
  }
}
</style>
