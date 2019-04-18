<template>
  <div class="actualData">
    <div class="top"><i class="iconfont icon-guanbi"></i></div>
    <div class="bottom">
      <div class="content" v-if="windSiteInfo">
        <p>
          编号 <span>{{ windSiteInfo.code }}</span>
        </p>
        <p>
          分辨率 <span>{{ windSiteInfo.ev }}</span>
        </p>
        <p>
          切入风速 <span>{{ windSiteInfo.v_in }}</span>
        </p>
        <p>
          切出风速 <span>{{ windSiteInfo.v_out }}</span>
        </p>
        <p>
          额定功率 <span>{{ windSiteInfo.p_rate }}</span>
        </p>
        <p>
          装机容量 <span>{{ windSiteInfo.capacity }}</span>
        </p>
        <p>
          纬度 <span>{{ windSiteInfo.lon }}</span>
        </p>
        <p>
          经度 <span>{{ windSiteInfo.alt }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { get_windSiteInfo } from "../../../assets/service/wpSimluateService.js";
export default {
  computed: {
    sidFlag() {
      return this.$store.state.module_global.sidFlag;
    },
    windSiteInfo() {
      return this.$store.state.module_global.windSiteInfo;
    }
  },
  watch: {
    sidFlag() {
      get_windSiteInfo().then(res => {
        if (res.err_code == 0) {
          this.$store.commit("set_windSiteInfo", res.data);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.actualData {
  width: 240px;
  height: 260px;
  .top {
    width: 100%;
    height: 30px;
    background: url("/oraitStatic/img/wpSimluate/实际数据.png") no-repeat;
    position: relative;
    i {
      position: absolute;
      top: 8px;
      left: 215px;
      color: #fff;
      cursor: pointer;
    }
  }
  .bottom {
    width: 100%;
    height: 230px;
    background-color: #f3f3f2;
    overflow: hidden;
    .content {
      width: 170px;
      height: 200px;
      margin: 14px 35px;
      p {
        white-space: nowrap;
        width: 100%;
        height: 25px;
        line-height: 25px;
        box-sizing: border-box;
        border-bottom: 1px dashed #f57e51;
        font-size: var(--titleSix);
        padding: 0 10px 0 10px;
        color: #554843;
        display: flex;
        justify-content: space-between;
        span {
          color: #a49691;
        }
      }
    }
  }
}
</style>
