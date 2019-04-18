<template>
  <div class="map-wrap">
    <div class="subarea-menu-wrap">
      <p class="subarea-menu-title">分区</p>
      <div class="area-wrap">
        <el-select
          v-model="selectValue1"
          size="small"
          placeholder="请选择省"
          class="select"
          @change="setProvince"
        >
          <el-option
            v-for="item in selectlist1"
            :key="item.adcode"
            :label="item.name"
            :value="item.adcode"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="selectValue2"
          size="small"
          placeholder="请选择市"
          class="select"
          @change="setCity"
        >
          <el-option
            v-for="item in selectlist2"
            :key="item.adcode"
            :label="item.name"
            :value="item.adcode"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="selectValue3"
          size="small"
          placeholder="请选择区"
          class="select"
          @change="setDistrict"
        >
          <el-option
            v-for="item in selectlist3"
            :key="item.adcode"
            :label="item.name"
            :value="item.adcode"
          >
          </el-option>
        </el-select>
      </div>
      <p class="subarea-menu-title">操作</p>
      <div class="map-operation">
        <div @click="bindEvent(0)" class="item-operation">
          <img src="/oraitStatic/img/common/新建变电站.png" alt="" />
          添加变电站
        </div>
        <div @click="bindEvent(1)" class="item-operation">
          <img src="/oraitStatic/img/common/新建负荷.png" alt="" />
          添加负荷
        </div>
        <div class="item-operation">
          <img src="/oraitStatic/img/common/新建线路.png" alt="" />
          添加线路
        </div>
        <div class="item-operation">
          <img src="/oraitStatic/img/common/新建模块.png" alt="" />
          添加模块
        </div>
        <div class="item-operation">
          <img src="/oraitStatic/img/common/划定区域.png" alt="" />
          划定区域
        </div>
      </div>
      <p class="subarea-menu-title">编辑信息</p>
      <div style="width:100%;margin-top:20px;">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="pointInfo"
          size="mini"
        >
          <el-form-item label="名称">
            <el-input v-model="pointInfo.name" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="等级">
            <el-input v-model="pointInfo.rank" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="pointInfo.lng" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="pointInfo.lat" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="savePoint" size="mini"
              >保存</el-button
            >
            <el-button size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
import District from "../../assets/js/common/districtExplorer.js";
import { getRegion } from "../../assets/service/fileSystem.js";
export default {
  data() {
    return {
      selectlist1: [],
      selectlist2: [],
      selectlist3: [],
      selectValue1: null,
      selectValue2: null,
      selectValue3: null,
      districtSearch: null, //边界查询对象
      districtExplorer: null,
      transformerSubstation: [], //变电站对象
      loadPoint: [], //负荷对象
      networkData: [], //网架总数据
      labelPosition: "right",
      pointInfo: {
        name: "",
        rank: "",
        lng: "",
        lat: ""
      }
    };
  },
  methods: {
    //获取省的数据
    getProvince(value) {
      getRegion(value).then(res => {
        if (res != null && res.err_code === 0) {
          this.selectlist1 = res.data;
        }
      });
    },
    //设置省的时候去获取市的信息
    setProvince(value) {
      this.districtExplorer.switch2AreaNode(value);
      getRegion(value).then(res => {
        if (res != null && res.err_code === 0) {
          this.selectlist2 = res.data;
          this.selectValue2 = "";
          this.selectValue3 = "";
        }
      });
    },
    //设置市的时候去获取区的信息
    setCity(value) {
      this.districtExplorer.switch2AreaNode(value);
      getRegion(value).then(res => {
        if (res != null && res.err_code === 0) {
          this.selectlist3 = res.data;
          this.selectValue3 = "";
        }
      });
    },
    //设置区
    setDistrict(value) {
      // this.drawBoder(value, "district");
    },
    /**
     * 选择区联动
     */
    setLinkage(istrue) {
      this.districtExplorer = new District(this.map);
      this.districtExplorer.init(istrue);
      Object.defineProperty(this.districtExplorer, "adcode", {
        set: () => {
          let feature = this.districtExplorer.feature;
          if (feature) {
            switch (feature.level) {
              case "province":
                this.selectValue1 = feature.adcode;
                getRegion(this.selectValue1).then(res => {
                  if (res != null && res.err_code === 0) {
                    this.selectlist2 = res.data;
                    this.selectValue2 = "";
                    this.selectValue3 = "";
                  }
                });
                break;
              case "city":
                this.selectValue2 = feature.adcode;
                getRegion(this.selectValue2).then(res => {
                  if (res != null && res.err_code === 0) {
                    this.selectlist3 = res.data;
                    this.selectValue3 = "";
                  }
                });
                break;
            }
          } else {
            this.selectValue1 = "";
            this.selectValue2 = "";
            this.selectValue3 = "";
          }
        }
      });
    },
    /**
     * 初始化地图
     */
    initMap() {
      //创建地图
      let that = this;
      var map = new window.AMap.Map("container", {
        zoom: 4,
        // mapStyle: "amap://styles/e25d1b435096a86a01fe3f51bf7f0250"
        mapStyle: "amap://styles/b0f5b8ee3d3473aca18fcaff1df0bce9"
      });
      map.on("dblclick", this.getMapZoom);
      //创建自定义切片图层，指定 getTileUrl 属性
      // var googleLayer = new AMap.TileLayer({
      //   getTileUrl:
      //     "http://mt{1,2,3,0}.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galil",
      //   zIndex: 2
      // });
      // googleLayer.setMap(map);
      this.map = map;
      // 同时引入工具条插件，比例尺插件和鹰眼插件
      window.AMap.plugin(
        ["AMap.ToolBar", "AMap.MapType", "AMap.DistrictSearch"],
        function() {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new window.AMap.ToolBar());
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          // map.addControl(new AMap.MapType());
          //行政区查询
          that.districtSearch = new window.AMap.DistrictSearch({
            // 关键字对应的行政区级别，country表示国家
            level: "country",
            //  显示下级行政区级数，1表示返回下一级行政区
            subdistrict: 0,
            extensions: "all"
          });
        }
      );
    },
    /**
     * 获取地图层级
     */
    getMapZoom(e) {
      console.log(e);
      // var zoom = this.map.getZoom(); //获取当前地图级别
    },
    //绑定操作事件
    bindEvent(type) {
      switch (type) {
        case 0:
          this.map.on("click", this.addPowerPoint);
          this.map.off("click", this.addLoadPoint);
          break;
        case 1:
          this.map.on("click", this.addLoadPoint);
          this.map.off("click", this.addPowerPoint);
          break;
        default:
          break;
      }
    },
    //添加变电站
    addPowerPoint(e) {
      let marker = new window.AMap.Marker({
        position: e.lnglat,
        map: this.map,
        icon: "/oraitStatic/img/common/新建变电站.png"
      });
      marker.on("rightclick", this.removePowerPoint);
      marker.on("click", this.addPointInfo);
      this.pointInfo.lng = e.lnglat.lng;
      this.pointInfo.lat = e.lnglat.lat;
      this.transformerSubstation.push(marker);
      console.log(this.transformerSubstation);
    },

    //删除变电站点标记
    removePowerPoint(e) {
      let markerIndex = 0;
      this.transformerSubstation.forEach((item, index) => {
        if (item._amap_id == e.target._amap_id) {
          item.setMap(null);
          markerIndex = index;
        }
      });
      this.transformerSubstation.splice(markerIndex, 1);
    },
    //添加负荷
    addLoadPoint(e) {
      let marker = new window.AMap.Marker({
        position: e.lnglat,
        map: this.map,
        icon: "/oraitStatic/img/common/新建负荷.png"
      });
      marker.on("rightclick", this.removeLoadPoint);
      marker.on("click", this.addPointInfo);
      this.pointInfo.lng = e.lnglat.lng;
      this.pointInfo.lat = e.lnglat.lat;
      this.loadPoint.push(marker);
    },
    //删除负荷标记
    removeLoadPoint(e) {
      let markerIndex = 0;
      this.loadPoint.forEach((item, index) => {
        if (item._amap_id == e.target._amap_id) {
          item.setMap(null);
          markerIndex = index;
        }
      });
      this.loadPoint.splice(markerIndex, 1);
    },
    //添加点信息
    addPointInfo(e) {
      this.pointInfo.lng = e.lnglat.lng;
      this.pointInfo.lat = e.lnglat.lat;
    },
    //保存点信息
    savePoint() {}
  },
  mounted() {
    this.initMap();
    this.getProvince(100000);
    this.setLinkage(false);
  }
};
</script>
<style lang="scss" scoped>
.control-bar-wrap {
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 200;
  width: 70%;
  height: 50px;
}
.map-wrap {
  height: var(--DomH);
  color: #5a5a5a;
  display: flex;
  .subarea-menu-wrap {
    width: 275px;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    background: #ffffff;
    .subarea-menu-title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      margin-top: 30px;
      padding-left: 20px;
    }
    .area-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      min-height: 150px;
      .select {
        width: 60%;
      }
    }
    .map-operation {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      height: 200px;
      .item-operation {
        font-size: 14px;
        cursor: pointer;
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  #container {
    float: right;
    width: 86%;
    height: 100%;
    margin: 0px;
  }
}
</style>
