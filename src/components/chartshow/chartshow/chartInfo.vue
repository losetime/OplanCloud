<template>
  <div class="chartInfo">
    <!-- 第一行信息 -->
    <div class="t-wrap">
      <div class="l-wrap">
        <p class="power-plants-name" v-if="windSiteInfo">
          {{ windSiteInfo.name }}
        </p>
        <p class="fix-load-info">最大负荷：{{ chart_InfoList.max_load }}MW</p>
        <p class="fix-load-info">最小负荷：{{ chart_InfoList.min_load }}MW</p>
        <p class="fix-load-info">平均负荷：{{ chart_InfoList.avg_load }}MW</p>
      </div>
    </div>
    <!-- 第二行信息 -->
    <div class="b-wrap">
      <div class="l-wrap">
        <!-- <p class="trans-load-info">模拟负荷：-MW</p> -->
        <p class="trans-load-info" v-show="chart_InfoList.mean">
          {{ chart_InfoList.mean }}MW
        </p>
        <!-- <p class="trans-load-info" v-show="chart_InfoList.quantity">
          模拟电量：{{ chart_InfoList.quantitySimulation }}MW·h
        </p> -->
        <p class="trans-load-info" v-show="chart_InfoList.quantity">
          {{ chart_InfoList.quantity }}MW·h
        </p>
        <p class="trans-load-info" v-show="chart_InfoList.MA7">
          MA7均线：{{ chart_InfoList.MA7 }}MW
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chart_InfoList: {
      type: Object
    }
  },
  computed: {
    windSiteInfo() {
      return this.$store.state.module_global.windSiteInfo;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.chartInfo {
  width: 100%;
  height: 100%;
}
.t-wrap {
  width: 100%;
  height: 30px;
  .l-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: rgba(85, 72, 67, 1);
    .power-plants-name {
      padding-right: 20px;
      font-size: 18px;
    }
    .fix-load-info {
      padding-right: 20px;
      font-size: 14px;
    }
  }
}
.b-wrap {
  width: 100%;
  height: 30px;
  font-size: 14px;
  .l-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .trans-load-info {
      padding-right: 20px;
      color: rgba(164, 150, 145, 1);
    }
  }
}
</style>
