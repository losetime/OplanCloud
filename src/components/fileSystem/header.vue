<template>
  <div class="header-wrap">
    <div class="l-icon-wrap">
      <!-- <i class="iconfont icon-yunpingtai-caidan1" @click.stop="oraitNavFn"></i> -->
      <img src="/oplan/img/wpSimluate/风电模拟.svg" />
      <p>{{ fileTitle }}</p>
    </div>
    <div class="r-icon-wrap">
      <!-- 标题 -->
      <div class="title" v-if="title">
        <p @dblclick="editTitle">{{ title }}</p>
        <input
          type="text"
          class="title-input"
          v-model="titleInput"
          v-show="showInput"
          @keyup.enter="set_title"
          @blur="set_title"
        />
      </div>
      <div class="r-list">
        <div class="user-info">
          <transition name="information-fade">
            <!-- v-show="globalFlag == 1" -->
            <div class="userInfo">
              <information :userInfo="userInfo"></information>
            </div>
          </transition>
          <img
            src="/oplan/img/wpSimluate/男头.png"
            class="icon-nantou"
            @click.stop="information"
          />
        </div>
        <i class="line"></i>
        <div class="apply" @click.stop="fmoduleFn">
          <transition name="fmodule-fade">
            <fmodule v-show="globalFlag == 2" class="fmodule"></fmodule>
          </transition>
          <i class="iconfont icon-yingyong"></i>
        </div>
        <!-- <i class="line"></i>
        <div class="service"><i class="iconfont icon-shezhi1"></i></div> -->
      </div>
    </div>
    <!-- <transition name="oraitNav-fade">
      <div class="oraitNav" v-show="globalFlag == 9">
        <oraitNav></oraitNav>
      </div>
    </transition> -->
    <div class="breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
  </div>
</template>
<script>
import information from "./header/information"; //用户信息
import fmodule from "./header/fmodule"; //产品介绍
// import oraitNav from "../fileSystem/oraitNav"; //产品介绍
import { find_user } from "../../assets/service/userInfoService.js";
import {
  get_title,
  set_title
} from "../../assets/service/wpSimluateService.js";
export default {
  data() {
    return {
      fileTitle: "风电模拟",
      inform: false,
      userInfo: null,
      title: null,
      titleInput: null,
      //导入组件
      showBoard: false,
      showInput: false,
      dialogBoxInfo: {
        type: null,
        info: "已有模拟数据，点击确认现有模拟数据将会被覆盖"
      }
    };
  },
  computed: {
    globalFlag() {
      return this.$store.state.module_global.globalFlag;
    },
    windSiteInfo() {
      return this.$store.state.module_global.windSiteInfo;
    }
  },
  watch: {
    globalFlag: {
      handler: function() {
        // console.log()
        // this.showFunmodule = false;
      },
      deep: true
    },
    windSiteInfo() {
      this.get_title();
    }
  },
  methods: {
    information() {
      if (this.globalFlag == 1) {
        this.$store.commit("set_globalFlag", 0);
      } else {
        find_user().then(res => {
          this.userInfo = res.data.body_data;
          this.$store.commit("set_globalFlag", 1);
        });
      }
    },
    fmoduleFn() {
      if (this.globalFlag == 2) {
        this.$store.commit("set_globalFlag", 0);
      } else {
        this.$store.commit("set_globalFlag", 2);
      }
    },
    oraitNavFn() {
      if (this.globalFlag == 9) {
        this.$store.commit("set_globalFlag", 0);
      } else {
        this.$store.commit("set_globalFlag", 9);
      }
    },
    openFile() {
      if (this.$store.state.module_global.sidFlag) {
        this.dialogBoxInfo.type = 0;
        this.showBoard = true;
      } else {
        this.dialogBoxInfo.type = 1;
        this.showBoard = true;
      }
    },
    closeDialogBox(val) {
      this.showBoard = val;
    },
    // 获取标题
    get_title() {
      get_title().then(res => {
        if (res.err_code == 0) {
          this.title = res.data;
        }
      });
    },
    editTitle() {
      this.showInput = !this.showInput;
      this.titleInput = this.title;
    },
    //设置标题
    set_title() {
      set_title(this.titleInput).then(res => {
        if (res.err_code == 0) {
          // this.title = res.data;
          this.get_title();
          this.showInput = false;
        }
      });
    }
  },
  mounted() {
    this.$store.commit("set_sidFlag", localStorage.getItem("SID"));
  },
  components: {
    information,
    fmodule
    // oraitNav
  }
};
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 100%;
  width: 100%;
  background-image: url("/oplan/img/wpSimluate/header.png");
  background-size: cover;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  .l-icon-wrap {
    float: left;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i {
      display: block;
      width: 60px;
      height: 100%;
      padding-left: 15px;
      box-sizing: border-box;
      margin-right: 23px;
      line-height: 50px;
      font-size: var(--iconThree);
      color: #f57e51;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
    img {
      width: 34px;
      height: 41px;
      margin-left: 40px;
    }
    p {
      margin-left: 18px;
      font: var(--titleSix) "SourceHanSansSC-Normal";
      color: #fff;
    }
  }
  .r-icon-wrap {
    float: right;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .title {
      display: flex;
      align-items: center;
      margin-right: 10%;
      position: relative;
      font-size: var(--titleSix);
      p {
        width: 380px;
        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .title-input {
        width: 380px;
        height: 30px;
        position: absolute;
        top: -5px;
        left: 0;
        outline: none;
        font-size: var(--titleSix);
      }
    }
    .r-list {
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
      align-items: center;
      width: 150px;
      height: 100%;
      box-sizing: border-box;
      .line {
        display: block;
        width: 1px;
        height: 18px;
        background-color: #fff;
      }
      .user-info,
      .apply,
      .service {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
        }
        i {
          font-size: var(--iconTwo);
          cursor: pointer;
        }
        .icon-nantou {
          width: 30px;
          height: 30px;
          color: #fff;
          cursor: pointer;
        }
        .icon-yingyong,
        .icon-shezhi1 {
          color: #fff;
        }
      }
      .user-info {
        position: relative;
        .userInfo {
          width: 315px;
          height: 290px;
          display: flex;
          justify-content: center;
          overflow: hidden;
          position: absolute;
          top: 44px;
          right: -32px;
          z-index: 100;
        }
        .information-fade-enter-active {
          transition: all 0.3s ease;
        }
        .information-fade-leave-active {
          transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
        }
        .information-fade-enter,
        .information-fade-leave-to {
          height: 0;
        }
      }
      .apply {
        position: relative;
        .fmodule {
          position: absolute;
          top: 44px;
          right: -20px;
          z-index: 100;
        }
        .fmodule-fade-enter-active {
          transition: all 0.3s ease;
        }
        .fmodule-fade-leave-active {
          transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
        }
        .fmodule-fade-enter,
        .fmodule-fade-leave-to {
          height: 0;
        }
      }
    }
  }
  .oraitNav {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 1;
    width: 250px;
    height: var(--DomH);
  }
  .oraitNav-fade-enter-active,
  .oraitNav-fade-leave-active {
    transition: transform 0.15s linear;
  }
  .oraitNav-fade-enter,
  .oraitNav-fade-leave-to {
    transform: translateX(-275px);
  }
}
</style>
