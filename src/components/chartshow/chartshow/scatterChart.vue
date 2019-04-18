<template>
  <div class="scatterChart-wrap">
    <div class="chart-wrap" :id="config.id"></div>
  </div>
</template>
<script>
import scatterChart from "../../../charts/scatterChart.js";
export default {
  props: ["config"],
  mounted() {
    this.$nextTick(() => {
      let chartModule = new scatterChart(this.config);
      chartModule.initDiv();
      chartModule.initChart();
    });
  }
};
</script>
<style lang="scss" scoped>
.scatterChart-wrap {
  .chart-wrap {
    width: 100%;
    height: 400px;
  }
}
</style>
