<template>
  <div class="container">
    <div class="title">优化目标</div>
    <div class="outputWay">
      <el-radio v-model="costMin" label="1" class="radio"
        >运行成本最低</el-radio
      >
      <el-radio v-model="costMin" label="2" class="radio"
        >购电成本最低</el-radio
      >
    </div>
    <div class="positiveSpare">
      <el-checkbox v-model="positiveReady" style="display:block;margin:10px 0;"
        >系统正备用</el-checkbox
      >
      <div>
        <el-input
          v-model="inputValue1"
          size="mini"
          placeholder="请输入内容"
          style="width:100px;"
        ></el-input
        >%
      </div>
    </div>
    <div class="outputWay">
      <el-radio v-model="radioValue1" label="1" class="radio">全系统</el-radio>
      <el-radio v-model="radioValue1" label="2" class="radio"
        >每台机组</el-radio
      >
    </div>
    <div class="positiveSpare">
      <el-checkbox v-model="minusReady" style="display:block;margin:10px 0;"
        >系统负备用</el-checkbox
      >
      <div>
        <el-input
          v-model="inputValue2"
          size="mini"
          placeholder="请输入内容"
          style="width:100px;"
        ></el-input
        >%
      </div>
    </div>
    <div class="positiveSpare">
      <el-checkbox v-model="lineConstraint" style="display:block;margin:10px 0;"
        >考虑线路约束</el-checkbox
      >
    </div>
    <div class="positiveSpare">
      <el-checkbox v-model="areaConstraint" style="display:block;margin:10px 0;"
        >考虑断面约束</el-checkbox
      >
    </div>
    <div class="positiveSpare">
      <p>平均网损率</p>
      <div>
        <el-input
          v-model="inputValue3"
          size="mini"
          placeholder="请输入内容"
          style="width:100px;"
        ></el-input
        >%
      </div>
    </div>
    <div class="title">负荷类型</div>
    <div class="outputWay">
      <el-radio v-model="radioValue2" label="1" class="radio"
        >发电负荷</el-radio
      >
      <el-radio v-model="radioValue2" label="2" class="radio"
        >供电负荷</el-radio
      >
    </div>
    <div class="title">抽蓄工作方式</div>
    <div class="outputWay">
      <el-radio v-model="radioValue3" label="1" class="radio"
        >平抽定制</el-radio
      >
      <el-radio v-model="radioValue3" label="2" class="radio"
        >满抽定制</el-radio
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      costMin: "1",
      positiveReady: true,
      radioValue1: "1",
      radioValue2: "1",
      radioValue3: "1",
      minusReady: true,
      inputValue1: "",
      inputValue2: "",
      inputValue3: "",
      lineConstraint: false,
      areaConstraint: false
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .outputWay {
    height: 50px;
    line-height: 50px;
  }
  .title {
    font-size: 15px;
    height: 50px;
    line-height: 50px;
  }
  .positiveSpare {
    width: 18%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
}
</style>
