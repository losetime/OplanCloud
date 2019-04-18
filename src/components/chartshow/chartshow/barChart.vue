<template>
  <div class="barChart-wrap">
    <div class="chart-wrap" :id="config.id"></div>
  </div>
</template>
<script>
import barChart from "../../../charts/barChart.js";
export default {
  props: ["config"],
  mounted() {
    this.$nextTick(function() {
      let chartModule = new barChart(this.config);
      chartModule.initDiv();
      chartModule.initChart();
    });
  }
};
</script>
<style lang="scss" scoped>
.barChart-wrap {
  width: 100%;
  height: 100%;
  .chart-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
