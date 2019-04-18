<template>
  <div class="container">
    <div class="simluateNum">
      <p class="title">模拟场景数</p>
      <el-input
        v-model="inputValue1"
        size="mini"
        placeholder="请输入内容"
        style="width:100px;"
      ></el-input>
    </div>
    <div class="title">风机曲线模式</div>
    <div class="outputWay">
      <el-radio v-model="radioValue1" label="1" class="radio"
        >三次曲线型</el-radio
      >
      <el-radio v-model="radioValue1" label="2" class="radio">直线型</el-radio>
    </div>
    <div class="simluateNum title">
      <p class="title">平均风速调整量</p>
      <div>
        <el-input
          v-model="inputValue2"
          size="mini"
          placeholder="请输入内容"
          style="width:100px;"
        ></el-input
        >m/s
      </div>
    </div>
    <div class="title">预测误差概率分布类型</div>
    <div class="outputWay">
      <el-radio v-model="radioValue2" label="1" class="radio"
        >出力预测误差服从正态分布</el-radio
      >
      <el-radio v-model="radioValue2" label="2" class="radio"
        >风俗预测误差服从正太分布</el-radio
      >
    </div>
    <div class="title">预测误差一致性</div>
    <div class="outputWay">
      <el-radio v-model="radioValue3" label="1" class="radio"
        >各时段预测误差标准差相同</el-radio
      >
      <el-radio v-model="radioValue3" label="2" class="radio"
        >各时段预测误差逐渐增加</el-radio
      >
    </div>
    <div class="title">随机数种子类型</div>
    <div class="outputWay">
      <el-radio v-model="radioValue4" label="1" class="radio"
        >随机种子</el-radio
      >
      <el-radio v-model="radioValue4" label="2" class="radio"
        >固定种子</el-radio
      >
    </div>

    <div class="left">
      <div class="title">可再生能源运行方式</div>
      <el-checkbox-group v-model="simulatSetupValue">
        <el-checkbox
          v-for="item in simulatSetupOptions"
          :label="item"
          :key="item"
          style="float:left;margin-right:50px;"
          >{{ item }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioValue1: "1",
      radioValue2: "1",
      radioValue3: "1",
      radioValue4: "1",
      inputValue1: "",
      inputValue2: "",
      lineConstraint: false,
      areaConstraint: false,
      simulatSetupValue: [],
      simulatSetupOptions: [
        "考虑光伏电站空间相关性",
        "考虑风电尾流效应",
        "考虑光伏电站可靠性",
        "考虑风速日特性"
      ]
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
  .simluateNum {
    height: 50px;
    display: flex;
    align-items: center;
    p {
      margin-right: 40px;
    }
  }
}
</style>
