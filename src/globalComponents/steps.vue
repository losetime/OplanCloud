<template>
  <div id="steps">
    <div class="state">
      <i :class="this.icon == null ? 'iconfont icon-icon-test' : this.icon"></i>
      <span>{{ txt.value1 }}</span>
    </div>
    <div class="line"></div>
    <div class="state">
      <i :class="this.icon == null ? 'iconfont icon-icon-test' : this.icon"></i>
      <span>{{ txt.value2 }}</span>
    </div>
    <div class="line"></div>
    <div class="state">
      <i :class="this.icon == null ? 'iconfont icon-icon-test' : this.icon"></i>
      <span>{{ txt.value3 }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["txt", "active", "icon"],
  data() {
    return {
      list: [],
      next: null
    };
  },
  methods: {
    addClass() {
      if (this.next > this.list.length) {
        return;
      }
      for (let i = 0; i < this.next; i++) {
        this.list[i].classList.add("active");
        this.list[i].children[0].classList.remove("icon-icon-test");
        this.list[i].children[0].classList.add("icon-duihao");
      }
    }
  },
  mounted() {
    this.next = this.active;
    this.list = document.getElementsByClassName("state");
    this.addClass();
  }
};
</script>
<style lang="scss">
#steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .state {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 3px solid #000;
    border-radius: 50%;
    i {
      font-size: 80px;
    }
    span {
      position: absolute;
      top: 130%;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      font-size: 16px;
      color: #ccc;
    }
  }
  .state.active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 3px solid #61d2c4;
    border-radius: 50%;
    background-color: #61d2c4;
    i {
      font-size: 40px;
      color: #fff;
    }
  }
  .line {
    flex: 1;
    border: 2px solid #ccc;
  }
}
</style>
