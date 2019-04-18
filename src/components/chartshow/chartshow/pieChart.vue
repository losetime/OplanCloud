<template>
  <div class="pieChart-wrap">
    <div class="chart-wrap" :id="config.id"></div>
  </div>
</template>
<script>
import pieChart from "../../../charts/pieChart.js";
export default {
  props: ["config"],
  mounted() {
    this.$nextTick(() => {
      let chartModule = new pieChart(this.config);
      chartModule.initDiv();
      chartModule.initChart();
    })
  }
};
</script>
<style lang="scss" scoped>
.pieChart-wrap {
  .chart-wrap {
    width: 100%;
    height: 400px;
  }
}
</style>
