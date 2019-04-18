export default class Unit {
  constructor() {
    this.xAxisData = [];
  }
  filesIn(obj, arg, that) {
    //显示loading动画
    that.$store.commit("set_loading", true);
    var files = obj.target.files;
    let type = files[0].name.split(".")[1];
    if (type != "xls" && type != "xlsx" && type != "csv" && type != "et") {
      //置空value值，否则下次相同文件名不会触发change事件
      that.$refs[arg].value = null;
      that.$store.commit("set_loading", false);
      //提示信息显示
      that.list[0].messageShow.boxShow = true;
    } else {
      // 实例化FormData 对象
      that.formdata = new FormData();
      //这里的file需要跟后台接收参数保持一致
      that.formdata.append("file", files[0]);
      //置空value值，否则下次相同文件名不会触发change事件
      that.$refs[arg].value = null;
      that.$emit("uploadFile", that.formdata);
    }
  }
}
