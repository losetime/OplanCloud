<template>
  <div class="download-wrap">
    <div class="newFile" @click="openNew">
      <i class="iconfont icon-jiahao"></i> <span>新增</span>
    </div>
    <div class="down15" @click="downLoad">
      <i class="iconfont icon-xiazai"></i> <span>下载15分钟模板</span>
    </div>
    <div class="down30">
      <i class="iconfont icon-xiazai"></i> <span>下载30分钟模板</span>
    </div>
    <div class="down60">
      <i class="iconfont icon-xiazai"></i> <span>下载60分钟模板</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    downLoad() {
      window.location.href = `${
        process.env.VUE_APP_wpSimluateURL
      }/file?file=template/ORAIT风电模板(15分钟).xlsx`;
    },
    openNew() {
      window.location.href = "/wpSimluate.html#/wind_simulate";
      localStorage.removeItem("SID");
    }
  }
};
</script>
<style lang="scss">
$color: #f57e51;
@mixin hover {
  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    transform: translateY(-5px);
    border: 3px solid #61d2c4;
  }
}
.download-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  div {
    width: 16.8%;
    height: 149px;
    margin: 0 15px;
    transition: transform 0.5s;
    box-sizing: border-box;
    cursor: pointer;
    @include hover;
    i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 53px;
      margin: 20px auto;
      color: $color;
      font-size: 80px;
    }
    span {
      display: block;
      font: var(--titleSix) "SourceHanSansSC-Normal";
      color: #fff;
      text-align: center;
    }
  }
  div.newFile {
    background: url("/oraitStatic/img/wpSimluate/新增.png") no-repeat;
    background-size: 102% 100%;
    border: 1px solid $color;
    @include hover;
    .icon-jiahao {
      color: #ffffff;
    }
  }
  div.down15 {
    background: url("/oraitStatic/img/wpSimluate/下载15分钟模板.png") no-repeat;
    background-size: 102% 100%;
    border: 1px solid $color;
    @include hover;
  }
  div.down30 {
    background: url("/oraitStatic/img/wpSimluate/下载30分钟模板.png") no-repeat;
    background-size: 102% 100%;
    border: 1px solid #dedede;
    i {
      color: #d9d9d9;
    }
  }
  div.down60 {
    background: url("/oraitStatic/img/wpSimluate/下载60分钟模板.png") no-repeat;
    background-size: 102% 100%;
    border: 1px solid #dedede;
    i {
      color: #d9d9d9;
    }
  }
}
</style>
