<template>
  <div class="netwrok-browse">
    <div class="subarea-menu-wrap">
      <p class="subarea-menu-title" @click="clearNetWork">分区</p>
      <div class="area-wrap">
        <!-- <el-select
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
        </el-select> -->
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
        <!-- <el-select
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
        </el-select> -->
      </div>
      <p class="subarea-menu-title">分层</p>
      <div class="area-wrap">
        <Legend
          :legendLineArr="legendLineArr"
          :legendPointArr="legendPointArr"
          @setLineLevel="setLineLevel"
          @setPointLevel="setPointLevel"
        ></Legend>
      </div>
      <p class="subarea-menu-title">详细信息</p>
      <div class="area-wrap info-wrap">
        <div>220KV XXX线路</div>
        <div>数值等级：<span>213KV</span></div>
        <div>数值信息：<span>183KV</span></div>
      </div>
    </div>
    <div class="r-wrap">
      <div class="m-content">
        <transition name="parameter-fade">
          <parameter
            class="parameter-wrap"
            :showParam="false"
            :title="parameterTitle"
            @startSimluate="startSimluate"
            v-show="globalFlag == 4"
            ref="parameter"
          ></parameter>
        </transition>
        <transition name="parameter-fade">
          <parameter
            class="parameter-wrap"
            :showParam="true"
            :title="parameterTitle2"
            @startSimluate="startSimluate"
            v-show="globalFlag == 5"
            ref="parameter"
          ></parameter>
        </transition>
      </div>
      <div class="r-content">
        <el-tooltip
          class="item"
          effect="dark"
          content="网源规划"
          placement="left"
          :hide-after="3000"
        >
          <i
            class="iconfont iconguihua-xian"
            @click.stop="change_globalFlag(4, -4)"
          >
            <i class="line"></i>
          </i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="运行模拟"
          placement="left"
          :hide-after="3000"
        >
          <i
            class="iconfont iconyunhangmoni-xian"
            @click.stop="change_globalFlag(5, -5)"
          >
            <i class="line"></i>
          </i>
        </el-tooltip>
      </div>
    </div>
    <div id="container"></div>
    <div class="control-bar-wrap">
      <div class="title">2017/05/19</div>
      <control-bar></control-bar>
    </div>
  </div>
</template>
<script>
import controlBar from "../common/controlBar";
import Legend from "../common/legend";
import District from "../../assets/js/common/districtExplorer.js";
import { getNetWork, getRegion } from "../../assets/service/fileSystem.js";
import { start_parameter } from "../../assets/service/wpSimluateService.js";
//开始模拟
import parameter from "../common/sideBar/parameter";
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
      polygons: [],
      pathSimplifierIns: [], //网架线路数组对象
      pathSimplifier: null, //巡航器加载图片对象
      legendLineArr: [], //线路类型
      legendPointArr: [], //发电站类型
      networkData: [], //网架总数据
      TransformerSub: [], //变电站数组对象
      arrPoint: [], //网架线路数据
      powerStationType: [], //发电站类型[风 火 水 光 抽]
      // 模拟参数标题
      parameterTitle: ["规划开始时间", "规划结束时间", "开始规划"],
      parameterTitle2: ["运行模拟开始时间", "运行模拟结束时间", "开始模拟"]
    };
  },
  methods: {
    handleTime(time) {
      let date = new Date(time);
      return date.getFullYear() + "-" + date.getMonth() + 1;
    },
    globalFlagFn() {
      this.$store.commit("set_globalFlag", 0);
    },
    change_globalFlag(show, hide) {
      if (this.globalFlag == show) {
        this.$store.commit("set_globalFlag", hide);
      } else {
        this.$store.commit("set_globalFlag", show);
      }
    },
    startSimluate(endDate) {
      start_parameter(endDate).then(res => {
        if (res.err_code == 0) {
          //会返回一个simulationStart
          this.$store.commit("set_simulationStart", res.data.simulationStart);
          this.$refs.parameter.successCallback();
        } else {
          this.$refs.parameter.errorCallback();
          this.$message({
            type: "error",
            message: "规划失败，请稍后重试"
          });
        }
      });
    },
    //获取省的数据
    // getProvince(value) {
    //   getRegion(value).then(res => {
    //     if (res != null && res.err_code === 0) {
    //       this.selectlist1 = res.data;
    //     }
    //   });
    // },
    // 获取市的数据
    getCity(value) {
      getRegion(value).then(res => {
        if (res != null && res.err_code === 0) {
          this.selectlist2 = res.data;
          this.getNetWork();
        }
      });
    },
    //设置省的时候去获取市的信息
    setProvince(value) {
      this.districtExplorer.switch2AreaNode(value);
      this.getNetWork();
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
      this.getNetWork();
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
    setLinkage() {
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
                this.clearNetWork();
                break;
              case "city":
                this.selectValue2 = feature.adcode;
                getRegion(this.selectValue2).then(res => {
                  if (res != null && res.err_code === 0) {
                    this.selectlist3 = res.data;
                    this.selectValue3 = "";
                  }
                });
                this.clearNetWork();
                break;
            }
          } else {
            this.selectValue1 = "";
            this.selectValue2 = "";
            this.selectValue3 = "";
            this.clearNetWork();
          }
        }
      });
    },
    //控制线路的显示
    setLineLevel(index, isTrue) {
      if (isTrue) {
        this.pathSimplifierIns[index].show();
        this.TransformerSub[index].forEach(item => {
          item.show();
        });
      } else {
        this.pathSimplifierIns[index].hide();
        this.TransformerSub[index].forEach(item => {
          item.hide();
        });
      }
    },
    //控制发电场的显示
    setPointLevel(index, isTrue) {
      if (isTrue) {
        this.powerStationType[index].forEach(item => {
          item.show();
        });
      } else {
        this.powerStationType[index].forEach(item => {
          item.hide();
        });
      }
    },
    //销毁潮流图的所有对象
    clearNetWork() {
      // 清除所有点
      this.powerStationType.forEach(parentItem => {
        parentItem.forEach(item => {
          item.setMap(null);
        });
      });
      this.powerStationType = [];
      // 清除所有巡航器
      this.pathSimplifierIns.forEach(item => {
        // item.hide(); //todo 这块还没找到清除线的方法
        item.clearPathNavigators();
        this.map.remove(item);
      });
      this.pathSimplifierIns = [];
      //清除所有变电站
      this.TransformerSub.forEach(item => {
        item.clear();
      });
      this.TransformerSub = [];

      this.map.clearMap();
    },
    // 获取数据潮流数据
    getNetWork() {
      // 设置网架图之前清理所有对象
      this.clearNetWork();
      getNetWork().then(res => {
        if (res != null && res.err_code === 0) {
          this.networkData = res.data;

          //整理发电站数据
          this.networkData.powerStationData.forEach(item => {
            if (!this.legendPointArr.includes(item.type)) {
              this.legendPointArr.push(item.type);
            }
          });
          // 获取类型
          this.networkData.lineData.forEach(item => {
            if (!this.legendLineArr.includes(item.typeName)) {
              this.legendLineArr.push(item.typeName);
            }
          });
          this.initPathSimplifier(this.legendLineArr);
          this.setPowerStationPoint();
        }
      });
      //获取变电站数据
      // getTransformerSubPoint().then(res => {
      //   if (res != null && res.err_code === 0) {
      //     this.TransformerSub = res.data;
      //     this.setTransformerSubPoint();
      //   }
      // });
    },
    /**
     * 设置潮流网架(会被多次调用)
     */
    setNetWork(typeName, pathSimpIndex) {
      let arrline = [];
      let arrPoint = [];
      let imgSrc1 = "/oplan/img/common/变电站.png";
      //根据typeName过滤数据
      this.networkData.lineData.map((item, index) => {
        if (item.typeName === typeName) {
          item.coords.extend.forEach(ele => {
            arrline.push({
              name: "路线" + index,
              path: [ele.start, ele.end],
              status: item.status
            });
          });
          /**
           * 根据type获取这一类型变电站点
           * item数据结构
           * coords: Object
           * fromName: "平城"
           * status: "空载"
           * toName: "雁同"
           * typeName: "500KV线路"
           */
          arrPoint.push({
            lnglat: item.coords.center.start,
            name: item.fromName,
            id: index
          });
        }
      });
      //设置线路
      this.pathSimplifierIns[pathSimpIndex].setData(arrline);
      //调用设置巡航器方法
      arrline.forEach((item, index) => {
        switch (item.status) {
          case "空载":
            this.setPathNavigator(
              pathSimpIndex,
              index,
              "./oplan/img/common/空载.png",
              "rgba(255, 247, 230, 0.2)"
            );
            break;
          case "轻载":
            this.setPathNavigator(
              pathSimpIndex,
              index,
              "./oplan/img/common/轻载.png",
              "rgba(82, 196, 26, 0.2)"
            );
            break;
          case "重载":
            this.setPathNavigator(
              pathSimpIndex,
              index,
              "./oplan/img/common/重载.png",
              "rgba(8, 151, 156, 0.2)"
            );
            break;
          case "满载":
            this.setPathNavigator(
              pathSimpIndex,
              index,
              "./oplan/img/common/满载.png",
              "rgba(245, 34, 45, 0.2)"
            );
            break;
          case "过载":
            this.setPathNavigator(
              pathSimpIndex,
              index,
              "./oplan/img/common/过载.png",
              "rgba(82, 3, 57, 0.2)"
            );
            break;
          case "停供":
            this.setPathNavigator(
              pathSimpIndex,
              index,
              "./oplan/img/common/停供.png",
              "rgba(232, 232, 232, 0.2)"
            );
            break;
        }
      });
      //变电站调用
      switch (typeName) {
        case "220KV线路":
          this.setTransformerSubPoint(
            arrPoint,
            pathSimpIndex,
            new window.AMap.Size(15, 15)
          );
          break;
        case "500KV线路":
          this.setTransformerSubPoint(
            arrPoint,
            pathSimpIndex,
            new window.AMap.Size(18, 18)
          );
          break;
        case "800KV直流":
          this.setTransformerSubPoint(
            arrPoint,
            pathSimpIndex,
            new window.AMap.Size(20, 20)
          );
          break;
      }
    },
    /**
     * 设置巡航器
     * @pathSimpIndex {Number} this.pathSimplifierIns对象索引
     * @index {Number} this.pathSimplifierIns对象路线索引
     * @imgSrc {String} 图片地址
     */
    setPathNavigator(pathSimpIndex, index, imgSrc, pathColor) {
      this.pathSimplifierIns[pathSimpIndex]
        .createPathNavigator(index, {
          loop: true, //循环播放
          speed: 40000, //巡航速度，单位千米/小时
          pathNavigatorStyle: {
            autoRotate: true,
            initRotateDegree: 90,
            width: 12,
            height: 3,
            //使用图片
            content: this.pathSimplifier.Render.Canvas.getImageContent(
              imgSrc,
              onload,
              onerror
            ),
            pathLinePassedStyle: {
              strokeStyle: pathColor
            }, //禁止巡航器后面有线
            strokeStyle: null,
            fillStyle: null
          }
        })
        .start();
    },
    /**
     * 设置变电站点
     */
    setTransformerSubPoint(arrPoint, pathSimpIndex, iconSize) {
      this.TransformerSub[pathSimpIndex] = [];
      //大小需要随着电压等级变化
      arrPoint.forEach((item, index) => {
        let itemObj = new window.AMap.Marker({
          icon: new window.AMap.Icon({
            size: iconSize, // 图标尺寸
            image: `/oplan/img/common/变电站.png`, // Icon的图像
            // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
            imageSize: iconSize // 根据所设置的大小拉伸或压缩图片
          }),
          position: new window.AMap.LngLat(item.lnglat[0], item.lnglat[1]),
          offset: new window.AMap.Pixel(-10, -10),
          zIndex: 400,
          bubble: true
        });
        var infoWindow = new window.AMap.InfoWindow({
          anchor: "top-cneter",
          content: `<p style="font-size:14px;">${item.name}变电站</p>`,
          offset: new window.AMap.Pixel(0, 0)
        });
        itemObj.on("mouseover", e => {
          infoWindow.open(this.map, e.target.getPosition());
        });
        itemObj.on("mouseout", e => {
          infoWindow.close();
        });
        this.TransformerSub[pathSimpIndex].push(itemObj);
      });
      this.map.add(this.TransformerSub[pathSimpIndex]);
    },
    /**
     * 设置发电站点
     */
    setPowerStationPoint() {
      this.legendPointArr.forEach((itemType, indexType) => {
        this.powerStationType[indexType] = [];
        this.networkData.powerStationData.forEach((itemData, index) => {
          let itemObj = new window.AMap.Marker({
            icon: new window.AMap.Icon({
              size: new window.AMap.Size(25, 25), // 图标尺寸
              image: `/oplan/img/common/${itemType}.png`, // Icon的图像
              // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
              imageSize: new window.AMap.Size(25, 25) // 根据所设置的大小拉伸或压缩图片
            }),
            position: new window.AMap.LngLat(
              itemData.coords[0],
              itemData.coords[1]
            ),
            offset: new window.AMap.Pixel(-12, -12),
            zIndex: 500,
            bubble: true
          });
          var infoWindow = new window.AMap.InfoWindow({
            anchor: "top-cneter",
            content: `<h2 style="color:#FF773E;font-weight:700;">相关信息</h2>
                      <div style="font-size:14px;">
                        <p>公司代码:${itemData.Info.company_id}</p>
                        <p>强迫停运率：${itemData.Info.forced_outage_rate}</p>
                        <p>最大容量：${itemData.Info.max_capacity}</p>
                        <p>最小出力:${itemData.Info.min_capacity}</p>
                        <p>实际投产日期：${this.handleTime(
                          itemData.Info.starting_date
                        )}</p>
                        <p>退役日期：${this.handleTime(
                          itemData.Info.retirement_date
                        )}</p>
                        <p>机组容量：${itemData.Info.station_capacity}</p>
                        <p>机组数量：${itemData.Info.station_num}</p>
                        <p>抽蓄转换效率：${
                          itemData.Info.transfer_efficiency
                        }</p>
                      </div>`,
            offset: new window.AMap.Pixel(0, 0)
          });
          itemObj.on("mouseover", e => {
            infoWindow.open(this.map, e.target.getPosition());
          });
          itemObj.on("mouseout", e => {
            infoWindow.close();
          });
          if (itemData.type == itemType) {
            this.powerStationType[indexType].push(itemObj);
          }
        });
        this.map.add(this.powerStationType[indexType]);
      });
    },
    /**
     * 初始化地图
     */
    initMap() {
      //创建地图
      let that = this;
      var map = new window.AMap.Map("container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 4,
        mapStyle: "amap://styles/e25d1b435096a86a01fe3f51bf7f0250"
        // mapStyle: "amap://styles/b0f5b8ee3d3473aca18fcaff1df0bce9"
      });
      map.on("zoomend", this.getMapZoom);
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
     * 初始化巡航器对象,并调用设置潮流函数
     */
    initPathSimplifier(typeName) {
      window.AMapUI.load(
        ["ui/misc/PathSimplifier", "lib/$"],
        PathSimplifier => {
          if (!PathSimplifier.supportCanvas) {
            alert("当前环境不支持 Canvas！");
            return;
          }
          this.pathSimplifier = PathSimplifier;
          typeName.forEach((item, index) => {
            let lineWidth = this.chooseStyle(item);
            this.pathSimplifierIns[index] = new PathSimplifier({
              autoSetFitView: false,
              map: this.map, //所属的地图实例
              zIndex: 110,
              getPath: function(pathData) {
                return pathData.path;
              },
              getHoverTitle: function(pathData, pathIndex, pointIndex) {
                if (pointIndex >= 0) {
                  //point
                  return (
                    pathData.name +
                    "，点：" +
                    pointIndex +
                    "/" +
                    pathData.path.length
                  );
                }
                return pathData.name + "，变电站数量" + pathData.path.length;
              },
              //线样式
              renderOptions: {
                pathLineStyle: {
                  // strokeStyle: "#FFF7E6",
                  strokeStyle: "#E5E5E5",
                  borderStyle: "#E5E5E5",
                  dirArrowStyle: false,
                  lineWidth: lineWidth
                },
                pathLineHoverStyle: {
                  lineWidth: 0,
                  borderStyle: "#ffffff",
                  borderWidth: 0
                },
                startPointStyle: {
                  lineWidth: 0,
                  radius: 0
                },
                endPointStyle: {
                  lineWidth: 0,
                  radius: 0
                }
              }
            });
            this.setNetWork(item, index);
          });
        }
      );
    },
    /**
     * 样式选择
     */
    chooseStyle(type) {
      switch (type) {
        case "220KV线路":
          return 2;
        case "330KV线路":
          return 2.5;
        case "500KV线路":
          return 3;
        case "660KV线路":
          return 3.5;
        case "750KV线路":
          return 4;
        case "800KV直流":
          return 5.5;
        case "1000KV直流":
          return 6;
      }
    },
    /**
     * 获取地图层级
     */
    getMapZoom() {
      var zoom = this.map.getZoom(); //获取当前地图级别
      if (zoom <= 5) {
        this.TransformerSub.forEach((item, index) => {
          this.setLineLevel(index, false);
        });
        this.powerStationType.forEach((item, index) => {
          this.setPointLevel(index, false);
        });
      } else {
        this.TransformerSub.forEach((item, index) => {
          this.setLineLevel(index, true);
        });
        this.powerStationType.forEach((item, index) => {
          this.setPointLevel(index, true);
        });
      }
    }
  },
  computed: {
    globalFlag() {
      return this.$store.state.module_global.globalFlag;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      this.districtExplorer = new District(this.map);
      this.districtExplorer.init(false);
      this.getCity(140000);
    });
    // this.setLinkage(true);
  },
  components: {
    Legend,
    controlBar,
    parameter
  }
};
</script>
<style lang="scss" scoped>
.netwrok-browse {
  height: 100%;
  color: #5a5a5a;
  .subarea-menu-wrap {
    width: 275px;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    background: #ffffff;
    float: left;
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
      min-height: 80px;
      .select {
        width: 60%;
      }
    }
    .info-wrap {
      margin: 10px 0 50px 40px;
      min-height: 96px;
      width: 70%;
      font-size: 12px;
      background: #58edd9;
      color: #ffffff;
    }
  }
  .r-wrap {
    position: relative;
    width: 60px;
    height: 100%;
    // background: red;
    display: flex;
    float: right;
    .m-content {
      height: 100%;
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
      .parameter-content {
        position: absolute;
        right: 2px;
        top: 2px;
        background-color: #f3f3f2;
        // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
        z-index: 10000;
      }
    }
    .r-content {
      height: 100%;
      width: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      i {
        display: block;
        font-size: var(--iconTwo);
        width: 60px;
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
      }
    }
  }
  #container {
    height: 100%;
    margin: 0 60px 0 275px;
  }
  .control-bar-wrap {
    position: absolute;
    top: 60px;
    right: 140px;
    z-index: 200;
    width: 70%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    .title {
      height: 30px;
      width: 118px;
      text-align: center;
      line-height: 30px;
      margin-right: 20px;
      background: #ffffff;
      font-size: var(--titleSix);
    }
  }
}
</style>
