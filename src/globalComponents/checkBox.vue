<template>
  <div id="checkBox">
    <label for="txt" class="box" ref="box">
      <span class="chooseBox" ref="chooseBox">
        <i class="iconfont icon-duihao" ref="yes"></i>
      </span>
      <input
        type="checkBox"
        id="txt"
        @change="getValue"
        ref="check"
        v-if="disabled == true"
      />
      <span class="content" ref="txt">哈哈哈</span>
    </label>
  </div>
</template>
<script>
export default {
  props: ["chooseBox_bgc", "chooseBoxWidth", "chooseBoxHeight", "disabled"],
  data() {
    return {};
  },
  methods: {
    getValue() {
      if (this.$refs.check.checked == true) {
        this.$refs.chooseBox.style.backgroundColor =
          this.chooseBox_bgc == null ? "#fe6737" : this.chooseBox_bgc;
        this.$refs.chooseBox.style.borderColor =
          this.chooseBox_bgc == null ? "#fe6737" : this.chooseBox_bgc;
        this.$refs.txt.style.color = this.chooseBox_bgc;
        this.$refs.yes.style.color = "#fff";
        this.$refs.yes.style.transition = "transform .1s linear";
        this.$refs.yes.style.transform = "scale(1)";
        this.$emit("isChecked", true);
      } else {
        this.$refs.chooseBox.style.backgroundColor = "#fff";
        this.$refs.chooseBox.style.borderColor = "#ccc";
        this.$refs.txt.style.color = "#000";
        this.$refs.yes.style.transform = "scale(0)";
        this.$emit("notChecked", false);
      }
    }
  },
  mounted() {
    this.$refs.chooseBox.style.width =
      this.chooseBoxWidth == null ? "15px" : this.chooseBoxWidth;
    this.$refs.chooseBox.style.height =
      this.chooseBoxHeight == null ? "15px" : this.chooseBoxHeight;
    if (this.disabled == false) {
      this.$refs.box.style.cursor = "not-allowed";
    }
  }
};
</script>
<style lang="scss">
#checkBox {
  display: inline-block;
  .box {
    display: flex;
    align-items: center;
    cursor: pointer;
    .chooseBox {
      display: flex;
      justify-content: center;
      align-items: center;
      //   width: 15px;
      //   height: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
      i {
        transform: scale(0);
      }
    }
    input {
      display: none;
    }
    .content {
      margin-left: 10px;
    }
  }
}
</style>
