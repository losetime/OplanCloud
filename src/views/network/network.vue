<template>
  <div class="network-wrap">
    <div class="t-wrap">
      <Header></Header>
    </div>
    <router-view class="router" />
  </div>
</template>
<script>
import Header from "../../components/common/header";
import systemSet from "../../minxis/systemSet";
export default {
  mixins: [systemSet],
  components: {
    Header
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/css/reset.css";
@import "../../assets/css/global";
@media screen and (max-width: 1151px) {
  .network-wrap {
    width: 1152px;
  }
}
@media screen and (min-width: 1152px) {
  .network-wrap {
    width: 100%;
  }
}
.network-wrap {
  height: var(--DomH);
  font-family: "SourceHanSansSC-Normal";
  .t-wrap {
    height: 50px;
  }
  .router {
    height: var(--WrapH);
  }
}
</style>
