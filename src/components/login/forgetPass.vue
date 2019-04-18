<template>
  <div class="apply-wrap">
    <div class="apply-content">
      <div class="l-wrap"></div>
      <div class="r-wrap">
        <div class="t-wrap">重置登录密码</div>
        <div class="m-wrap">
          <div class="progress-item">
            <i
              :class="{
                iconfont: true,
                'icon-yunpingtaidenglu-zhengque': progress.userHint == true,
                'icon-wait': progress.userHint == false
              }"
            ></i>
            <p>账号验证</p>
          </div>
          <div class="line"></div>
          <div class="progress-item">
            <i
              :class="{
                iconfont: true,
                'icon-yunpingtaidenglu-zhengque': progress.resetPass == true,
                'icon-wait': progress.resetPass == false
              }"
            ></i>
            <p>重置密码</p>
          </div>
          <div class="line"></div>
          <div class="progress-item">
            <i
              :class="{
                iconfont: true,
                'icon-yunpingtaidenglu-zhengque': progress.resetSuccess == true,
                'icon-wait': progress.resetSuccess == false
              }"
            ></i>
            <p>重置成功</p>
          </div>
        </div>
        <!-- 替换页面 -->
        <div class="b-wrap">
          <div class="userHint" v-show="progressFlag == 0">
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
              <p>验证码</p>
              <input type="text" placeholder="请输入验证码" v-model="vcode" />
              <button
                class="validate-btn"
                :disabled="validateDis"
                @click="get_verifyCode"
              >
                {{ btnText }}
              </button>
            </div>
            <button class="apply-btn" @click="userHintFn">下一步</button>
          </div>
          <div class="resetPass" v-show="progressFlag == 1">
            <div class="input-item">
              <p>新密码</p>
              <input
                type="password"
                placeholder="请输入新密码"
                v-model="new_password"
                @input="verifyPassword()"
                @blur="verifyFn('new_password')"
                @focus="outpull = 0"
                id="password1"
              />
              <i
                :class="{
                  eye: true,
                  iconfont: true,
                  'icon-yanjing1': eyeIcon_one == 1,
                  'icon-biyan': eyeIcon_one == 0
                }"
                @click="changeEye('eyeIcon_one')"
              ></i>
              <div class="verify">
                <Verify :hint="hint.new_password"></Verify>
              </div>
            </div>
            <div class="input-item">
              <p>确认密码</p>
              <input
                type="password"
                placeholder="请确认密码"
                v-model="verify_password"
                @input="verifyFn('verify_password')"
                id="password2"
              />
              <i
                :class="{
                  eye: true,
                  iconfont: true,
                  'icon-yanjing1': eyeIcon_two == 1,
                  'icon-biyan': eyeIcon_two == 0
                }"
                @click="changeEye('eyeIcon_two')"
              ></i>
              <div class="verify">
                <Verify :hint="hint.verify_password"></Verify>
              </div>
            </div>
            <div class="verifyPassword" v-if="outpull == 0">
              <VerifyPassword :hint="hint.dblPassword"></VerifyPassword>
            </div>
            <button class="apply-btn" @click="resetPassFn">下一步</button>
          </div>
          <div class="resetSuccess" v-show="progressFlag == 2">
            <p>设置成功，请牢记新密码</p>
            <button class="apply-btn" @click="resetSuccessFn">完成</button>
          </div>
        </div>
        <div class="backLogin" @click="backLogin">返回登录</div>
        <div class="modal" v-show="next == true">{{ message }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import verify from "../../components/common/verify.vue";
import verifyPassword from "./common/verifyPassword";
import {
  get_pin,
  check_pn,
  change_pw
} from "../../assets/service/userInfoService.js";
export default {
  data() {
    return {
      // username: null,
      new_password: "", //新密码
      verify_password: "", // 第二次输入的新密码
      eyeIcon_one: 0, //第一个小眼睛
      eyeIcon_two: 0, // 第二个小眼睛
      outpull: null, //得到焦点
      phone: null,
      cpn: "", //验证
      next: false, //下一步的提示框
      message: "",
      progress: {
        userHint: true,
        resetPass: false,
        resetSuccess: false
      },
      validateDis: true, //禁用验证码
      btnText: "获取验证码",
      styles: null,
      progressFlag: 0,
      vcode: "", //验证码
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
        },
        new_password: {
          icon: -1,
          msg: ""
        },
        verify_password: {
          icon: -1,
          msg: ""
        },
        dblPassword: {
          icon1: -2,
          icon2: -2,
          icon3: -2,
          icon4: -2
        }
      }
    };
  },
  methods: {
    setHeight(val) {
      this.styles.setProperty("--WrapH", val + "px");
      this.styles.setProperty("--DomH", val + "px");
    },
    //获取验证码
    get_verifyCode() {
      this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
      this.validateDis = true;
      let i = 60;
      let setInter = setInterval(() => {
        if (i != 0) {
          i = i - 1;
          this.btnText = `${i}s后重发`;
        } else {
          this.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
          this.validateDis = false;
          this.btnText = "获取验证码";
          clearInterval(setInter);
        }
      }, 1000);
      //发送验证码请求
      get_pin(this.phone).then(res => {
        if (res.err_code != 0) {
          //错误手机号
          this.hint.phone.msg = res.msg;
          this.hint.phone.icon = 1;
        } else {
          this.hint.phone.msg = "";
          this.hint.phone.icon = 0;
        }
      });
    },
    // 手机号 密码验证
    verifyFn(str) {
      switch (str) {
        case "phone":
          if (/^1[34578]\d{9}$/.test(this.phone)) {
            this.hint.phone.icon = 0;
            this.hint.phone.msg = "";
            if (this.btnText == "获取验证码") {
              this.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
              this.validateDis = false;
            }
          } else {
            this.hint.phone.icon = 1;
            this.hint.phone.msg = "请输入正确的手机号";
            this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
            this.validateDis = true;
          }
          break;
        case "new_password":
          this.outpull = 1;
          if (
            !/^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.new_password) ||
            !(this.new_password.length > 8 && this.new_password.length < 32) ||
            /[\s]/.test(this.new_password) ||
            /^123456ab$/.test(this.new_password) ||
            /^12345abc$/.test(this.new_password) ||
            /^1234567a$/.test(this.new_password) ||
            /^a1234567$/.test(this.new_password) ||
            /^ab123456$/.test(this.new_password) ||
            /^abc12345$/.test(this.new_password) ||
            /^1111111a$/.test(this.new_password) ||
            /^a1111111$/.test(this.new_password)
          ) {
            this.hint.new_password.icon = 1;
            this.hint.new_password.msg = "请按正确的格式输入密码";
          } else {
            this.hint.new_password.icon = 0;
            this.hint.new_password.msg = "";
          }

          break;
        case "verify_password":
          if (
            this.verify_password != this.new_password ||
            this.new_password.length == 0
          ) {
            this.hint.verify_password.icon = 1;
            this.hint.verify_password.msg = "两次输入的密码不一致";
          } else {
            this.hint.verify_password.icon = 0;
            this.hint.verify_password.msg = "";
          }
      }
    },
    //手机号验证 下一步
    userHintFn() {
      //验证码接口  获取手机号验证码  跟手机号匹配需要接口
      if (this.hint.phone.icon == 0 && this.vcode.length > 0) {
        check_pn(this.phone, this.vcode).then(res => {
          if (res.err_code == 0) {
            this.next = false;
            this.cpn = res.data.cpn;
            this.progressFlag = 1;
            this.progress.resetPass = true;
          } else {
            this.next = true;
            this.message = "验证错误，请重新填写";
          }
        });
      } else {
        this.next = true;
        this.message = "请正确填写手机号和验证码";
      }
    },
    //验证密码2
    verifyPassword() {
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.new_password)) {
        this.hint.dblPassword.icon1 = 1;
      } else {
        this.hint.dblPassword.icon1 = 0;
      }
      if (!(this.new_password.length > 8 && this.new_password.length < 32)) {
        this.hint.dblPassword.icon2 = 1;
      } else {
        this.hint.dblPassword.icon2 = 0;
      }
      if (/[\s]/.test(this.new_password)) {
        this.hint.dblPassword.icon3 = 1;
      } else {
        this.hint.dblPassword.icon3 = 0;
      }
      if (
        this.hint.dblPassword.icon1 == 0 &&
        this.hint.dblPassword.icon2 == 0 &&
        this.hint.dblPassword.icon3 == 0
      ) {
        if (
          /^123456ab$/.test(this.new_password) ||
          /^12345abc$/.test(this.new_password) ||
          /^1234567a$/.test(this.new_password) ||
          /^a1234567$/.test(this.new_password) ||
          /^ab123456$/.test(this.new_password) ||
          /^abc12345$/.test(this.new_password) ||
          /^1111111a$/.test(this.new_password) ||
          /^a1111111$/.test(this.new_password)
        ) {
          this.hint.dblPassword.icon4 = 1;
        } else {
          this.hint.dblPassword.icon4 = 0;
        }
      } else {
        this.hint.dblPassword.icon4 = 1;
      }
      if (this.new_password.length == 0) {
        this.hint.dblPassword.icon1 = 1;
        this.hint.dblPassword.icon2 = 1;
        this.hint.dblPassword.icon3 = 1;
        this.hint.dblPassword.icon4 = 1;
      }
    },
    //改变小眼睛
    changeEye(str) {
      let password_one = document.getElementById("password1");
      let password_two = document.getElementById("password2");
      switch (str) {
        case "eyeIcon_one":
          if (this.eyeIcon_one == 0) {
            this.eyeIcon_one = 1;
            password_one.setAttribute("type", "text");
          } else if (this.eyeIcon_one == 1) {
            this.eyeIcon_one = 0;
            password_one.setAttribute("type", "password");
          }
          break;
        case "eyeIcon_two":
          if (this.eyeIcon_two == 0) {
            this.eyeIcon_two = 1;
            password_two.setAttribute("type", "text");
          } else if (this.eyeIcon_two == 1) {
            this.eyeIcon_two = 0;
            password_two.setAttribute("type", "password");
          }
          break;
      }
    },
    //重置密码
    resetPassFn() {
      if (
        this.hint.new_password.icon == 0 &&
        this.hint.verify_password.icon == 0
      ) {
        //缺一个修改密码的接口
        change_pw(this.new_password, this.cpn).then(res => {
          if (res.err_code == 0) {
            this.next = false;
            this.progressFlag = 2;
            this.progress.resetSuccess = true;
          } else {
            this.next = true;
            this.message = res.msg;
          }
        });
      } else {
        return false;
      }
    },
    resetSuccessFn() {
      this.$router.replace("/login");
    },
    // 返回登录
    backLogin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.styles = this.$el.style;
    this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
  },
  components: {
    Verify: verify,
    VerifyPassword: verifyPassword
  }
};
</script>
<style scoped lang="scss">
@mixin hint {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
      font-size: 16px;
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
      .oraitVerify {
        padding-left: 10px;
      }
    }
    i.eye {
      font-size: 22px;
      opacity: 1;
      margin-left: -22px;
      cursor: pointer;
      line-height: 40px;
    }
  }
  .verifyPassword {
    position: absolute;
    top: 80px;
    right: 35px;
    width: 150px;
    height: 100px;
    display: flex;
    line-height: 20px;
    transition: all 2s;
    font-size: 12px;
  }
  .apply-btn {
    width: 18%;
    height: 40px;
    border-width: 0px;
    border-radius: 25px;
    margin-top: 39px;
    background: #fff;
    border: 1px solid #58edd9;
    outline: none;
    cursor: pointer;
    color: #58edd9;
    font-size: 15px;
    &:hover {
      background-color: #bcf9ef;
    }
    &:active {
      color: #fff;
      background-color: #58edd9;
    }
  }
}
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
    width: 1200px;
    height: 690px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16px rgba(125, 38, 0, 0.16);
    opacity: 1;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    .l-wrap {
      width: 37.5%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: url("/oraitStatic/img/login/registerBar2.png");
      background-size: 115%;
      background-repeat: no-repeat;
      background-position: 50%;
    }
    .r-wrap {
      width: 62.5%;
      height: 100%;
      position: relative;
      .t-wrap {
        width: 100%;
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
      }
      .m-wrap {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-wait {
          color: rgba(112, 112, 112, 1);
        }
        .icon-yunpingtaidenglu-zhengque {
          color: rgba(45, 202, 147, 1);
        }
        .progress-item {
          width: 10%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            font-size: 34px;
          }
          p {
            font-size: 14px;
            margin-top: 10px;
          }
        }
        .line {
          background: rgba(203, 193, 189, 1);
          width: 10%;
          height: 2px;
          margin-bottom: 3%;
        }
      }
      .b-wrap {
        width: 100%;
        height: 50%;
        .userHint {
          @include hint;
          .input-item:nth-child(2) {
            input {
              width: 35%;
            }
            .validate-btn {
              width: 20%;
              height: 30px;
              margin-left: 2%;
              border-width: 0px;
              border-radius: 25px;
              background: var(--btnColor);
              outline: none;
              cursor: pointer;
              color: #fff;
              font-size: 14px;
            }
          }
        }
        .resetPass {
          @include hint;
        }
        .resetSuccess {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            font-size: 16px;
            color: rgba(203, 193, 189, 1);
            margin-bottom: 5%;
          }
          .apply-btn {
            width: 18%;
            height: 40px;
            border-width: 0px;
            border-radius: 25px;
            margin-top: 39px;
            background: #fff;
            border: 1px solid #58edd9;
            outline: none;
            cursor: pointer;
            color: #58edd9;
            font-size: 15px;
            &:hover {
              background-color: #bcf9ef;
            }
            &:active {
              color: #fff;
              background-color: #58edd9;
            }
          }
        }
      }
      .backLogin {
        float: right;
        margin-top: 20px;
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
      .modal {
        width: 100%;
        text-align: center;
        color: #ff773e;
        position: absolute;
        bottom: 20%;
        font-size: 18px;
      }
    }
  }
}
</style>
