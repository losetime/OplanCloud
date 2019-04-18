<template>
  <div class="Wrap" id="newProgram">
    <!-- 左侧菜单 -->
    <ProjectMenu class="ProjectMenu"></ProjectMenu>
    <div class="contentWrap">
      <div class="schemeWrap" id="schemeWrap1" @click="funNewPower()">
        <div class="schemeTitle">电源规划</div>
        <div class="schemeRight">
          <img
            src="/oplanStatic/img/mainNetPlan/schemeManage/NewProgram/向右.svg"
            alt=""
            :class="newPowerOutput ? 'ischeckedImg' : 'offcheckedImg'"
          />
          <div class="line"></div>
        </div>
      </div>
      <div class="component-wrap">
        <NewPowerOutput v-show="newPowerOutput"></NewPowerOutput>
      </div>
      <div class="schemeWrap" @click="funMain()">
        <div class="schemeTitle">电网规划</div>
        <div class="schemeRight">
          <img
            src="/oplanStatic/img/mainNetPlan/schemeManage/NewProgram/向右.svg"
            alt=""
            :class="mainnetPlan ? 'ischeckedImg' : 'offcheckedImg'"
          />
          <div class="line"></div>
        </div>
      </div>
      <div class="component-wrap">
        <MainnetPlan v-show="mainnetPlan"></MainnetPlan>
      </div>

      <div class="schemeWrap" @click="funRun()">
        <div class="schemeTitle">运行模拟</div>
        <div class="schemeRight">
          <img
            src="/oplanStatic/img/mainNetPlan/schemeManage/NewProgram/向右.svg"
            alt=""
            :class="runAnimation ? 'ischeckedImg' : 'offcheckedImg'"
          />
          <div class="line"></div>
        </div>
      </div>
      <div class="component-wrap">
        <RunAnimation v-show="runAnimation"></RunAnimation>
      </div>

      <!-- 风电模拟 -->
      <div class="schemeWrap" @click="funWindSimulation()">
        <div class="schemeTitle">风电模拟</div>
        <div class="schemeRight">
          <img
            src="/oplanStatic/img/mainNetPlan/schemeManage/NewProgram/向右.svg"
            alt=""
            :class="windPowerSimulation ? 'ischeckedImg' : 'offcheckedImg'"
          />
          <div class="line"></div>
        </div>
      </div>
      <div class="component-wrap">
        <windPower v-show="windPowerSimulation"></windPower>
      </div>

      <!-- 光伏模拟 -->
      <div class="schemeWrap" @click="funphotovolaticSimulation()">
        <div class="schemeTitle">光伏模拟</div>
        <div class="schemeRight">
          <img
            src="/oplanStatic/img/mainNetPlan/schemeManage/NewProgram/向右.svg"
            alt=""
            :class="photovolaticSimulation ? 'ischeckedImg' : 'offcheckedImg'"
          />
          <div class="line"></div>
        </div>
      </div>
      <div class="component-wrap">
        <photovolatic v-show="photovolaticSimulation"></photovolatic>
      </div>
      <!-- 按钮 -->
      <footer>
        <div class="footer-save" @click="openPrompt()">保存方案</div>
        <div class="footer-prompt">导出方案</div>
      </footer>
    </div>
  </div>
</template>

<script>
import ProjectMenu from "./NewProgram/projectMenu.vue";
import NewPowerOutput from "./NewProgram/NewPowerOutput";
import MainnetPlan from "./NewProgram/MainnetPlan";
import RunAnimation from "./NewProgram/runAnimation";
import windPower from "./NewProgram/windPower";
import photovolatic from "./NewProgram/photovolatic";
export default {
  data() {
    return {
      mainnetPlan: false, //主网规划
      runAnimation: false, //运行模拟
      newPowerOutput: false, //新能源出力
      SchemeOverview: false, //方案信息概览
      windPowerSimulation: false, //风电模拟
      photovolaticSimulation: false, //光伏模拟
      rightPic: "/oplanStatic/img/mainNetPlan/schemeManage/NewProgram/向右.svg",
      promptData: "数据未导入"
    };
  },
  components: {
    // SchemeOverview,
    RunAnimation,
    MainnetPlan,
    NewPowerOutput,
    ProjectMenu,
    windPower,
    photovolatic
  },
  methods: {
    openPrompt() {
      this.$message({
        message: "方案保存成功！",
        type: "success"
      });
    },
    handleSuccess(res, file) {
      if (file.name != "") {
        document.getElementById("main-leadingIn").style.backgroundColor =
          "#ea5506";
        this.promptData = "数据已导入";
      }
    },
    funScheme() {
      //信息概览
      this.SchemeOverview = !this.SchemeOverview;
    },
    funRun() {
      //运行模拟
      this.runAnimation = !this.runAnimation;
    },
    funMain() {
      //主网规划
      this.mainnetPlan = !this.mainnetPlan;
    },
    funNewPower() {
      //新能源出力
      this.newPowerOutput = !this.newPowerOutput;
    },
    funWindSimulation() {
      //风电模拟
      this.windPowerSimulation = !this.windPowerSimulation;
    },
    funphotovolaticSimulation() {
      //光伏模拟
      this.photovolaticSimulation = !this.photovolaticSimulation;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin rotateImg($RotateData, $transionData) {
  transform: rotate($RotateData);
  transition: all $transionData;
}
.Wrap {
  height: var(--WrapH);
  overflow-y: auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}
.ProjectMenu {
  height: 100%;
  background: var(--WrapBgColor);
}

//右侧内容
.contentWrap {
  width: 85%;
  box-sizing: border-box;
}
.import-wrap {
  background: var(--WrapBgColor);
  padding-left: 20px;
  height: 240px;
  margin-bottom: 20px;
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 22px;
    font-family: "SourceHanSansSC-Medium";
  }
  .energyDataWrap {
    float: left;
    margin-bottom: 20px;

    .energy-leadingIn {
      width: 220px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      background-color: #ea5506;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
    }
    .energy-prompt {
      width: 220px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
    }
  }
  .mainDataWork {
    float: left;
    margin-left: 100px;
    .main-leadingIn {
      width: 220px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      background-color: #c5c5c5;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
    }
    .main-prompt {
      width: 220px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
    }
  }
  .checkData {
    width: 220px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    color: #4193e2;
    cursor: pointer;
  }
}

.line {
  height: 0;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  position: absolute;
  top: 18px;
  left: 30px;
}
.component-wrap {
  width: 100%;
  margin-bottom: 20px;
  background: var(--WrapBgColor);
}
.schemeWrap {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  cursor: pointer;
  clear: both;
  background-color: var(--WrapBgColor);
  .schemeTitle {
    width: 120px;
    float: left;
    font-size: 15px;
    font-family: "SourceHanSansSC-Medium";
  }
  .schemeRight {
    float: left;
    width: 80%;
    margin-top: 8px;
    position: relative;
    img {
      width: 25px;
      height: 25px;
    }
  }
}

.ischeckedImg {
  @include rotateImg(90deg, 0.5s);
}
.offcheckedImg {
  @include rotateImg(0deg, 0.5s);
}
footer {
  margin-top: 20px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  .footer-save {
    width: 150px;
    height: 40px;
    line-height: 40px;
    background: #ea5506;
    text-align: center;
    border-radius: 25px;
    cursor: pointer;
  }
  .footer-prompt {
    width: 150px;
    height: 40px;
    line-height: 40px;
    background: #1e81de;
    text-align: center;
    margin-left: 50px;
    border-radius: 25px;
    cursor: pointer;
  }
}
</style>
