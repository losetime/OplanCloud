<template>
  <div id="fileSystem" class="fileSystem-wrap">
    <div class="t-wrap">
      <Header></Header>
    </div>
    <router-view />
  </div>
</template>
<script>
import systemSet from "../../minxis/systemSet.js";
import Header from "../../components/common/header.vue";
export default {
  mixins: [systemSet],
  watch: {
    htmlHeight(val) {
      let styles = this.$el.style;
      styles.setProperty("--tableScrollH", val - 220 + "px");
    }
  },
  components: {
    Header
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/css/reset.css";
@import "../../assets/css/global";
@media screen and (max-width: 1151px) {
  .fileSystem-wrap {
    width: 1152px;
  }
}
@media screen and (min-width: 1152px) {
  .fileSystem-wrap {
    width: 100%;
  }
}
.fileSystem-wrap {
  height: var(--WrapH);
  font-family: "SourceHanSansSC-Normal";
  .t-wrap {
    height: 50px;
  }
  .module {
    width: 100%;
    height: 100%;
  }
}
</style>
