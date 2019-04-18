<template>
  <div class="wind" id="wind">
    <div class="content_body">
      <div class="func-list">
        <div class="func-list-left">
          <div
            :class="{ 'func-item': true, 'func-check': funcCheck == index }"
            v-for="(item, index) of topMenuList"
            :key="index"
            @click="menuCheck(index)"
          >
            <i class="iconfont "></i>
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="func-list-middle">
          <div class="func-item">
            <i class="iconfont icon-chexiao"></i>
            <span>撤销</span>
          </div>
          <div class="func-item">
            <i class="iconfont icon-ziyuanxhdpi"></i>
            <span>恢复</span>
          </div>
          <div class="func-item">
            <i class="iconfont icon-CombinedShapex"></i>
            <span>修复数据</span>
          </div>
          <div class="func-item">
            <i class="iconfont icon-qingchu"></i>
            <span>清除数据</span>
          </div>
        </div>
        <div class="func-list-right">
          <div class="func-item" @click="openFile">
            <i class="iconfont icon-daoru2"></i>
            <span>导入</span>
          </div>
          <input
            type="file"
            class="importFile"
            style="display:none;"
            accept=".xls,.xlsx,.csv,.et"
            @change="filesIn($event, 'inputData')"
            ref="inputData"
          />
          <div class="func-item">
            <i class="iconfont icon-daochu2"></i>
            <span>导出</span>
          </div>
        </div>
      </div>
      <div class="lengend">
        <!-- <div class="error_data">
          <span></span>
          <p>坏数据</p>
        </div>
        <div class="anomaly_data">
          <span></span>
          <p>异常数据</p>
        </div> -->
      </div>
      <div class="content_body_bottom" ref="bottomWrap">
        <div class="table-wrap">
          <oraitTable
            v-on:getdetailData="getdetailData"
            ref="oraitTable"
            :visibleHeight="visibleHeight"
          ></oraitTable>
        </div>
      </div>
      <div class="secondLevel-menu">
        <div
          v-for="(item, index) of secondLevelMenu[funcCheck]"
          :key="index"
          :class="{ 'secondLevelMenu-check': secondLevelMenuCheck == index }"
          @click="secondLevelMenuSelect(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import oraitTable from "./wind_simulate/oraitTable";
import { uploadFile } from "../../assets/service/wpSimluateService.js";
export default {
  data() {
    return {
      visibleHeight: 0,
      topMenuList: ["传统电源", "新能源", "网络", "负荷"],
      secondLevelMenu: [
        ["水电", "火电", "电源计划", "电源运行模拟"],
        ["风电场", "风电出力", "光伏电站", "光伏出力 "],
        ["变电站", "线路", "电网计划", "电网运行模拟"],
        ["负荷"]
      ],
      funcCheck: 0,
      secondLevelMenuCheck: 0,
      formdata: null,
      jumpChartUrl: {
        funcCheck: 0,
        secondLevelMenu: null,
        secondLevelMenuCheck: 0
      }
    };
  },
  methods: {
    menuCheck(index) {
      this.funcCheck = index;
      //传给header的值
      this.jumpChartUrl.funcCheck = index;
      this.$store.commit("set_jumpChartUrl", this.jumpChartUrl);
    },
    secondLevelMenuSelect(index) {
      this.secondLevelMenuCheck = index;
      //传给header的值
      this.jumpChartUrl.secondLevelMenuCheck = index;
      this.$store.commit("set_jumpChartUrl", this.jumpChartUrl);
    },
    //表格点击后触发
    getdetailData() {
      // console.log(val);
    },
    openFile() {
      this.$refs.inputData.click();
      // if (this.$store.state.module_global.sidFlag) {
      //   this.dialogVisible = true;
      //   this.showBoard = true;
      // } else {
      //   //第一次，直接点击input
      //   this.$refs.inputData.click();
      // }
    },
    filesIn(obj, arg) {
      var files = obj.target.files;
      let type = files[0].name.split(".")[1];
      if (type != "xls" && type != "xlsx" && type != "csv" && type != "et") {
        //置空value值，否则下次相同文件名不会触发change事件
        this.$refs[arg].value = null;
        //提示信息显示
        this.$message({
          type: "error",
          message: "模板格式不正确，请重新导入"
        });
      } else {
        // 实例化FormData 对象
        this.formdata = new FormData();
        //这里的file需要跟后台接收参数保持一致
        this.formdata.append("file", files[0]);
        //置空value值，否则下次相同文件名不会触发change事件
        this.$refs[arg].value = null;
        this.uploadFileFn(this.formdata);
      }
    },
    //上传请求
    uploadFileFn(val) {
      this.$store.commit("set_loading", true);
      uploadFile(val)
        .then(res => {
          if (res.err_code == 0) {
            //在localStorage存储新获得的SID，防止刷新后消失
            localStorage.setItem("SID", res.sid);
            //sid传给vuex被监听，图表和表格watch这个值，如果更新则重新请求
            this.$store.commit("set_sidFlag", res.sid);
            //动画结束
            this.$store.commit("set_loading", false);
          } else if (res.err_code == 3002) {
            //动画结束
            this.$store.commit("set_loading", false);
            this.$message({
              type: "error",
              message: "导入文件不符合模板要求，请重新导入"
            });
          }
        })
        .catch(() => {
          this.$store.commit("set_loading", false);
          //提示
          this.$message({
            type: "error",
            message: "导入文件不符合模板要求，请重新导入"
          });
        });
    }
  },
  mounted() {
    this.jumpChartUrl.secondLevelMenu = this.secondLevelMenu;
    this.$store.commit("set_jumpChartUrl", this.jumpChartUrl);
  },
  components: {
    oraitTable
  }
};
</script>

<style scoped lang="scss">
.wind {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  .content_body {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    .func-list {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
      font-size: 15px;
      .func-list-left {
        width: 20%;
        display: flex;
        justify-content: flex-start;
        .func-item {
          &:hover {
            color: #61d2c4;
            border-bottom: 2px solid #61d2c4;
          }
        }
        .func-check {
          color: #61d2c4;
          border-bottom: 2px solid #61d2c4;
        }
      }
      .func-list-middle {
        display: flex;
        justify-content: flex-end;
        flex-grow: 2;
        .func-item {
          &:hover {
            color: #61d2c4;
          }
        }
      }
      .func-list-left,
      .func-list-middle {
        .func-item {
          width: 120px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          cursor: pointer;
          font-size: var(--titleFour);
          color: var(--fontColor);
        }
      }
      .func-list-right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 0.4;
        .func-item {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-left: 20px;
          cursor: pointer;
          border-radius: 25px;
          font-size: var(--titleFour);
          color: var(--fontColor);
          &:hover {
            background: #61d2c4;
            color: #ffffff;
          }
        }
      }
    }
    .lengend {
      width: 100%;
      height: 5px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      color: var(--fontColor);
      .error_data,
      .anomaly_data {
        display: flex;
        align-items: center;
        margin-right: 10px;
        span {
          margin-right: 2px;
          display: inline-block;
          width: 10px;
          height: 10px;
          background: rgba(239, 120, 134, 1);
        }
      }
      .anomaly_data {
        span {
          background: rgba(84, 187, 231, 1);
        }
      }
    }
    .content_body_bottom {
      width: 100%;
      height: 91%;
      position: relative;
      // box-shadow: 0px 0px 4px 0px rgba(172, 172, 172, 1);
      //表格栏
      .table-wrap {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    }
    .secondLevel-menu {
      width: 100%;
      height: 30px;
      line-height: 30px;
      display: flex;
      div {
        padding: 0 20px;
        border-right: 1px solid rgba(0, 0, 0, 0.2);
        text-align: center;
        cursor: pointer;
        font-size: var(--titleSix);
      }
      .secondLevelMenu-check {
        background: #61d2c4;
        color: #ffffff;
      }
    }
  }
}
</style>
