<template>
  <div class="register-wrap">
    <div class="register-content">
      <div class="l-wrap"></div>
      <div class="r-wrap">
        <div class="t-wrap">ORAIT云平台账号注册</div>
        <div class="b-wrap">
          <div class="input-item">
            <p>昵称</p>
            <input
              type="text"
              placeholder="请输入昵称"
              v-model="nickname"
              @input="verifyNickname"
            />
            <div class="verify"><Verify :hint="hint.nickname"></Verify></div>
          </div>
          <div class="input-item">
            <p>密码</p>
            <input
              class="password"
              type="password"
              placeholder="请设置密码"
              v-model="password"
              @input="verifyPassword()"
              @blur="verifyPass"
              @focus="outpull = 0"
            />
            <!-- 眼睛-->
            <i
              :class="{
                eye: true,
                iconfont: true,
                'icon-yanjing1': eyeIcon == 1,
                'icon-biyan': eyeIcon == 0
              }"
              @click="changeEye()"
            ></i>
            <div class="verify"><Verify :hint="hint.password"></Verify></div>
          </div>
          <div class="input-item">
            <p>手机号码</p>
            <input
              type="text"
              placeholder="请输入手机号"
              v-model="phone"
              @input="verifyPhone"
            />
            <transition name="fade">
              <div class="verify"><Verify :hint="hint.phone"></Verify></div>
            </transition>
          </div>
          <div class="input-item">
            <p>验证码</p>
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="verifyCode"
              @input="verifyIsCode"
            />
            <button
              class="validate-btn"
              :disabled="validateDis"
              @click="get_verifyCode"
            >
              {{ btnText }}
            </button>
            <transition name="fade">
              <div class="verify">
                <Verify :hint="hint.verifyCode"></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>企业名称</p>
            <input
              type="text"
              placeholder="请输入企业名称"
              v-model="companyName"
              @input="verifyCompanyName"
            />
            <transition name="fade">
              <div class="verify">
                <Verify :hint="hint.companyName"></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>邀请码</p>
            <input
              type="text"
              placeholder="请输入体验邀请码"
              v-model="inviteCode"
              @input="inviteIsCode"
            />
            <transition name="fade">
              <div class="verify">
                <Verify :hint="hint.inviteCode"></Verify>
              </div>
            </transition>
          </div>
          <div class="verifyPassword" v-if="outpull == 0">
            <VerifyPassword :hint="hint.dblPassword"></VerifyPassword>
          </div>
          <button class="register-btn" @click="registerFn()">注册</button>
        </div>
        <div class="modal" v-show="register == true">{{ message }}</div>
        <div class="backLogin" @click="backLogin">返回登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import verify from "../../components/common/verify";
import verifyPassword from "./common/verifyPassword";
import { add_user, get_pin } from "../../assets/service/userInfoService.js";
export default {
  data() {
    return {
      nickname: "",
      password: "",
      outpull: null, //得到焦点
      phone: "",
      dblPassword: "",
      verifyCode: "",
      companyName: "",
      inviteCode: "",
      btnText: "获取验证码",
      validateDis: true, //禁用验证码按钮
      eyeIcon: 0, // 密码验证小眼睛
      register: false, //点击注册
      message: "", //注册发出的信息
      setInter: null, //验证码定时器
      hint: {
        nickname: {
          icon: -1,
          msg: ""
        },
        password: {
          icon: -1,
          msg: ""
        },
        phone: {
          icon: -1,
          msg: ""
        },
        verifyCode: {
          icon: -1,
          msg: ""
        },
        companyName: {
          icon: -1,
          msg: ""
        },
        inviteCode: {
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
      //样式改变
      this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
      this.validateDis = true; // 禁用
      let i = 60;
      this.setInter = setInterval(() => {
        if (i != 0) {
          i = i - 1;
          this.btnText = `${i}s后重发`;
        } else {
          this.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
          this.btnText = "获取验证码";
          clearInterval(this.setInter);
          this.setInter = null;
          this.validateDis = false; //获取验证码按钮可用
        }
      }, 1000);
      //首先验证验证码
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
    //注册
    registerFn() {
      this.verifyNickname();
      this.verifyPass();
      this.verifyCompanyName();
      this.verifyIsCode();
      this.inviteIsCode();
      //点击调用接口
      if (
        this.hint.nickname.icon == 0 &&
        this.hint.password.icon == 0 &&
        this.hint.phone.icon == 0 &&
        this.hint.companyName.icon == 0 &&
        this.hint.inviteCode.icon == 0 &&
        this.verifyCode.length != 0
      ) {
        add_user(
          this.nickname,
          this.password,
          this.phone,
          this.verifyCode,
          this.companyName,
          this.inviteCode
        ).then(res => {
          // if (res.err_code != 0) {
          //   // 注册失败 显示错误信息
          //   this.register = true;
          //   this.message = res.msg;
          //   return false;
          // } else {
          //   //注册成功 还有3秒跳到登录页面
          //   this.register = true;
          //   let i = 3;
          //   let timeId = setInterval(() => {
          //     this.message = `恭喜您，注册成功！${i}秒后自动跳到登录页面`;
          //     i--;
          //     if (i == 0) {
          //       clearInterval(timeId);
          //       this.register = false;
          //       window.location.href = "/login.html";
          //     }
          //   }, 1000);
          // }
          if (res.err_code == 0) {
            //注册成功 还有3秒跳到登录页面
            this.register = true;
            let i = 3;
            let timeId = setInterval(() => {
              this.message = `注册成功！${i}秒后自动跳到登录页面`;
              i--;
              if (i == 0) {
                clearInterval(timeId);
                this.register = false;
                window.location.href = "/login.html";
              }
            }, 1000);
          } else {
            // 注册失败 显示错误信息
            this.register = true;
            this.message = res.msg;
            return false;
          }
        });
      } else {
        this.message = "请完善您的信息";
        return false;
      }
    },
    //验证
    verifyNickname() {
      if (this.nickname.length == 0) {
        this.hint.nickname.icon = 1;
        this.hint.nickname.msg = "昵称不能为空";
      } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.nickname)) {
        this.hint.nickname.icon = 1;
        this.hint.nickname.msg = "仅支持中英文输入";
      } else if (!(this.nickname.length >= 2 && this.nickname.length <= 32)) {
        this.hint.nickname.icon = 1;
        this.hint.nickname.msg = "昵称长度应在2-32位";
      } else {
        this.hint.nickname.icon = 0;
        this.hint.nickname.msg = "";
      }
    },
    verifyPass() {
      this.outpull = 1;
      if (this.password.length == 0) {
        this.hint.password.icon = 1;
        this.hint.password.msg = "密码不能为空";
      } else if (
        !/^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.password) ||
        !(this.password.length >= 8 && this.password.length <= 32) ||
        /[\s]/.test(this.password) ||
        /^123456ab$/.test(this.password) ||
        /^12345abc$/.test(this.password) ||
        /^1234567a$/.test(this.password) ||
        /^a1234567$/.test(this.password) ||
        /^ab123456$/.test(this.password) ||
        /^abc12345$/.test(this.password) ||
        /^1111111a$/.test(this.password) ||
        /^a1111111$/.test(this.password)
      ) {
        this.hint.password.icon = 1;
        this.hint.password.msg = "请按正确的格式输入密码";
      } else {
        this.hint.password.icon = 0;
        this.hint.password.msg = "";
      }
    },
    verifyPhone() {
      if (this.phone.length == 0) {
        this.hint.phone.icon = 1;
        this.hint.phone.msg = "手机号不能为空";
      } else if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.hint.phone.icon = 1;
        this.hint.phone.msg = "请输入正确的手机号";
      } else {
        this.hint.phone.msg = "";
        this.hint.phone.icon = 0;
        if (this.btnText == "获取验证码") {
          this.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
          this.validateDis = false;
        } else {
          this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
          this.validateDis = true;
        }
      }
    },
    verifyCompanyName() {
      if (this.companyName.length == 0) {
        this.hint.companyName.icon = 1;
        this.hint.companyName.msg = "企业名不能为空";
      } else if (
        /^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.companyName) &&
        this.companyName.length != 0
      ) {
        this.hint.companyName.icon = 0;
        this.hint.companyName.msg = "";
      } else {
        this.hint.companyName.icon = 1;
        this.hint.companyName.msg = "仅支持中英文输入";
      }
    }, //验证码
    verifyIsCode() {
      if (this.verifyCode.length == 0) {
        this.hint.verifyCode.msg = "验证码不能为空";
        this.hint.verifyCode.icon = 1;
      } else {
        this.hint.verifyCode.msg = "";
        this.hint.verifyCode.icon = 1;
      }
    }, //邀请码
    inviteIsCode() {
      if (this.inviteCode.length == 0) {
        this.hint.inviteCode.icon = 1;
        this.hint.inviteCode.msg = "邀请码不能为空";
      } else if (
        this.inviteCode == "orait-A" ||
        this.inviteCode == "orait-B" ||
        this.inviteCode == "orait-C" ||
        this.inviteCode == "orait-D" ||
        this.inviteCode == "orait-E" ||
        this.inviteCode == "orait-F" ||
        this.inviteCode == "orait-G"
      ) {
        this.hint.inviteCode.icon = 0;
        this.hint.inviteCode.msg = "";
      } else {
        this.hint.inviteCode.icon = 1;
        this.hint.inviteCode.msg = "邀请码错误";
      }
    },
    //验证密码
    verifyPassword() {
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.password)) {
        this.hint.dblPassword.icon1 = 1;
      } else {
        this.hint.dblPassword.icon1 = 0;
      }
      if (!(this.password.length >= 8 && this.password.length <= 32)) {
        this.hint.dblPassword.icon2 = 1;
      } else {
        this.hint.dblPassword.icon2 = 0;
      }
      if (/[\s]/.test(this.password)) {
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
          /^123456ab$/.test(this.password) ||
          /^12345abc$/.test(this.password) ||
          /^1234567a$/.test(this.password) ||
          /^a1234567$/.test(this.password) ||
          /^ab123456$/.test(this.password) ||
          /^abc12345$/.test(this.password) ||
          /^1111111a$/.test(this.password) ||
          /^a1111111$/.test(this.password)
        ) {
          this.hint.dblPassword.icon4 = 1;
        } else {
          this.hint.dblPassword.icon4 = 0;
        }
      } else {
        this.hint.dblPassword.icon4 = 1;
      }
      if (this.password.length == 0) {
        this.hint.dblPassword.icon1 = 1;
        this.hint.dblPassword.icon2 = 1;
        this.hint.dblPassword.icon3 = 1;
        this.hint.dblPassword.icon4 = 1;
      }
    },

    // 返回登录
    backLogin() {
      this.$router.push("/login");
    },
    //点击变眼睛
    changeEye() {
      let password1 = document.getElementsByClassName("password")[0];
      if (this.eyeIcon == 0) {
        this.eyeIcon = 1;
        password1.setAttribute("type", "text");
      } else if (this.eyeIcon == 1) {
        this.eyeIcon = 0;
        password1.setAttribute("type", "password");
      }
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
.register-wrap {
  width: 100%;
  height: 100%;
  background: rgba(201, 196, 194, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  .register-content {
    width: 62.5%;
    height: 63.89%;
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
          margin-top: 2%;
          display: flex;
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
            right: -32%;
            width: 40%;
            height: 40px;
            line-height: 40px;
            transition: all 2s;
            font-size: 12px;
          }
          // 眼睛的样式
          i.eye {
            font-size: 22px;
            opacity: 1;
            margin-left: -22px;
            cursor: pointer;
            line-height: 40px;
          }
          .fade-enter-active,
          .fade-leave-active {
            transition: opacity 0.5s;
          }
          .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
          }
        }
        // 密码验证框
        .verifyPassword {
          position: absolute;
          top: 35px;
          right: 35px;
          width: 150px;
          height: 100px;
          display: flex;
          line-height: 20px;
          transition: all 2s;
          font-size: 12px;
        }
        .input-item:nth-child(4) {
          input {
            width: 35%;
          }
          .validate-btn {
            width: 80px;
            height: 30px;
            margin-top: 1%;
            border-width: 0px;
            border-radius: 25px;
            background: var(--btnColor);
            outline: none;
            cursor: pointer;
            color: #fff;
            font-size: 12px;
          }
        }
        .remember-code {
          width: 100%;
          margin-left: 40%;
        }
        .register-btn {
          width: 15%;
          height: 35px;
          border-radius: 25px;
          margin-top: 39px;
          background: #fff;
          border: 1px solid #58edd9;
          outline: none;
          cursor: pointer;
          color: #58edd9;
          font-size: 14px;
          &:hover {
            background-color: #bcf9ef;
          }
          &:active {
            color: #fff;
            background-color: #58edd9;
          }
        }
      }
      .modal {
        width: 100%;
        text-align: center;
        color: #58edd9;
        position: absolute;
        bottom: 10%;
        font-size: 18px;
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
    }
  }
}
</style>
