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
    <div class="correlation">
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
    <div class="title">随机数种子类型</div>
    <div class="outputWay">
      <el-radio v-model="radioValue1" label="1" class="radio"
        >随机种子</el-radio
      >
      <el-radio v-model="radioValue1" label="2" class="radio"
        >固定种子</el-radio
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue1: "",
      simulatSetupValue: [],
      simulatSetupOptions: ["考虑光伏电站空间相关性", "考虑光伏电站可靠性"],
      radioValue1: "1"
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
  .correlation {
    height: 50px;
    line-height: 50px;
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
