<template>
  <div class="recentOpen">
    <div class="b-wrap">
      <div class="b-t-wrap">
        <span class="b-t-w-wrap">名称</span>
        <span class="b-t-w-wrap">来自</span>
        <span class="b-t-w-wrap">最近打开</span>
        <span class="b-t-w-wrap">模拟起止时间</span>
      </div>
      <div class="b-b-wrap">
        <div
          class="b-m-wrap"
          v-for="(item, index) in fileData"
          :key="index"
          v-show="item.length != 0"
        >
          <div class="b-m-t-wrap">
            <div
              v-for="(it, Itindex) in item"
              :key="Itindex"
              :class="{
                'b-m-t-content': true,
                'item-check': itemCheck[0] === index && itemCheck[1] === Itindex
              }"
              @dblclick="go_simulate(it)"
              @click="listChecked(index, Itindex)"
            >
              <div class="b-name">
                <img src="/oplan/img/common/主网规划方案.png" alt />
                <span>{{ it.name | filterName }}</span>
              </div>
              <div class="b-from">{{ it.user }}</div>
              <div class="b-open">{{ it.recent }}</div>
              <div class="b-time">{{ it.simulationRange }}</div>
              <input
                type="text"
                class="u-rename"
                v-show="showRename == Itindex"
                v-model="fileNameValue"
                @blur="sumbitTitle(it)"
                @keyup.enter="sumbitTitle(it)"
                @click.stop
              />
              <div
                class="more"
                @mouseenter="pickMore = it.sid"
                @mouseleave="pickMore = -1"
              >
                <i class="iconfont icongengduo-xian"></i>
                <div class="bemore" v-show="pickMore == it.sid">
                  <p @click.stop="reName(it, Itindex)">
                    <i class="iconfont iconzhongmingming-xian"></i>
                    <span>重命名</span>
                  </p>
                  <p @click.stop="del_file(it)">
                    <i class="iconfont iconshanchu-xian"></i>
                    <span>删除</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="b-m-b-wrap">
            <p v-if="index == 0 && item.length != 0">今日</p>
            <p v-if="index == 1 && item.length != 0">本周</p>
            <p v-if="index == 2 && item.length != 0">上周</p>
            <p v-if="index == 3 && item.length != 0">更早</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  get_fileList,
  set_fileName,
  del_file_shallow
} from "../../assets/service/fileSystem.js";
export default {
  data: () => {
    return {
      pickMore: -1,
      showRename: null,
      fileNameValue: null,
      fileData: [],
      itemCheck: []
    };
  },
  computed: {
    globalFlag() {
      return this.$store.state.module_global.globalFlag;
    }
  },
  watch: {
    globalFlag(val) {
      if (val == 0) {
        this.showRename = -1;
      }
    }
  },
  filters: {
    filterName: function(value) {
      if (value == "" || value == null) {
        return "未命名";
      } else {
        return value;
      }
    }
  },
  methods: {
    //显示or隐藏重命名输入框
    reName(item, index) {
      this.showRename = index;
      this.fileNameValue = item.name;
      //改变全局状态，这里是为了【点其他地方输入框隐藏】的事件
      this.$store.commit("set_globalFlag", 200);
    },
    //提交重命名
    sumbitTitle(val) {
      set_fileName(val.sid, this.fileNameValue).then(res => {
        if (res.err_code == 0) {
          this.showRename = -1;
          this.get_fileList();
        }
      });
    },
    //删除文件
    del_file(val) {
      del_file_shallow(val.sid).then(res => {
        if (res.err_code == 0) {
          this.get_fileList();
        }
      });
    },
    //跳转模拟页面
    go_simulate(val) {
      localStorage.setItem("SID", val.sid);
      window.location.href = "/wpSimluate.html#/wind_simulate";
    },
    //获得文件列表
    get_fileList() {
      get_fileList().then(res => {
        if (res.err_code == 0) {
          this.set_typegroup(res.data);
        }
      });
    },
    //设置分组
    set_typegroup(fileData) {
      //分四个数组
      let today = []; //今天
      let nowWeek = []; //本周
      let beforeWeek = []; //上周
      let earlier = []; //更早
      // 获取当前时间
      let now = new Date(); //获取当前时间
      var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)); //当天的零点时间
      let weekday = now.getDay(); //获取当前星期数 周五
      let thisMonday = timeStamp - (weekday - 1) * 86400000; //本周一零点的毫秒数
      let beforeMonday = timeStamp - (weekday - 1 + 7) * 86400000; //上周一零点的毫秒数
      fileData.forEach(e => {
        let fileTime = new Date(e.recent).getTime(); //获取当前毫秒数
        if (fileTime > timeStamp) {
          today.push(e);
        } else if (fileTime > thisMonday) {
          nowWeek.push(e);
        } else if (fileTime > beforeMonday) {
          beforeWeek.push(e);
        } else {
          earlier.push(e);
        }
      });
      this.fileData = [today, nowWeek, beforeWeek, earlier];
    },
    listChecked(index, Itindex) {
      this.itemCheck = [index, Itindex];
    }
  },
  mounted() {
    this.get_fileList();
  }
};
</script>
<style lang="scss" scoped>
.recentOpen {
  width: 100%;
  height: 100%;
  .b-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .b-t-wrap {
      display: flex;
      width: 72%;
      height: 60px;
      line-height: 60px;
      font-size: var(--titleFive);
      background: rgba(245, 245, 245, 1);
      span {
        padding-left: 20px;
        box-sizing: border-box;
        &:nth-child(1) {
          flex: 25%;
        }
        &:nth-child(2) {
          flex: 10%;
        }
        &:nth-child(3) {
          flex: 25%;
        }
        &:nth-child(4) {
          flex: 40%;
        }
      }
    }
    .b-b-wrap {
      width: 100%;
      height: var(--tableScrollH);
      overflow: auto;
      .b-m-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        cursor: pointer;
        .b-m-t-wrap {
          width: 72%;
          .b-m-t-content {
            position: relative;
            display: flex;
            margin-top: 5px;
            width: 100%;
            height: 60px;
            background: rgba(245, 245, 245, 1);
            &:hover {
              background: #f8fbfb;
            }
            > div {
              display: flex;
              align-items: center;
              height: 100%;
              padding-left: 20px;
              box-sizing: border-box;
              font-size: 14px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(85, 72, 67, 1);
              &:nth-child(1) {
                flex: 25%;
                img {
                  width: 34px;
                  height: 41px;
                  margin-right: 10px;
                }
                span {
                  display: inline-block;
                  width: 60%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
              &:nth-child(2) {
                flex: 10%;
              }
              &:nth-child(3) {
                flex: 25%;
              }
              &:nth-child(4) {
                flex: 40%;
              }
            }
            .u-rename {
              position: absolute;
              top: 15px;
              left: 60px;
              z-index: 100;
              width: 200px;
              height: 30px;
              font-size: var(--titleSix);
            }
            .more {
              position: absolute;
              top: 0px;
              right: 40px;
              padding: 0;
              .bemore {
                position: absolute;
                top: 40px;
                left: 3px;
                z-index: 100;
                width: 110px;
                background-image: url("/oplan/img/wpSimluate/提示背景.png");
                background-position-y: 70%;
                transform: translateX(-50%);
                box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.16);
                border-radius: 5px;
                z-index: 999;
                color: rgba(85, 72, 67, 1);
                i {
                  font-size: 20px;
                  margin: 0 10px 0 25px;
                }
                p {
                  display: flex;
                  align-items: center;
                  height: 30px;
                  cursor: pointer;
                  &:hover {
                    color: rgba(245, 126, 81, 1);
                  }
                }
              }
            }
          }
          .item-check {
            background: #eef6fd;
          }
        }
        .b-m-b-wrap {
          width: 72%;
          height: 45px;
          font-size: 12px;
          color: rgba(164, 150, 145, 1);
          line-height: 20px;
        }
      }
    }
  }
}
</style>
