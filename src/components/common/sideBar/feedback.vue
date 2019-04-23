<template>
  <div class="box" @click.stop>
    <div class="interface">
      <div class="top">
        <span class="hello">Hello</span>
        <i class="iconfont icon-guanbi" @click="openFeedBack"></i>
        <span class="advice">咨询产品有关问题，或提出您的反馈建议</span>
      </div>
      <div class="bottom">
        <div class="teasing">
          <textarea
            name
            id
            placeholder="吐个槽吧..."
            v-model="suggestions"
          ></textarea>
        </div>
        <div class="contact">
          <input
            type="text"
            name
            placeholder="你的联系方式 (选填)"
            v-model="phone_number"
          />
        </div>
        <div class="warning" v-show="warning == true">
          <p>请输入正确的电话号码!</p>
        </div>
        <div class="submit" @click="add">提交</div>
      </div>
    </div>
    <div class="prompt" v-show="sure == true">
      <i class="iconfont icon-guanbi" @click="openFeedBack"></i>
      <div class="thanks">
        <p>感谢您的反馈</p>
        <p>祝您每一刻工作都</p>
        <p>充满乐趣</p>
        <p>而又富有价值</p>
      </div>
      <img src="/oplan/img/wpSimluate/ORAIT.png" />
    </div>
  </div>
</template>
<script>
import { feedback } from "../../../assets/service/userInfoService.js";
export default {
  // props: ['sure'],
  data() {
    return {
      sure: false,
      warning: false, //是否显示警告
      suggestions: "", //文本域内容
      phone_number: "" //文本框内容
    };
  },
  methods: {
    //提交的方法
    add() {
      if (this.phone_number == "") {
        feedback(this.suggestions, this.phone_number).then(res => {
          //判断是否提交成功,成功将sure的值改为true
          if (res.err_code == 0) {
            this.sure = true;
            //提交成功后1秒自动隐藏
            let timeID = setTimeout(() => {
              this.openFeedBack();
              clearTimeout(timeID);
            }, 2500);
            let timeID2 = setTimeout(() => {
              this.sure = false;
              clearTimeout(timeID2);
            }, 3000);
          }
        });
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        //判断是否为手机号
        if (reg.test(this.phone_number) != true) {
          this.warning = true;
          return;
        } else {
          this.warning = false;
          feedback(this.suggestions, this.phone_number).then(res => {
            //判断是否提交成功,成功将sure的值改为true
            if (res.err_code == 0) {
              this.sure = true;
              //提交成功后1秒自动隐藏
              let timeID = setTimeout(() => {
                this.openFeedBack();
                clearTimeout(timeID);
              }, 2500);
              let timeID2 = setTimeout(() => {
                this.sure = false;
                clearTimeout(timeID2);
              }, 3000);
            }
          });
        }
      }
    },
    openFeedBack() {
      this.$store.commit("set_globalFlag", 0);
      this.suggestions = "";
      this.phone_number = "";
    }
  }
};
</script>
<style scoped lang="scss">
.box {
  width: 290px;
  height: 600px;
  border-radius: 10px;
  // box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  .interface {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    .top {
      width: 290px;
      height: 180px;
      // background: url("/oplan/img/wpSimluate/反馈.svg");
      background: linear-gradient(to bottom, #58edd9, #f8dacb);
      border-radius: 10px 10px 0px 0px;
      padding: 25px 19px 0;
      box-sizing: border-box;
      position: relative;
      font-family: "SourceHanSansSC-Normal";
      .hello {
        display: block;
        margin-top: 60px;
        color: #fff;
        font-size: 30px;
      }
      .advice {
        margin-top: 25px;
        display: block;
        font-size: var(--titleSeven);
        color: #fff;
      }
      i {
        display: block;
        font-size: var(--iconThree);
        color: #fff;
        position: absolute;
        top: 23px;
        right: 18px;
        text-align: center;
        cursor: pointer;
      }
      .partner {
        width: 100%;
        height: 115px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .person {
          text-align: center;
          .pho {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #683622;
            margin-bottom: 14px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          span {
            color: #e5e5e5;
            font-size: var(--titleSeven);
          }
        }
      }
    }
    .bottom {
      width: 290px;
      height: 420px;
      background-color: #ffffff;
      border-radius: 0px 0px 10px 10px;
      box-sizing: border-box;
      padding: 30px 23px;
      font-family: "SourceHanSansSC-Normal";
      .teasing {
        width: 242px;
        height: 160px;
        border: 1px solid #cbc1bd;
        border-radius: 10px;
        margin-bottom: 10px;
        resize: none;
        textarea {
          resize: none;
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          background-color: transparent;
          padding: 14px 12px;
          font-size: var(--titleSix);
          font-weight: 400;
        }
      }
      .contact {
        width: 242px;
        height: 46px;
        border: 1px solid #cbc1bd;
        border-radius: 10px;
        margin-bottom: 75px;
        input {
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          background-color: transparent;
          padding-left: 12px;
          font-size: var(--titleSix);
          font-weight: 400;
        }
      }
      .warning {
        position: absolute;
        bottom: 140px;
        left: 50%;
        transform: translateX(-50%);
        p {
          font-size: var(--titleSeven);
          color: var(--systemColor);
          text-align: center;
        }
      }
      .submit {
        width: 184px;
        height: 38px;
        border: 1px solid var(--systemColor);
        border-radius: 20px;
        margin-left: 29px;
        cursor: pointer;
        color: var(--systemColor);
        font-size: var(--titleSix);
        font-weight: 500;
        text-align: center;
        line-height: 40px;
        &:hover {
          background-color: #fdece5;
        }
        &:active {
          color: #fff;
          background-color: var(--systemColor);
        }
      }
    }
  }
  .prompt {
    width: 100%;
    height: 100%;
    background: linear-gradient(-30deg, #58edd9, #f8dacb);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    i {
      display: block;
      font-size: var(--iconThree);
      color: #fff;
      position: absolute;
      top: 23px;
      right: 18px;
      text-align: center;
      cursor: pointer;
    }
    .thanks {
      font-size: var(--titleSix);
      font-family: "SourceHanSansSC-Normal";
      font-weight: 400;
      color: #fff;
      line-height: 24px;
      position: absolute;
      top: 50%;
      left: 65px;
      transform: translateY(-50%);
      p:first-of-type {
        font-weight: 700;
      }
    }
    img {
      position: absolute;
      left: 70px;
      bottom: 60px;
    }
  }
}
</style>
