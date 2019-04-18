<template>
  <div class="container">
    <div class="top">
      <div class="top-left-wrap">
        <div>
          <p>迭代收敛精度</p>
          <el-input
            v-model="inputValue1"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >%
        </div>
        <div>
          <p>最大迭代次数</p>
          <el-input
            v-model="inputValue2"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >%
        </div>
      </div>
      <div class="top-right-wrap">
        <div>
          <p>规划期贴现率</p>
          <el-input
            v-model="inputValue3"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >秒
        </div>
        <div>
          <p>最大迭代时间</p>
          <el-input
            v-model="inputValue4"
            size="mini"
            placeholder="请输入内容"
          ></el-input
          >秒
        </div>
      </div>
    </div>
    <div class="plan-course">
      <div>
        <p>规划期系统碳价</p>
        <el-input
          v-model="inputValue5"
          size="mini"
          placeholder="请输入内容"
        ></el-input
        >%
      </div>
      <div>
        <p>规划期系统发电成本</p>
        <el-input
          v-model="inputValue6"
          size="mini"
          placeholder="请输入内容"
        ></el-input
        >%
      </div>
      <div>
        <p>规划期系统碳排放强度</p>
        <el-input
          v-model="inputValue7"
          size="mini"
          placeholder="请输入内容"
        ></el-input
        >%
      </div>
    </div>
    <div class="outputWay-wrap">
      <div class="title">新能源出力方式</div>
      <div class="outputWay">
        <el-radio v-model="newPowerRun" label="1" class="radio"
          >利用新能源出力模拟生成后，聚类形成典型成立</el-radio
        >
        <el-radio v-model="newPowerRun" label="2" class="radio"
          >确定性出力</el-radio
        >
      </div>
      <div>
        <p>新能源低谷出力</p>
        <el-input
          v-model="inputValue8"
          size="mini"
          placeholder="请输入内容"
        ></el-input
        >%
      </div>
      <div>
        <p>新能源高峰出力</p>
        <el-input
          v-model="inputValue9"
          size="mini"
          placeholder="请输入内容"
        ></el-input
        >%
      </div>
      <div>负荷采样方式</div>
      <div class="outputWay">
        <el-radio v-model="loadCollect" label="1" class="radio"
          >时序采样</el-radio
        >
        <el-radio v-model="loadCollect" label="2" class="radio"
          >概率采样</el-radio
        >
      </div>
    </div>
  </div>
</template>

<script>
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
      inputValue9: "0",
      newPowerRun: "1",
      loadCollect: "1"
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .top {
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
  .plan-course {
    width: 40%;
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
  .outputWay-wrap {
    .outputWay {
      height: 50px;
      line-height: 50px;
    }
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
</style>
