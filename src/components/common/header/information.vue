<template>
  <div class="information" @click.stop>
    <div class="top">
      <!-- <canvas id="top-bkg" width="290px" height="159px"></canvas> -->
      <div class="top-t">
        <div class="top-t-i1">
          <img src="/oraitStatic/img/wpSimluate/男头.png" class="top-t-img" />
        </div>
        <i class="top-t-i2" v-if="userInfo != null">{{ userInfo.username }}</i>
        <i class="top-t-i3" v-if="userInfo != null">{{ userInfo.org_name }}</i>
      </div>
      <div class="top-b">
        <div>
          <i class="top-b-i1">权限功能</i>
          <i class="iconfont icon-fengdian"></i>
        </div>
      </div>
    </div>
    <div class="bottom">
      <!-- <p class="setting">

        <i class="iconfont icon-shezhi"></i> <span>账户设置</span>

      </p> -->
      <p class="loginout" @click="log_out">
        <i class="iconfont icon-dengchu"></i> <span>登出</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    log_out() {
      /**
       * 退出登录时需要做的事情：
       * 1.清除refresh_token
       * 2.清除SID
       */
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("SID");
      window.location.href = "/login.html#/login";
    }
  },
  mounted: function() {
    // var c = document.getElementById("top-bkg");
    // var ctx = c.getContext("2d");
    // ctx.beginPath();
    // ctx.rect(0, 0, 290, 159);
    // var bgc2 = ctx.createLinearGradient(0, 0, 0, 60);
    // bgc2.addColorStop(0, "rgba(254,126,93,1)");
    // bgc2.addColorStop(0.25, "rgba(250,153,88,1)");
    // bgc2.addColorStop(0.75, "rgba(250,154,88,1)");
    // bgc2.addColorStop(1, "rgba(245,126,81,1)");
    // ctx.fillStyle = bgc2;
    // ctx.fill();
    // ctx.beginPath();
    // ctx.moveTo(0, 130);
    // ctx.bezierCurveTo(100, 132, 60, 65, 290, 30);
    // ctx.lineTo(290, 0);
    // ctx.lineTo(0, 0);
    // ctx.closePath();
    // var bgc = ctx.createLinearGradient(0, 0, 0, 130);
    // bgc.addColorStop(0, "rgba(238,4,52,.4)");
    // bgc.addColorStop(1, "rgba(239,56,56,.4)");
    // ctx.fillStyle = bgc;
    // ctx.fill();
    // // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(0, 30);
    // ctx.lineTo(290, 60);
    // ctx.lineTo(290, 0);
    // ctx.lineTo(0, 0);
    // ctx.closePath();
    // var bgc1 = ctx.createLinearGradient(0, 0, 0, 60);
    // bgc1.addColorStop(0, "rgba(234,85,6,.5)");
    // bgc1.addColorStop(1, "rgba(239,56,56,.5)");
    // ctx.fillStyle = bgc1;
    // ctx.fill();
  }
};
</script>
<style scoped lang="scss">
.information {
  width: 290px;
  box-sizing: border-box;
  .top {
    width: 290px;
    height: 175px;
    background: linear-gradient(to top, #f8dacb, #58edd9);
    border-radius: 10px 10px 0px 0px;
    position: relative;

    #top-bkg {
      position: absolute;
      top: 16px;
      left: 0;
      border-radius: 10px 10px 0 0;
      overflow: hidden;
    }
    .top-t {
      height: 100px;
      width: 100%;
      position: relative;
      .top-t-i1 {
        width: 60px;
        height: 60px;
        background: rgba(245, 245, 245, 1);
        border-radius: 50%;
        opacity: 1;
        position: absolute;
        top: 40px;
        left: 20px;
        .top-t-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .top-t-i2 {
        font-size: var(--titleSeven);
        font-family: "SourceHanSansSC-Normal";
        font-weight: 500;
        line-height: 31px;
        color: rgba(245, 245, 245, 1);
        opacity: 1;
        position: absolute;
        top: 50px;
        left: 100px;
        font-style: normal;
      }
      .top-t-i3 {
        font-size: var(--titleSix);
        font-family: "SourceHanSansSC-Normal";
        font-weight: 500;
        line-height: 31px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        position: absolute;
        top: 70px;
        left: 100px;
        font-style: normal;
      }
    }
    .top-b {
      height: 75px;
      width: 100%;
      position: relative;
      .top-b-i1 {
        font-size: var(--titleSeven);
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: rgba(245, 245, 245, 1);
        opacity: 1;
        position: absolute;
        top: 10px;
        left: 20px;
        font-style: normal;
      }
      .icon-fengdian {
        font-size: 35px;
        color: white;
        position: absolute;
        top: 30px;
        left: 25px;
      }
    }
  }
  .bottom {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    background-color: #fff;
    p {
      display: flex;
      align-items: center;
      padding: 0 0 0 104px;
      margin: 0;
      height: 50px;
      font-size: var(--titleSix);
      font-family: "SourceHanSansSC-Normal";
      cursor: pointer;
      i {
        margin-right: 10px;
        font-size: var(--iconThree);
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &:first-of-type {
        i {
          color: #cbc1bd;
        }
        span {
          color: #554843;
        }
      }
      &:last-of-type {
        i {
          color: #f57e51;
        }
        span {
          color: #554843;
        }
      }
    }
  }
}
</style>
