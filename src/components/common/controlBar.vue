<template>
  <div class="t-wrap">
    <div class="control-btn">
      <div class="control iconfont icon-zshangyishou"></div>
      <div
        :class="{
          control: true,
          iconfont: true,
          'icon-kaishi': showStartimg == true,
          'icon-zzanting': showStartimg == false
        }"
        @click="startShow"
      ></div>
      <div class="control iconfont icon-zxiayishou"></div>
    </div>
    <div class="progress-wrap">
      <div class="progress"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showStartimg: true,
      setInter: null,
      progress: 0
    };
  },
  methods: {
    async startShow() {
      this.showStartimg = !this.showStartimg;
      if (!this.showStartimg) {
        let styles = this.$el.style;
        this.setInter = setInterval(() => {
          this.progress++;
          styles.setProperty("--progressWidth", this.progress + "%");
          if (this.progress == 100) {
            clearTimeout(this.setInter);
          }
        }, 2000);
      } else {
        clearTimeout(this.setInter);
      }
    }
  },
  mounted() {
    let styles = this.$el.style;
    styles.setProperty("--progressWidth", "0%");
  }
};
</script>
<style lang="scss" scoped>
.t-wrap {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  .control-btn {
    margin-right: 2%;
    width: 130px;
    display: flex;
    justify-content: space-between;
    .control {
      font-size: var(--iconThree);
      color: var(--activeColor);
    }
  }
  .progress-wrap {
    width: 88%;
    height: 2px;
    background: #d0d0d0;
    .progress {
      height: 2px;
      width: var(--progressWidth);
      background: #448cf0;
    }
  }
}
</style>
