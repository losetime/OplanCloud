<template>
  <div class="mask">
    <div class="loadStart">
      <div class="face"><div class="circle"></div></div>
      <div class="face"><div class="circle"></div></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.mask {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .loadStart {
    width: 5em;
    height: 5em;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
    .face {
      position: absolute;
      border-radius: 50%;
      border-style: solid;
      animation: animate 2s linear infinite;
      .circle {
        position: absolute;
        width: 50%;
        height: 1px;
        top: 45%;
        left: 45%;
        background-color: transparent;
        transform: rotate(var(--deg));
        transform-origin: left;
      }
      &:nth-child(1) {
        width: 120%;
        height: 120%;
        color: #ee6014;
        border-color: currentColor transparent transparent currentColor;
        border-width: 0.3em 0.3em 0em 0em;
        --deg: -45deg;
        animation-direction: normal;
        &::before {
          width: 0.3em;
          height: 0.3em;
          border-radius: 50%;
          content: "";
          background-color: #ee6014;
          display: block;
          position: absolute;
          top: 0.59em;
          left: 5.1em;
        }
      }
      &:nth-child(2) {
        width: 70%;
        height: 70%;
        color: #57fccf;
        border-color: currentColor currentColor transparent transparent;
        box-shadow: 0px 0px 1px #57fccf;
        border-width: 0.1em 0em 0em 0.1em;
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
