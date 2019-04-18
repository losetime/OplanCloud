<template>
  <div id="pmgressbar" v-show="pmgressbarShow == true">
    <canvas id="circle" width="100px" height="100px"></canvas>
  </div>
</template>
<script>
export default {
  props: [
    "pmgressbarShow",
    "successColor",
    "strokeColor",
    "radius",
    "strokeWidth"
  ],
  data() {
    return {};
  },
  watch: {
    pmgressbarShow: {
      handler: function(newVal) {
        if (newVal == true) {
          this.start();
        }
      },
      deep: true
    }
  },
  methods: {
    start() {
      var c = document.getElementById("circle"); //获取画布
      var ctx = c.getContext("2d"); //返回一个用在于画布上的绘图环境，目前只有一个类型可以使用 -- 2d，将来可能会有3d
      ctx.lineCap = "round"; //线条两端的样式是半圆
      ctx.lineWidth = this.strokeWidth == "" ? 2 : this.strokeWidth; //线条宽度为2px
      let n = 0;
      let t = 0;
      let timeID = setInterval(() => {
        ctx.clearRect(0, 0, 100, 100); //清除画布
        ctx.font = "12px 微软雅黑";
        ctx.textAlign = "center";
        ctx.fillText(t + "%", 50, 54.5);
        ctx.beginPath(); //重新开始一个绘制路径
        n += 2.4;
        t = parseInt((n / 360) * 100) + 1;
        ctx.arc(50, 50, this.radius, 0, (n * Math.PI) / 180); //.arc()方法画圆
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
        if (n > 360) {
          clearInterval(timeID);
          ctx.clearRect(0, 0, 100, 100);
          ctx.beginPath();
          ctx.arc(50, 50, 30, 0, 2 * Math.PI);
          ctx.strokeStyle = this.successColor;
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 3;
          ctx.moveTo(37, 50);
          ctx.lineTo(47, 60);
          ctx.lineTo(67, 40);
          ctx.strokeStyle = this.successColor;
          ctx.stroke();
        }
      }, 10);
    }
  }
};
</script>
<style lang="scss"></style>
