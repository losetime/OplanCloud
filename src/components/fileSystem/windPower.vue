<template>
  <div class="windPower" id="windPower" @click="globalFlagFn">
    <loadStart v-show="loadingShow == true"></loadStart>
    <div class="title-wrap">
      <div class="title-content">
        <div class="title-item" @click="goNewFile">
          <i class="iconfont iconjiahao-xian"></i>
          <span>新建方案</span>
        </div>
        <div class="title-item" @click="goTrash">
          <i class="iconfont iconshanchu-xian"></i>
          <span>回收站</span>
        </div>
      </div>
    </div>
    <div class="b-wrap">
      <div class="recentOpen-wrap">
        <recentOpen></recentOpen>
      </div>
    </div>
    <i
      class="feedbackIcon iconfont iconfankui-xian"
      @click.stop="change_globalFlag(8, -8)"
    ></i>
    <feedback class="feedback" v-show="globalFlag == 8"></feedback>
  </div>
</template>

<script>
import loadStart from "../../globalComponents/loading"; //加载动画
import recentOpen from "../../components/fileSystem/recentOpen";
import feedback from "../../components/common/sideBar/feedback";
export default {
  data() {
    return {};
  },
  computed: {
    globalFlag() {
      return this.$store.state.module_global.globalFlag;
    },
    loadingShow() {
      return this.$store.state.module_global.loadingShow;
    }
  },
  methods: {
    globalFlagFn() {
      this.$store.commit("set_globalFlag", 0);
    },
    change_globalFlag(show, hide) {
      if (this.globalFlag == show) {
        this.$store.commit("set_globalFlag", hide);
      } else {
        this.$store.commit("set_globalFlag", show);
      }
    },
    goNewFile() {
      window.location.href = "/wpSimluate.html#/wind_simulate";
    },
    goTrash() {
      this.$router.push("/trash");
    }
  },
  components: {
    loadStart,
    recentOpen,
    feedback
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/global";
#windPower {
  position: relative;
  width: 100%;
  height: var(--WrapH);
  overflow: hidden;
  .m-wrap {
    height: 210px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
  }
  .title-wrap {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .title-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      width: 72%;
      border-bottom: 1px solid #000;
      .title-item {
        display: flex;
        align-items: center;
        color: #554843;
        cursor: pointer;
        .iconfont {
          font-size: 28px;
        }
        span {
          font-size: var(--titleFour);
        }
      }
    }
  }
  .b-wrap {
    width: 100%;
    height: var(--DomH);
    overflow: auto;
    .recentOpen-wrap {
      width: 100%;
      margin: 30px auto 0;
    }
  }
  .feedbackIcon {
    position: absolute;
    bottom: 42px;
    right: 26px;
    font: var(--iconTwo) "SourceHanSansSC-Normal";
    cursor: pointer;
    color: #58edd9;
  }
  .feedback {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
}
</style>
