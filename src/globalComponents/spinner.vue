<template>
  <div id="spinner" @mouseleave="contentClose">
    <p @mouseenter="contentOpen">下拉框</p>
    <div class="content" v-show="contentShow == true && list != null">
      <ul>
        <div class="triangle"></div>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="callback(item.type)"
        >
          {{ item.lable }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  data() {
    return {
      contentShow: false
    };
  },
  methods: {
    contentOpen() {
      this.contentShow = true;
    },
    contentClose() {
      this.contentShow = false;
    },
    callback(val) {
      this.$emit("event", val);
    }
  }
};
</script>
<style lang="scss">
#spinner {
  display: inline-block;
  .content {
    display: inline-block;
    ul {
      margin-top: 10px;
      position: relative;
      box-shadow: 0px 0px 10px #ccc;
      border-radius: 5px;
      .triangle {
        width: 0;
        height: 0;
        &::after {
          position: absolute;
          left: 50%;
          top: -5px;
          display: block;
          content: "";
          border: 5px solid transparent;
          border-top-width: 0;
          border-bottom: 5px solid #fff;
        }
      }
      li {
        padding: 5px 15px;
        cursor: pointer;
        &:hover {
          color: #fe6737;
        }
      }
    }
  }
}
</style>
