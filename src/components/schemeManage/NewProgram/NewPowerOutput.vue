<template>
  <div class="container">
    <div class="top-wrap">
      <div class="top-left-wrap">
        <div>
          <p>贴现率</p>
          <el-input
            v-model="inputValue1"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >%
        </div>
        <div>
          <p>正备用率</p>
          <el-input
            v-model="inputValue2"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >%
        </div>
        <div>
          <p>负备用率</p>
          <el-input
            v-model="inputValue3"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >%
        </div>
        <div>
          <p>平均网损率</p>
          <el-input
            v-model="inputValue4"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >%
        </div>
      </div>
      <div class="top-right-wrap">
        <div>
          <p>最大迭代次数</p>
          <el-input
            v-model="inputValue5"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >秒
        </div>
        <div>
          <p>最大计算时间</p>
          <el-input
            v-model="inputValue6"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >秒
        </div>
        <div>
          <p>整数计算间隙</p>
          <el-input
            v-model="inputValue7"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >%
        </div>
        <div>
          <p>谷荷时段出力</p>
          <el-input
            v-model="inputValue8"
            size="mini"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="title">运行约束方式</div>
    <div class="constraintWay">
      <el-radio v-model="constraintWay" label="1" class="radio"
        >全时段</el-radio
      >
      <el-radio v-model="constraintWay" label="2" class="radio"
        >典型日</el-radio
      >
    </div>
    <div class="yearSelect-wrap">
      <el-radio v-model="extremum" label="1" class="yearSelect-item"
        >年最大最小负荷日</el-radio
      >
      <el-radio v-model="extremum" label="2" class="yearSelect-item"
        >月最大最小负荷日</el-radio
      >
      <el-radio v-model="extremum" label="3" class="yearSelect-item"
        >指定日期</el-radio
      >
      <el-date-picker
        v-model="dateValue"
        type="date"
        size="mini"
        placeholder="选择日期"
      >
      </el-date-picker>
    </div>
    <div class="title">可再生能源运行方式</div>
    <el-checkbox-group v-model="aimulateSetup">
      <el-checkbox
        v-for="item in aimulateOptions"
        :label="item"
        :key="item"
        style="height:50px;line-height:50px;float:left;margin-right:50px;"
        >{{ item }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
</template>

<script>
// import {newPowerOutputMenu} from "../../../../assets/js/server/mainNetworkPalnService.js";
export default {
  data() {
    return {
      inputValue1: "0",
      inputValue2: "0",
      inputValue3: "0",
      inputValue4: "0",
      inputValue5: "0",
      inputValue6: "0",
      inputValue7: "0",
      inputValue8: "0",
      constraintWay: "1",
      extremum: "1",
      dateValue: "",
      // 模拟设置
      aimulateSetup: ["聚类后典型出力"],
      aimulateOptions: [
        "聚类后典型出力",
        "确定性出力",
        "考虑运行维护成本",
        "考虑总煤耗约束"
      ]
    };
  },
  async mounted() {
    // this.checkAreaOptions = await newPowerOutputMenu();
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .top-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .top-left-wrap,
    .top-right-wrap {
      &:first-child {
        margin-right: 200px;
      }
      width: 20%;
      div {
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 15px;
        p {
          width: 80%;
        }
      }
    }
  }
  .title {
    font-size: 15px;
    height: 50px;
    line-height: 50px;
  }
  .constraintWay {
    height: 50px;
    line-height: 50px;
  }
  .yearSelect-wrap {
    width: 50%;
    height: 150px;
    background: #f9fefe;
    border: 1px solid #e9eded;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 40px;
    box-sizing: border-box;
    .yearSelect-item {
      display: block;
      margin: 0;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      .title {
        font-size: 14px;
        margin-right: 10px;
      }
      .selectTime {
        width: 80px;
      }
    }
  }
}
</style>
