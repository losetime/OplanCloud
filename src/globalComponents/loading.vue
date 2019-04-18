<template>
  <div class="mask">
    <div class="title">
      <span>正在加载中...</span>
    </div>
    <div class="loadStart">
      <div class="face"></div>
      <div class="face"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.mask {
  position: fixed;
  top: 10%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  z-index: 999;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  .title {
    span {
      font-size: 14px;
      line-height: 40px;
    }
  }
  .loadStart {
    width: 2.5em;
    height: 2.5em;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .face {
      position: absolute;
      border-radius: 50%;
      border-style: solid;
      animation: animate 2s linear infinite;
      &:nth-child(1) {
        width: 20px;
        height: 20px;
        color: #ee6014;
        border-color: currentColor transparent transparent currentColor;
        border-width: 1px 1px 0 0;
        animation-direction: normal;
        // &::before {
        //   width: 0.3em;
        //   height: 0.3em;
        //   border-radius: 50%;
        //   content: "";
        //   background-color: #ee6014;
        //   display: block;
        //   position: absolute;
        //   top: 0.59em;
        //   left: 5.1em;
        // }
      }
      &:nth-child(2) {
        width: 10px;
        height: 10px;
        color: #57fccf;
        border-color: currentColor currentColor transparent transparent;
        box-shadow: 0px 0px 1px #57fccf;
        border-width: 1px 0 0 1px;
        --deg: -135deg;
        animation-direction: reverse;
      }
    }
  }
}

@keyframes animate {
  to {
    transform: rotate(1turn);
  }
}
</style>
