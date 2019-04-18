<template>
  <div id="login" class="login-wrap">
    <div class="module"><router-view /></div>
  </div>
</template>
<script>
import systemSet from "../../minxis/systemSet.js";
export default {
  mixins: [systemSet]
};
</script>
<style scoped lang="scss">
@import "../../assets/css/reset.css";
@import "../../assets/css/global";
@media screen and (max-width: 1280px) {
  .login-wrap {
    width: 1152px;
  }
}
@media screen and (min-width: 1280px) {
  .login-wrap {
    width: 100%;
  }
}
.login-wrap {
  height: var(--DomH);
  font-family: "SourceHanSansSC-Normal";
  .module {
    width: 100%;
    height: 100%;
  }
}
</style>
