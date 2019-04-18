<template>
  <div class="ganttChart-wrap">
    <div class="chart-wrap" :id="config.id"></div>
  </div>
</template>
<script>
import GanttChart from "../../../charts/ganttChart.js";
export default {
  props: ["config"],
  mounted() {
    let ganttChart = new GanttChart(this.config);
    ganttChart.initDiv();
    ganttChart.initChart();
  }
};
</script>
<style lang="scss" scoped>
.ganttChart-wrap {
  width: 100%;
  height: 100%;
  .chart-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
