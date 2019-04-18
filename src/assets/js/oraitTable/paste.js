/**
 * 表格粘贴功能
 */
export default {
  data() {
    return {
      //复制粘贴
      rectStart: [],
      rectEnd: [],
      rectFlag: -1,
      pasteValue: null, //绑定input，粘贴的值会传到这里
      showPasteInput: false
    };
  },
  watch: {
    pasteValue(val) {
      if (val.length != 0) {
        let arr = val.split(" ");
        let newArr = [];
        arr.forEach(ele => {
          newArr = newArr.concat(ele.split("	"));
        });
        let rectArr = [];
        /**
         * 首先认识到矩阵其实就是二维数据
         * 【0，1】 0为 Y 轴，1为 X 轴
         * 第一个for循环为定义X轴，
         * 第二个for循环为定义Y轴
         * 我们每次是固定Y轴，去取x轴的坐标点
         */
        for (let i = 0; i <= this.rectEnd[1] - this.rectStart[1]; i++) {
          for (let j = 0; j <= this.rectEnd[0] - this.rectStart[0]; j++) {
            rectArr.push([this.rectStart[0] + j, this.rectStart[1] + i]);
          }
        }
        newArr.forEach((val, index) => {
          //在列表是循环里是以行循环的，所以X轴在先
          //这里取数据需要先取X轴，再取Y轴
          this.tableData.data[rectArr[index][1]][rectArr[index][0]].value = val;
        });
      }
    }
  },
  methods: {
    //获得矩阵起始点
    get_rectStart(x, y) {
      this.rectFlag = 0;
      this.rectStart = [x, y];
      this.showPasteInput = false;
      this.pasteValue = null;
      console.log(x, y);
    },
    //获得矩阵结束点
    get_rectMove(x, y) {
      if (this.rectFlag == 0) {
        this.rectEnd = [x, y];
      }
    },
    //获得矩阵结束点
    get_rectEnd(x, y) {
      this.rectFlag = -1;
      this.rectEnd = [x, y];
      this.showPasteInput = true;
    }
  }
};
