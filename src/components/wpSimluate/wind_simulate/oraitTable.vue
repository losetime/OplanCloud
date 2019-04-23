<!-- 负荷管理总页面 -->
<template>
  <div
    class="oraitTable-wrap"
    ref="tableWrap"
    @DOMMouseScroll="handleScroll"
    @scroll="handleScroll"
  >
    <div class="virtualHiehgt">
      <div class="column-wrap" v-if="tableData.data != null">
        <div class="item-data-first">
          日期
        </div>
        <div v-for="(item, index) in tableData.index" :key="index">
          <div class="item-data">{{ item }}</div>
        </div>
      </div>
      <!-- <vue-scroll> -->
      <div class="data-sets" v-if="tableData.data != null">
        <div class="table-header" @dblclick="fullScreen">
          <div
            class="item-data-first"
            v-for="item in tableData.header"
            :key="item"
          >
            <p>{{ item }}</p>
          </div>
        </div>
        <div class="table-body">
          <input
            type="number"
            autofocus
            class="table-input"
            v-show="showInput"
            v-model="inputVal"
            v-focus="true"
            @blur="submitInput(0)"
            @keydown="submitInput($event)"
          />
          <div
            :class="{
              'item-wrap': true,
              'checked-real': tableData.real[index] == -1
            }"
            v-for="(item, index) in tableData.data"
            :key="index"
          >
            <div
              :class="{
                'item-data': true,
                'checked-anomaly': val.status == anomalyFlag,
                'checked-bad': val.status == 2,
                'cheched-rect':
                  valIndex >= rectStart[0] &&
                  index >= rectStart[1] &&
                  valIndex <= rectEnd[0] &&
                  index <= rectEnd[1]
              }"
              v-for="(val, valIndex) in item"
              :key="valIndex"
              @dblclick="set_inputVal($event, index, valIndex, val.value)"
              @mousedown="get_rectStart(valIndex, index)"
              @mousemove="get_rectMove(valIndex, index)"
              @mouseup="get_rectEnd(valIndex, index)"
            >
              {{ val.value }}
            </div>
          </div>
        </div>
      </div>
      <!-- </vue-scroll> -->
    </div>
    <div class="warning" v-show="tableData.data == null">
      <p>导入数据后即可查看表格</p>
    </div>
    <input
      type="text"
      v-focus="true"
      v-model="pasteValue"
      v-if="showPasteInput"
      class="pasteInput"
    />
  </div>
</template>
<script>
import { get_tableData } from "../../../assets/service/wpSimluateService.js";
import mixins from "../../../assets/js/oraitTable";
export default {
  props: ["visibleHeight", "tabBar", "navBar"],
  data() {
    return {
      //可视区域数据
      tableData: {
        data: null,
        index: null,
        real: null,
        header: null
      },
      tableBuffer: null, //缓冲区数据
      tableStart: 0, //请求数据起始位置
      tableCount: 0, //真实请求数据长度
      visible_tableCount: 0, //可见数据长度
      anomalyFlag: 1, //异常数据class标志位
      styles: null,
      scrollTop: 0 //滚动条高度
    };
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  mixins: [...mixins],
  computed: {
    htmlHeight() {
      return this.$store.state.module_global.htmlHeight;
    },
    globalFlag() {
      return this.$store.state.module_global.globalFlag;
    },
    sidFlag() {
      return this.$store.state.module_global.sidFlag;
    }
  },
  watch: {
    htmlHeight() {
      this.$nextTick(function() {
        if (localStorage.getItem("SID")) {
          if (this.tableBuffer == null) {
            this.get_tableData();
          } else {
            this.setVisibleHeight();
            this.disposeData();
          }
        }
      });
    },
    globalFlag(val) {
      if (val == 501 || val == 502) {
        this.get_tableData();
      } else if (val == 503) {
        this.anomalyFlag = -1; //改变异常数据class的条件
      }
    },
    //sid变化后重新刷新数据
    sidFlag() {
      this.$nextTick(function() {
        if (localStorage.getItem("SID")) {
          this.get_tableData();
        }
      });
    },
    //表格的全屏监听，只是因为table-body这个容器不能继承父元素virtualHiehgt的高度，需要手动赋值高度
    visibleHeight(val) {
      this.setVisibleHeight(val);
      this.disposeData();
    },
    tabBar() {
      this.get_tableData();
    },
    navBar() {
      this.get_tableData();
    }
  },
  methods: {
    //监听滚动事件
    handleScroll(e) {
      const ele = e.srcElement || e.target;
      const { scrollTop } = ele;
      this.scrollTop = scrollTop;
      this.disposeData();
    },
    //计算可视区域高度
    setVisibleHeight(val) {
      let visibleHeight = val || this.$refs.tableWrap.offsetHeight;
      this.styles.setProperty("--visibleHeight", visibleHeight + "px"); //设置可视区域高度
      //根据高度获取可视区域的数据条数(获取数据之前)
      this.visible_tableCount = Math.floor((visibleHeight - 60) / 30);
    },
    //获取表格数据
    get_tableData() {
      this.setVisibleHeight();
      this.$store.commit("set_loading", true);
      get_tableData(this.tableStart, 200, this.tabBar, this.navBar).then(
        res => {
          if (res.err_code == 0) {
            this.tableBuffer = res.data;
            this.tableData.header = this.tableBuffer.header;
            this.tableCount = this.tableBuffer.data.length;
            //获取表格的宽度（获取数据之后）
            let length = this.tableBuffer.header.length + 1;
            this.styles.setProperty("--optionWidth", 60 * length + "px");
            //计算支撑总体数据的高度
            this.styles.setProperty(
              "--virtualHiehgt",
              this.tableCount * 30 + "px"
            );
            this.disposeData();
            this.$store.commit("set_loading", false);
          }
        }
      );
    },
    //切片数据
    disposeData() {
      this.styles.setProperty("--translate", `translateY(${this.scrollTop}px)`);
      let sliceStart = Math.floor(this.scrollTop / 30);
      let sliceEnd = sliceStart + this.visible_tableCount;
      if (sliceEnd <= this.tableCount) {
        this.tableData.data = this.tableBuffer.data.slice(sliceStart, sliceEnd);
        this.tableData.index = this.tableBuffer.index.slice(
          sliceStart,
          sliceEnd
        );
        this.tableData.real = this.tableBuffer.real.slice(sliceStart, sliceEnd);
      }
    },
    //表格全屏
    fullScreen() {
      this.$store.commit("set_globalFlag", 202);
    }
  },
  mounted() {
    this.styles = this.$el.style;
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.oraitTable-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #ffffff;
  color: var(--fontColor);
  .virtualHiehgt {
    width: 100%;
    height: var(--virtualHiehgt);
    display: flex;
    font-size: var(--titleSeven);
    .column-wrap {
      width: 100px;
      height: var(--visibleHeight);
      transform: var(--translate);
      .item-data-first {
        width: 100px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border: 1px solid rgba(235, 235, 235, 1);
      }
      .item-data {
        height: 29px;
        width: 100%;
        text-align: center;
        line-height: 29px;
        border-bottom: 1px solid rgba(235, 235, 235, 1);
        border-right: 1px solid rgba(235, 235, 235, 1);
        border-left: 1px solid rgba(235, 235, 235, 1);
      }
    }
    .data-sets {
      width: var(--optionWidth);
      height: var(--visibleHeight);
      transform: var(--translate);
      .table-header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        font-family: "SourceHanSansSC-Medium";
        font-size: var(--titleSeven);
        border-bottom: 1px solid rgba(235, 235, 235, 1);
        border-top: 1px solid rgba(235, 235, 235, 1);
        border-right: 1px solid rgba(235, 235, 235, 1);
        cursor: crosshair;
        .item-data {
          width: 60px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-bottom: 1px solid rgba(235, 235, 235, 1);
          border-right: 1px solid rgba(235, 235, 235, 1);
          .paixun-icon {
            height: 60%;
            position: relative;
            i {
              width: 20px;
              height: 50%;
              font-size: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: rgba(208, 208, 208, 1);
            }
          }
        }
        .item-data-first {
          height: 60px;
          width: 100%;
          text-align: center;
        }
      }
      .table-body {
        height: 100%;
        width: 100%;
        font-size: var(--titleSeven);
        .table-input {
          position: absolute;
          width: 60px;
          height: 30px;
          text-align: center;
          outline: none;
          top: var(--inputTop);
          left: var(--inputLeft);
          border: 1px solid rgba(255, 139, 97, 1);
          box-sizing: border-box;
        }
        .item-wrap {
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: space-around;
          font-size: var(--titleSeven);
          // &:hover {
          //   background-color: var(--checkedColor);
          // }
          .item-data {
            width: 60px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-bottom: 1px solid rgba(235, 235, 235, 1);
            border-right: 1px solid rgba(235, 235, 235, 1);
            cursor: text;
          }
          .checked-anomaly {
            color: rgba(84, 187, 231, 1);
          }
          .checked-bad {
            background: rgba(239, 120, 134, 1);
            color: #ffffff;
          }
          .cheched-rect {
            background: var(--checkedColor);
          }
        }
        .checked-real {
          color: rgba(97, 210, 196, 1);
        }
      }
    }
  }
  .warning {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    color: #ccc;
    p {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--titleSix);
    }
  }
  .pasteInput {
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
    width: 1px;
    opacity: 0;
  }
  .checked {
    background: var(--checkedColor);
  }
}
</style>
