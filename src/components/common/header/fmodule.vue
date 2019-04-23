<template>
  <div class="fmodule" @click.stop>
    <div class="content">
      <div class="top">
        <div class="circle1" @click="skipFileSystem">
          <!-- <i class="iconfont icon-fengdian"></i> -->
          <img
            src="/oplan/img/wpSimluate/风电模拟.svg"
            class="circle1-i1"
          />
          <i class="circle1-i2">风电模拟</i>
        </div>
        <div class="circle2">
          <img
            src="/oplan/img/wpSimluate/配网规划.svg"
            class="circle2-i1"
          />
          <i class="circle2-i2">配网规划</i>
        </div>
        <div class="circle3">
          <img
            src="/oplan/img/wpSimluate/负荷预测.svg"
            class="circle3-i1"
          />
          <i class="circle3-i2">负荷预测</i>
        </div>
        <div class="circle4">
          <!-- <i class="circle4-i1"></i> -->
          <img
            src="/oplan/img/wpSimluate/更多功能.svg"
            class="circle4-i1"
          />
          <i class="circle4-i2">更多功能</i>
        </div>
      </div>

      <div class="bottom">
        <p class="bottom-p">更多应用功能正在开发,敬请期待</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    //跳转文件系统
    skipFileSystem() {
      window.location.href = "/fileSystem.html#/windPower";
    }
  }
};
</script>
<style scoped lang="scss">
.fmodule {
  width: 290px;
  height: 445px;
  .content {
    width: 100%;
    height: 100%;
    background: url("/oplan/img/wpSimluate/更多应用.png") no-repeat;
    border-radius: 9px;
    overflow: hidden;
    .top {
      height: 290px;
      position: relative;
      margin-top: 20px;
      .circle1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 145px;
        height: 145px;
        cursor: pointer;
        .circle1-i1 {
          display: block;
          width: 63px;
          height: 63px;
          position: absolute;
          top: 50%;
          margin-top: -31px;
          right: 50%;
          margin-right: -31px;
        }
        .circle1-i2 {
          font-size: var(--titleSix);
          font-family: Source Han Sans CN;
          font-weight: 300;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          font-style: normal;
          position: absolute;
          top: 120px;
          right: 45px;
        }
      }
      .circle2 {
        width: 145px;
        height: 145px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: not-allowed;
        .circle2-i1 {
          display: block;
          width: 63px;
          height: 63px;

          position: absolute;
          top: 50%;
          margin-top: -31px;
          right: 50%;
          margin-right: -31px;
        }
        .circle2-i2 {
          font-size: var(--titleSix);
          font-family: Source Han Sans CN;
          font-weight: 300;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          font-style: normal;
          position: absolute;
          top: 120px;
          right: 45px;
        }
      }
      .circle3 {
        width: 145px;
        height: 145px;
        position: absolute;
        bottom: 0;
        left: 0;
        cursor: not-allowed;
        .circle3-i1 {
          display: block;
          width: 63px;
          height: 63px;
          position: absolute;
          top: 50%;
          margin-top: -31px;
          right: 50%;
          margin-right: -31px;
        }
        .circle3-i2 {
          font-size: var(--titleSix);
          font-family: Source Han Sans CN;
          font-weight: 300;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          font-style: normal;
          position: absolute;
          top: 120px;
          right: 45px;
        }
      }
      .circle4 {
        width: 145px;
        height: 145px;
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: not-allowed;
        .circle4-i1 {
          display: block;
          width: 63px;
          height: 63px;
          position: absolute;
          top: 50%;
          margin-top: -31px;
          right: 50%;
          margin-right: -31px;
        }
        .circle4-i2 {
          font-size: var(--titleSix);
          font-family: Source Han Sans CN;
          font-weight: 300;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
          font-style: normal;
          position: absolute;
          top: 120px;
          right: 45px;
        }
      }
    }
    .bottom {
      width: 100%;
      .bottom-p {
        font-size: var(--titleSix);
        font-family: Source Han Sans CN;
        font-weight: 300;
        line-height: 24px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        text-align: center;
        margin-top: 50px;
      }
    }
  }
}
</style>
