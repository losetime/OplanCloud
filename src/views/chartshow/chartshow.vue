<template>
  <div class="wpSimluate" id="chartshow" @click="globalFlagFn">
    <loadStart v-show="loadingShow == true"></loadStart>
    <div class="header-wrap">
      <div style="height:50px;">
        <Header></Header>
      </div>
      <div class="func-list">
        <div class="func-list-left">
          <div
            :class="{ 'func-item': true, 'func-check': funcCheck == index }"
            v-for="(item, index) of topMenuList"
            :key="index"
            @click="menuCheck(index)"
          >
            <i class="iconfont "></i>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="b-wrap">
      <div class="m-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import systemSet from "../../minxis/systemSet.js";
import header from "../../components/common/header";
import loadStart from "../../globalComponents/loading";
export default {
  data(){
    return {
      topMenuList: ["传统电源", "新能源", "网络", "负荷"],
      funcCheck: 0
    }
  },
  mixins: [systemSet],
  methods: {
    menuCheck(index) {
      this.funcCheck = index;
      switch (index) {
        case 0:
          this.$router.push("/chartshow");
          break;
        case 1:
          this.$router.push("/newEnergy");
          break;
        case 2:
          this.$router.push("/netWork");
          break;
        case 3:
          this.$router.push("/circuit");
          break;
      }
    }
  },
  mounted(){
     let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
     let styles = this.$el.style;
     styles.setProperty("--chartshowHeight",htmlHeight-100+"px");
  },
  components: {
    Header: header,
    loadStart: loadStart
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/global"; //引用这个文件后，可以指定自定义字体
@media screen and (max-width: 1151px) {
  .wpSimluate {
    width: 1152px;
  }
}
@media screen and (min-width: 1152px) {
  .wpSimluate {
    width: 100%;
  }
}

@media screen and (max-height: 863px) {
  .wpSimluate {
    .b-wrap {
      height: 864px;
    }
  }
}
@media screen and (min-height: 864px) {
  .wpSimluate {
    .b-wrap {
      height: var(--chartshowHeight);
    }
  }
}
.wpSimluate {
  height: var(--DomH);
  overflow: hidden;
  font-family: "SourceHanSansSC-Normal";
  .header-wrap {
    width: 100%;
    height: 105px;
    .func-list {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
      font-size: 15px;
      .func-list-left {
        width: 20%;
        display: flex;
        justify-content: flex-start;
        .func-item {
          width: 120px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          cursor: pointer;
          font-size: var(--titleFour);
          color: var(--fontColor);
          &:hover {
            color: #61d2c4;
            border-bottom: 2px solid #61d2c4;
          }
        }
        .func-check {
          color: #61d2c4;
          border-bottom: 2px solid #61d2c4;
        }
      }
    }
  }

  .b-wrap {
    position: relative;
    width: 100%;
    // background-color: #f5f5f5;
    display: flex;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    .m-content {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      // background-color: rgba(189, 196, 203, 1);
      position: relative;
    }
  }
}
</style>
