<template>
  <div id="switch" @click="reform" ref="orbital">
    <input type="text" v-model="value" />
    <div class="circle" ref="slider"></div>
  </div>
</template>
<script>
export default {
  props: ["orbitalColor_checked", "orbitalColor_ischecked"],
  data() {
    return {
      value: true
    };
  },
  methods: {
    reform() {
      if (this.value == true) {
        this.$refs.slider.style.transition = "transform .5s ease";
        this.$refs.slider.style.transform = "translateX(60px)";
        this.$refs.orbital.style.backgroundColor =
          this.orbitalColor_checked == null ? "red" : this.orbitalColor_checked;
        this.value = !this.value;
        this.$emit("is_notChecked");
      } else if (this.value == false) {
        this.$refs.slider.style.transition = "transform .5s ease";
        this.$refs.slider.style.transform = "translateX(0px)";
        this.$refs.orbital.style.backgroundColor =
          this.orbitalColor_ischecked == null
            ? "#13ce66"
            : this.orbitalColor_ischecked;
        this.value = !this.value;
        this.$emit("is_checked");
      }
    }
  },
  mounted() {
    //默认初始化背景色
    this.$refs.orbital.style.backgroundColor = this.orbitalColor_ischecked;
  }
};
</script>
<style lang="scss">
#switch {
  width: 100px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  input {
    display: none;
  }
  .circle {
    width: 38px;
    height: 38px;
    margin-top: 1px;
    margin-left: 1px;
    border-radius: 50%;
    background-color: #fff;
  }
}
</style>
