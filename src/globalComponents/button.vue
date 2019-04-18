<template>
  <div id="button-wrap">
    <button
      @mouseenter="lightBgcolor"
      @mouseleave="bgcolor"
      @mousedown="mask"
      @mouseup="delMask"
      @click="callback"
      ref="button"
    >
      <span>默认按钮</span>
    </button>
  </div>
</template>
<script>
export default {
  props: ["btnColor"],
  data() {
    return {};
  },
  methods: {
    lightBgcolor() {
      this.$refs.button.style.backgroundColor =
        this.btnColor == null ? "red" : this.btnColor;
    },
    bgcolor() {
      this.$refs.button.style.backgroundColor = "transparent";
    },
    mask() {
      this.$refs.button.style.backgroundColor =
        this.btnColor == null ? "red" : this.btnColor;
      this.$refs.button.style.opacity = "0.5";
    },
    delMask() {
      this.$refs.button.style.backgroundColor =
        this.btnColor == null ? "red" : this.btnColor;
      this.$refs.button.style.opacity = "1";
    },
    callback(e) {
      e = event || window.event;
      e.preventDefault();
      this.$emit("callback");
    }
  }
};
</script>
<style lang="scss">
#button-wrap {
  width: 200px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  button {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
