/**
 * 表格设置数据
 */
import { set_tableData } from "../../service/wpSimluateService";
export default {
  data() {
    return {
      inputVal: null,
      showInput: false, //是否显示
      locationX: null,
      locationY: null
    };
  },
  methods: {
    //设置input的位置
    set_inputVal(e, y, x, val) {
      console.log(e, y, x, val);
      this.styles.setProperty("--inputTop", e.target.offsetTop + "px");
      this.styles.setProperty("--inputLeft", e.target.offsetLeft + "px");
      this.inputVal = val;
      this.showInput = true;
      this.locationX = x;
      this.locationY = y;
    },
    //提交表格的修改
    submitInput(val) {
      if (val) {
        if (val.keyCode == 13) {
          this.showInput = false;
          this.set_tableData();
        }
      } else {
        this.showInput = false;
      }
    },
    //修改表格的值
    set_tableData() {
      set_tableData(
        this.locationY,
        this.locationX,
        parseInt(this.inputVal),
        this.visible_tableStart
      )
        .then(res => {
          if (res.err_code == 0) {
            this.tableData.data[this.locationY][this.locationX].value =
              res.value.value;
            this.tableData.data[this.locationY][this.locationX].status =
              res.value.status;
            //更新图表,全局点击后会初始化状态，所以不用在其他地方恢复状态
            this.$store.commit("set_globalFlag", 401);
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "修改失败，请稍后重试"
          });
          console.warn(error);
        });
    }
  }
};
