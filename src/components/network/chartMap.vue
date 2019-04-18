<template>
  <div class="map-wrap">
    <!-- <div class="operation-menu-wrap">
      <div class="edit-wrap">
        <div>负荷编辑</div>
        <div>电源编辑</div>
        <div>线路编辑</div>
        <div @click="goBrowse">网架浏览</div>
        <div @click="goEdit">网架操作</div>
      </div>
    </div> -->
    <router-view class="router-wrap" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: ""
    };
  },
  methods: {
    goBrowse() {
      this.$router.push("/chartMap/networkBrowse");
    },
    goEdit() {
      this.$router.push("/chartMap/networkEdit");
    }
  }
};
</script>
<style lang="scss" scoped>
.map-wrap {
  height: 100%;
  color: #5a5a5a;
  display: flex;
}
.operation-menu-wrap {
  width: 150px;
  height: 100%;
  border-right: 1px solid #2d3031;
  font-size: 14px;
  .edit-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 200px;
    div {
      padding: 5px 10px;
      border: 1px solid #707070;
      border-radius: 25px;
      cursor: pointer;
    }
  }
}
.router-wrap {
  width: 100%;
  height: var(--DomH);
}
.r-wrap {
  position: relative;
  width: 3%;
  background-color: #f5f5f5;
  display: flex;
  position: relative;
  .l-content {
    height: 100%;
    width: 220px;
    background-color: #fff;
    border-right: 1px solid rgba(172, 172, 172, 0.2);
  }
  .m-content {
    height: 100%;
    background-color: #ffffff;
    position: relative;
    .parameter-fade-enter-active {
      transition: all 0.3s ease;
    }
    .parameter-fade-leave-active {
      transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .parameter-fade-enter,
    .parameter-fade-leave-to {
      width: 0;
    }
    .feedback-fade-enter-active {
      transition: all 0.3s ease;
    }
    .feedback-fade-leave-active {
      transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .feedback-fade-enter,
    .feedback-fade-leave-to {
      width: 0;
    }
    .parameter-content {
      position: absolute;
      right: 5px;
      top: 5px;
      background-color: #f3f3f2;
      // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
      z-index: 10000;
    }
    .actualData-wrap {
      position: absolute;
      right: 5px;
      top: 5px;
      // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
      z-index: 10000;
    }
    .box {
      position: absolute;
      right: 5px;
      bottom: 5px;
      z-index: 10000;
    }
  }
  .r-content {
    height: 100%;
    width: 60px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-left: 1px solid rgba(172, 172, 172, 0.2);
    i {
      display: block;
      font-size: var(--iconTwo);
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;
      i.line {
        width: 40px;
        height: 1px;
        display: block;
        background-color: #a49691;
        position: absolute;
        bottom: 0;
      }
      &:hover {
        background-color: #f5f5f5;
        color: var(--systemColor);
      }
      &:last-of-type {
        //反馈位置,待改动位置
        position: absolute;
        bottom: 40px;
        color: var(--systemColor);
      }
    }
  }
}
</style>
