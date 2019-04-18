<template>
  <div style="position:relative;">
    <div class="lineBox" v-for="(item, index) in legendLineArr" :key="index">
      <i class="iconfont icon-xianlu"></i>
      <span>{{ item }}</span>
      <i
        :class="{
          iconfont: true,
          'icon-yanjing1': powerPlantFlag[index] == true,
          'icon-biyan': powerPlantFlag[index] == false
        }"
        @click="isLineVisible(index)"
      ></i>
    </div>
    <div>
      <div
        class="lineBox"
        v-for="(item, index) in powerStationArr"
        :key="index"
      >
        <i :class="item.class"></i>
        <span>{{ item.name }}</span>
        <i
          :class="{
            iconfont: true,
            'icon-yanjing1': item.show == true,
            'icon-biyan': item.show == false
          }"
          @click="isPointVisible(index)"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["legendLineArr", "legendPointArr"],
  data() {
    return {
      powerPlantFlag: [],
      powerStationArr: []
    };
  },
  watch: {
    legendLineArr(obj) {
      this.powerPlantFlag = obj.map(val => {
        return !!val;
      });
    },
    legendPointArr(obj) {
      this.powerStationArr = obj.map(val => {
        let powerStationArr = {
          class: "",
          name: val,
          show: !!val
        };
        switch (val) {
          case "风电站":
            powerStationArr.class = "iconfont iconfont1 icon-fengdianchang";
            break;
          case "火电站":
            powerStationArr.class = "iconfont iconfont1 icon-huodianzhan";
            break;
          case "水电站":
            powerStationArr.class = "iconfont iconfont1 icon-shuidianzhan";
            break;
          case "光伏发电厂":
            powerStationArr.class = "iconfont iconfont1 icon-guangfufadianzhan";
            break;
          case "抽水蓄能电站":
            powerStationArr.class =
              "iconfont iconfont1 icon-choushuixunengdianzhan";
            break;
        }
        return powerStationArr;
      });
    }
  },
  methods: {
    isLineVisible(index) {
      this.powerPlantFlag.splice(
        index,
        1,
        (this.powerPlantFlag[index] = !this.powerPlantFlag[index])
      );
      this.$emit("setLineLevel", index, this.powerPlantFlag[index]);
    },
    isPointVisible(index) {
      this.powerStationArr[index].show = !this.powerStationArr[index].show;
      this.$emit("setPointLevel", index, this.powerStationArr[index].show);
    }
  }
};
</script>

<style lang="scss" scoped>
.left-img {
  position: absolute;
  top: 40%;
  left: -31%;
  img {
    width: 1rem;
  }
}
.lineBox {
  /* background:#DEDEDE; */
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  .iconfont1 {
    color: #fa541c;
  }
  span {
    display: inline-block;
    width: 100px;
    margin-left: 20px;
  }
}
.lineStyle {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
