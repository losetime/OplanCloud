<template>
  <div class="trash" @click="globalFlagFn">
    <div class="title">
      <i class="iconfont iconzuojiantou-xian"></i>
      <span @click="goBack">返回工作台 </span>
    </div>
    <div class="m-t-wrap">
      <span class="m-t-w-wrap">名称</span>
      <span class="m-t-w-wrap">来自</span>
      <span class="m-t-w-wrap">删除时间</span>
      <span class="m-t-w-wrap">模拟起始时间</span>
    </div>
    <div class="m-wrap">
      <div>
        <div
          class="m-m-wrap"
          v-for="(item, index) in fileData"
          :key="index"
          v-show="item.length != 0"
        >
          <div class="m-m-t-wrap">
            <div
              class="m-m-t-content"
              v-for="(it, Itindex) in item"
              :key="Itindex"
            >
              <div class="m-name">
                <img src="/oplan/img/common/主网规划方案.png" />
                <span>{{ it.name | filterName }}</span>
              </div>
              <div class="m-from">{{ it.user }}</div>
              <div class="m-open">{{ it.recent }}</div>
              <div class="m-time">{{ it.simulationRange }}</div>
              <div
                class="more"
                @mouseenter="pickMore = it.sid"
                @mouseleave="pickMore = -1"
              >
                <i class="iconfont icongengduo-xian"></i>
                <div class="bemore" v-if="pickMore == it.sid">
                  <p @click.stop="get_restore(it)">
                    <i class="iconfont iconhuanyuan-xian"></i>
                    <span>还原</span>
                  </p>
                  <p @click.stop="permanently_restore(it)">
                    <i class="iconfont iconshanchu-xian"></i>
                    <span>永久删除</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="m-m-m-wrap">
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
import { permanently_restore } from "../../assets/service/fileSystem.js";
import { get_trashFileList } from "../../assets/service/fileSystem.js";
import { get_restore } from "../../assets/service/fileSystem.js";
export default {
  data: () => {
    return {
      pickMore: -1,
      showRename: null,
      fileData: []
    };
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
    goBack() {
      this.$router.push("/windPower");
    },
    //重新获取文件
    get_trashFileList() {
      get_trashFileList().then(res => {
        if (res.err_code == 0) {
          this.set_typegroup(res.data);
        }
      });
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
    //文件恢复
    get_restore(it) {
      get_restore(it.sid).then(res => {
        if (res.err_code == 0) {
          this.get_trashFileList();
          this.$message({
            type: "success",
            message: "文件恢复成功"
          });
        }
      });
    },
    //永久删除
    permanently_restore(it) {
      permanently_restore(it.sid).then(res => {
        if (res.err_code == 0) {
          this.get_trashFileList();
          this.$message({
            type: "success",
            message: "文件删除成功"
          });
        }
      });
    },
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
    }
  },
  mounted() {
    //分四个数组
    this.get_trashFileList();
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/global";
.trash {
  height: var(--WrapH);
  overflow: hidden;
  .title {
    display: flex;
    align-items: center;
    width: 1370px;
    margin: 52px auto 48px;
    box-sizing: border-box;
    border-bottom: 1px solid #000;
    cursor: pointer;
    .icon-a-zuo {
      font-size: var(--iconTwo);
      color: #554843;
    }
    span {
      font-size: var(--titleFour);
      color: #554843;
    }
  }
  .m-t-wrap {
    display: flex;
    width: 1370px;
    margin: 0 auto;
    padding: 15px 0px 15px 20px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    font-size: var(--titleFive);
    span {
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
  .m-wrap {
    height: var(--tableScrollH);
    overflow: auto;
    .m-m-wrap {
      margin: 0 auto;
      width: 1370px;
      .m-m-t-wrap {
        width: 100%;
        .m-m-t-content {
          margin-top: 5px;
          width: 100%;
          height: 60px;
          background: rgba(245, 245, 245, 1);
          opacity: 1;
          display: flex;
          padding: 10px 0px 10px 20px;
          box-sizing: border-box;
          > div {
            text-align: left;
            height: 100%;
            line-height: 40px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(85, 72, 67, 1);
            opacity: 1;
            &:nth-child(1) {
              flex: 25%;
              display: flex;
              align-items: center;
              img {
                width: 34px;
                height: 41px;
                line-height: 45px;
              }
              span {
                flex: 1;
                line-height: 40px;
                padding-left: 19px;
              }
            }
            &:nth-child(2) {
              flex: 10%;
            }
            &:nth-child(3) {
              flex: 25%;
            }
            &:nth-child(4) {
              flex: 35%;
            }
            &:nth-child(5) {
              position: relative;
              flex: 5%;
              .bemore {
                position: absolute;
                top: 35px;
                left: 3px;
                z-index: 100;
                width: 120px;
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
        }
      }
      .m-m-m-wrap {
        width: 100%;
        height: 45px;
        font-size: 12px;
        color: rgba(164, 150, 145, 1);
        opacity: 1;
        line-height: 20px;
      }
    }
  }
}
</style>
