function verifyFn(str, that) {
  console.log(str);
  switch (str) {
    //验证昵称
    case "nickname":
      if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(that.nickname)) {
        that.hint.nickname = "";
      } else {
        that.hint.nickname = "仅支持中英文输入";
      }
      break;
    //验证手机号码
    case "phone":
      if (/^1[34578]\d{9}$/.test(that.phone)) {
        that.hint.phone = "";
        that.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
      } else {
        that.hint.phone = "手机号码有误";
      }
      break;
    //验证企业名称
    case "companyName":
      if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(that.companyName)) {
        that.hint.companyName = "";
      } else {
        that.hint.companyName = "仅支持中英文输入";
      }
      break;
  }
}

class Hint {
  constructor() {
    this.icon = -1;
    this.message = "";
  }
}
export { Hint, verifyFn };
