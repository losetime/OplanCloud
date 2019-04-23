<template>
  <div class="oraitNav-wrap" @click.stop>
    <!-- <img src="./orait.png"> -->
    <ul class="list">
      <li class="list-li-one" @click="windPower">
        <img src="/oplan/img/wpSimluate/风电模拟.svg" />
        <span>风电模拟</span>
      </li>
      <li class="list-li-two">
        <img src="/oplan/img/wpSimluate/光伏模拟.svg" />
        <span>光伏模拟</span>
      </li>
      <li class="list-li-three">
        <img src="/oplan/img/wpSimluate/分布式出力模拟.svg" />
        <span>分布式出力模拟</span>
      </li>
      <li class="list-li-four" @click="trash">
        <i class="iconfont icon-huishouzhan-mian"></i> <span>回收站</span>
      </li>
      <li class="list-li-five">
        <img src="/oplan/img/wpSimluate/云端硬盘.svg" />
        <span>ORAIT云端</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    trash() {
      this.$router.push("/trash");
    },
    windPower() {
      this.$router.push("/windPower");
    }
  }
};
</script>
<style scoped lang="scss">
.oraitNav-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgba(245, 245, 245, 1);
  overflow: hidden;
  .list {
    width: 100%;
    margin-top: 117px;
    li {
      display: flex;
      align-items: center;
      height: 30px;
      padding-left: 50px;
      margin-bottom: 18px;
      white-space: nowrap;
      &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
      }
      img {
        width: 24px;
        height: 30px;
        vertical-align: middle;
      }
      span {
        margin-left: 17px;
        font: var(--titleSix) / 30px "SourceHanSansSC-Normal";
        color: #d9d9d9;
      }
      i {
        font-size: 25px;
        color: #a49691;
      }
      &:first-of-type {
        span {
          color: #554843;
        }
      }
      &:nth-of-type(4) {
        margin-top: 178px;
        span {
          color: #554843;
        }
      }
    }
  }
}
</style>
