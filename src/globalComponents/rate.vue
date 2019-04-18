<template>
  <div id="rate">
    <div class="box">
      <div
        class="pentagram"
        @mouseenter="light"
        @mouseleave="dark"
        @mousedown="sure"
      ></div>
      <div
        class="pentagram"
        @mouseenter="light"
        @mouseleave="dark"
        @mousedown="sure"
      ></div>
      <div
        class="pentagram"
        @mouseenter="light"
        @mouseleave="dark"
        @mousedown="sure"
      ></div>
      <div
        class="pentagram"
        @mouseenter="light"
        @mouseleave="dark"
        @mousedown="sure"
      ></div>
      <div
        class="pentagram"
        @mouseenter="light"
        @mouseleave="dark"
        @mousedown="sure"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: [],
      b: [], //保存点击的数组
      active: -1,
      isclick: false
    };
  },
  methods: {
    light(e) {
      for (let i = 0; i <= e.target.index; i++) {
        this.a[i].classList.add("show");
      }
      if (this.isclick == true) {
        for (let i = 0; i <= this.active; i++) {
          this.a[i].classList.remove("show2");
        }
      }
    },
    dark(e) {
      for (let i = 0; i <= e.target.index; i++) {
        this.a[i].classList.remove("show");
      }
      for (let i = 0; i <= this.active; i++) {
        this.b[i].classList.add("show2");
      }
    },
    //点击之后保存状态
    sure(e) {
      this.b = [];
      this.isclick = true;
      for (let i = 0; i <= e.target.index; i++) {
        this.active = i;
        this.a[i].classList.add("show2");
        this.b.push(this.a[i]);
      }
      this.$emit("res", e.target.index + 1);
    }
  },
  mounted() {
    this.a = document.getElementsByClassName("pentagram");
    for (let i = 0; i < this.a.length; i++) {
      this.a[i].index = i;
    }
  }
};
</script>
<style lang="scss">
.box {
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pentagram {
    font-size: 18px;
    cursor: pointer;
  }
  .pentagram::after {
    content: "☆";
  }
  .pentagram.show::after,
  .pentagram.show2::after {
    content: "★";
    color: #ff773e;
  }
}
</style>
