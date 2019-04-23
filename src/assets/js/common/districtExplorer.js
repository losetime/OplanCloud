export default class District {
  constructor(mapObj) {
    this.districtExplorer = null;
    this.currentAreaNode = null;
    this.mapObj = mapObj;
    this.feature = null;
    this.adcode = null;
    this.$ = null;
  }
  get feature() {
    return this._feature;
  }
  set feature(value) {
    this._feature = value;
  }
  init(value) {
    let that = this;
    window.AMapUI.load(
      ["ui/geo/DistrictExplorer", "lib/$"],
      (DistrictExplorer, $) => {
        //创建一个实例
        this.$ = $;
        this.districtExplorer = new DistrictExplorer({
          eventSupport: value, //打开事件支持
          map: that.mapObj
        });
        //当前聚焦的区域
        this.currentAreaNode = null;
        this.districtExplorer.on(
          "featureMouseout featureMouseover",
          (e, feature) => {
            this.toggleHoverFeature(feature, e.type === "featureMouseover");
          }
        );
        //feature被点击
        this.districtExplorer.on("featureClick", (e, feature) => {
          var props = feature.properties;
          this.feature = props;
          this.adcode = props.adcode;
          //如果存在子节点
          if (props.childrenNum > 0) {
            //切换聚焦区域
            this.switch2AreaNode(props.adcode);
          }
        });
        //外部区域被点击
        this.districtExplorer.on("outsideClick", e => {
          this.districtExplorer.locatePosition(
            e.originalEvent.lnglat,
            (error, routeFeatures) => {
              if (routeFeatures[1]) {
                this.feature = routeFeatures[1].properties;
                this.adcode = routeFeatures[1].properties.adcode;
              } else {
                this.feature = null;
                this.adcode = null;
              }
              if (routeFeatures && routeFeatures.length > 1) {
                //切换到省级区域
                this.switch2AreaNode(routeFeatures[1].properties.adcode);
              } else {
                //切换到全国
                this.switch2AreaNode(140000);
              }
            },
            {
              levelLimit: 2
            }
          );
        });
        this.switch2AreaNode(140000);
      }
    );
  }
  //地图hover效果
  toggleHoverFeature(feature, isHover) {
    if (!feature) {
      return;
    }
    var props = feature.properties;
    var polys = this.districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
    for (var i = 0, len = polys.length; i < len; i++) {
      polys[i].setOptions({
        fillColor: isHover ? "rgba(255,255,255,0.3)" : "#ffffff"
      });
    }
  }
  clearFeaturePolygons() {
    this.districtExplorer.clearAreaNodeCache();
  }
  //绘制某个区域的边界
  renderAreaPolygons(areaNode) {
    //更新地图视野
    this.mapObj.setBounds(areaNode.getBounds(), null, null, true);

    //清除已有的绘制内容
    this.districtExplorer.clearFeaturePolygons();

    //绘制子区域
    this.districtExplorer.renderSubFeatures(areaNode, () => {
      return {
        cursor: "default",
        bubble: true,
        strokeColor: "#ffffff", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 1, //线宽
        fillColor: "#ffffff", //填充色
        fillOpacity: 1, //填充透明度
        zIndex: 0
      };
    });

    //绘制父区域
    this.districtExplorer.renderParentFeature(areaNode, {
      cursor: "default",
      bubble: true,
      strokeColor: "#3BECD6", //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 1, //线宽
      fillColor: "#ffffff", //填充色
      fillOpacity: 0, //填充透明度
      zIndex: 0
    });
  }
  //切换区域后刷新显示内容
  refreshAreaNode(areaNode) {
    this.districtExplorer.setHoverFeature(null);
    this.renderAreaPolygons(areaNode);
  }
  //切换区域
  switch2AreaNode(adcode, callback) {
    if (
      this.currentAreaNode &&
      "" + this.currentAreaNode.getAdcode() === "" + adcode
    ) {
      return;
    }

    this.loadAreaNode(adcode, (error, areaNode) => {
      if (error) {
        if (callback) {
          callback(error);
        }

        return;
      }

      this.currentAreaNode = window.currentAreaNode = areaNode;

      //设置当前使用的定位用节点
      this.districtExplorer.setAreaNodesForLocating([this.currentAreaNode]);
      this.refreshAreaNode(areaNode);

      if (callback) {
        callback(null, areaNode);
      }
    });
  }

  //加载区域
  loadAreaNode(adcode, callback) {
    this.districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
      if (error) {
        if (callback) {
          callback(error);
        }
        console.error(error);
        return;
      }
      if (callback) {
        callback(null, areaNode);
      }
    });
  }
  clearFeature() {
    this.feature = null;
  }
}
