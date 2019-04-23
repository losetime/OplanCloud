<template>
  <div class="apply-wrap">
    <div class="apply-content">
      <div class="l-wrap"></div>
      <div class="r-wrap">
        <div class="t-wrap">申请产品试用</div>
        <div class="b-wrap">
          <div class="input-item">
            <p>申请人</p>
            <input
              type="text"
              placeholder="请输入真实姓名"
              v-model="username"
              @input="verifyFn('nickname')"
            />
            <div class="verify"><Verify :hint="hint.nickname"></Verify></div>
          </div>
          <div class="input-item">
            <p>手机号码</p>
            <input
              type="text"
              placeholder="请输入手机号码"
              v-model="phone"
              @input="verifyFn('phone')"
            />
            <div class="verify"><Verify :hint="hint.phone"></Verify></div>
          </div>
          <div class="input-item">
            <p>企业组织</p>
            <input
              type="text"
              placeholder="请输入企业名称"
              v-model="company_name"
              @input="verifyFn('company_name')"
            />
            <div class="verify">
              <Verify :hint="hint.company_name"></Verify>
            </div>
          </div>
          <button class="apply-btn" @click="submitApply($event)">
            提交申请
          </button>
        </div>
        <div class="hint-msg">{{ hintMag }}</div>
        <div class="backLogin" @click="backLogin">返回登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import { get_TestNum } from "../../assets/service/userInfoService.js";
import verify from "../../components/common/verify.vue";
import { clearTimeout } from "timers";
export default {
  data() {
    return {
      username: null,
      phone: null,
      company_name: null,
      hintMag: null,
      hint: {
        nickname: {
          icon: -1,
          msg: ""
        },
        phone: {
          icon: -1,
          msg: ""
        },
        company_name: {
          icon: -1,
          msg: ""
        }
      },
      styles: null
    };
  },
  methods: {
    setHeight(val) {
      this.styles.setProperty("--WrapH", val + "px");
      this.styles.setProperty("--DomH", val + "px");
    },
    submitApply(e) {
      if (
        this.hint.nickname.icon == 1 ||
        this.hint.phone.icon == 1 ||
        this.hint.company_name.icon
      ) {
        this.hintMag = "请完善信息";
      } else {
        get_TestNum(this.username, this.phone, this.company_name).then(res => {
          console.log(res);
          if (res.err_code == 0) {
            e.target.disabled = true;
            this.styles.setProperty("--apply_btn", "rgba(203, 193, 189, 1)");
            this.hintMag = "申请已提交,请等待客服联系!";
            let timeID = setTimeout(() => {
              this.$router.push("/login");
              clearTimeout(timeID);
            }, 3000);
          }
        });
      }
    },
    verifyFn(str) {
      switch (str) {
        //验证昵称
        case "nickname":
          if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.username)) {
            this.hint.nickname.icon = 0;
            this.hint.nickname.msg = "";
          } else {
            this.hint.nickname.icon = 1;
            this.hint.nickname.msg = "仅支持中英文输入";
          }
          break;
        //验证手机号码
        case "phone":
          if (/^1[34578]\d{9}$/.test(this.phone)) {
            this.hint.phone.icon = 0;
            this.hint.phone.msg = "";
          } else {
            this.hint.phone.icon = 1;
            this.hint.phone.msg = "请输入正确的手机号";
          }
          break;
        //验证企业名称
        case "company_name":
          if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.company_name)) {
            this.hint.company_name.icon = 0;
            this.hint.company_name.msg = "";
          } else {
            this.hint.company_name.icon = 1;
            this.hint.company_name.msg = "仅支持中英文输入";
          }
          break;
      }
    },
    // 返回登录
    backLogin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.styles = this.$el.style;
    this.styles.setProperty("--apply_btn", "rgba(255, 119, 62, 1)");
  },
  components: {
    Verify: verify
  }
};
</script>
<style scoped lang="scss">
.apply-wrap {
  width: 100%;
  height: 100%;
  // background: url("../../../public/img/login/loginBackground.svg");
  // background-size: cover;
  // background-position-y: 90%;
  // background-repeat: no-repeat;
  background: rgba(201, 196, 194, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  .apply-content {
    width: 62.5%;
    height: 63.89%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16px rgba(125, 38, 0, 0.16);
    opacity: 1;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .l-wrap {
      width: 37.5%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: url("/oplan/img/login/registerBar2.png");
      background-size: 115%;
      background-repeat: no-repeat;
      background-position: 50%;
    }
    .r-wrap {
      width: 62.5%;
      height: 100%;
      .t-wrap {
        width: 100%;
        height: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
      }
      .b-wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
        .input-item {
          width: 60%;
          display: flex;
          margin-top: 20px;
          position: relative;
          &:first-child {
            margin-top: 0;
          }
          p {
            width: 25%;
            height: 40px;
            line-height: 40px;
            text-align: right;
            padding-right: 20px;
            font-size: var(--titleSix);
          }
          input {
            font-size: 14px;
            width: 60%;
            height: 40px;
            border: none;
            outline: none;
            padding-left: 20px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255, 197, 127, 1);
            -web-kit-appearance: none;
            -moz-appearance: none;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            box-shadow: 0 0 0 60px #fff inset;
            -webkit-text-fill-color: #878787;
          }
          .verify {
            position: absolute;
            top: 0;
            right: -30%;
            width: 40%;
            height: 40px;
            line-height: 40px;
            transition: all 2s;
            font-size: 12px;
          }
          .fade-enter-active,
          .fade-leave-active {
            transition: opacity 0.5s;
          }
          .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
          }
        }
        .remember-code {
          width: 100%;
          margin-top: 10px;
          margin-left: 40%;
        }
        .apply-btn {
          width: 140px;
          height: 40px;
          border-radius: 25px;
          margin-top: 39px;
          background: #fff;
          border: 1px solid #ff773e;
          outline: none;
          cursor: pointer;
          color: #ff773e;
          font-size: 14px;
          &:hover {
            background-color: #bcf9ef;
          }
          &:active {
            color: #fff;
            background-color: #ff773e;
          }
        }
      }
    }
  }
  .hint-msg {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: rgba(45, 202, 147, 1);
  }
  .backLogin {
    float: right;
    margin-right: 50px;
    font-size: var(--titleSix);
    cursor: pointer;
    color: rgba(164, 150, 145, 1);
    &:after {
      content: ">>";
      margin-left: 10px;
    }
    &:hover {
      color: #000000;
    }
  }
}
</style>
