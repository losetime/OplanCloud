<template>
  <div id="radio-wrap">
    <div
      class="bigBox"
      @click="checked"
      @mouseenter="hoverColor"
      @mouseleave="overColor"
      ref="bigBox"
    >
      <div class="smallBox"></div>
    </div>
    <span @click="checked" @mouseenter="hoverColor" @mouseleave="overColor"
      >考虑日特性</span
    >
  </div>
</template>
<script>
export default {
  props: ["enterColor"],
  data() {
    return {
      light: false
    };
  },
  methods: {
    checked() {
      if (this.light == false) {
        this.light = true;
        this.$emit("is_checked");
        this.$refs.bigBox.style.borderColor = this.enterColor;
        this.$refs.bigBox.style.backgroundColor = this.enterColor;
      } else {
        this.light = false;
        this.$emit("is_notChecked");
        this.$refs.bigBox.style.backgroundColor = "#fff";
      }
    },
    hoverColor() {
      this.$refs.bigBox.style.borderColor =
        this.enterColor == null ? "#fe6737" : this.enterColor;
    },
    overColor() {
      if (this.light == false) {
        this.$refs.bigBox.style.borderColor = "#ccc";
      } else {
        this.$refs.bigBox.style.borderColor = this.enterColor;
      }
    }
  }
};
</script>
<style lang="scss">
#radio-wrap {
  width: 107px;
  height: 16px;
  margin-left: 66px;
  margin-bottom: 23px;
  .bigBox {
    width: 14px;
    height: 14px;
    background-color: #fff;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    cursor: pointer;
    .smallBox {
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
  span {
    cursor: pointer;
    line-height: 16px;
  }
}
</style>
