<template>
  <div class="lineChart-wrap">
    <div class="chart-wrap" :id="config.id"></div>
  </div>
</template>
<script>
import lineChart from "../../../charts/lineChart.js";
export default {
  props: ["config"],
  mounted() {
    this.$nextTick(function() {
      let chartModule = new lineChart(this.config);
      chartModule.initDiv();
      chartModule.initChart();
    });
  }
};
</script>
<style lang="scss" scoped>
.lineChart-wrap {
  width: 100%;
  height: 100%;
  .chart-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
