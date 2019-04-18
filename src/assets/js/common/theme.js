function setTheme() {
  let styles = document.body.style;
  // 系统主题色
  styles.setProperty("--systemColor", "#58EDD9"); //第一主题色
  styles.setProperty("--fontColor", "#A49691"); //第一字体颜色
  styles.setProperty("--btnColor", "rgba(228,228,228,1)"); //控件或按钮颜色
  styles.setProperty("--activeColor", "rgba(255,119,62,1)"); //选中颜色
  //系统字体图标等级
  styles.setProperty("--iconOne", "50px"); //字体图标一级
  styles.setProperty("--iconTwo", "30px"); //字体图标二级
  styles.setProperty("--iconThree", "20px"); //字体图标三级
  //系统字号
  styles.setProperty("--titleOne", "48px"); //一级标题
  styles.setProperty("--titleTwo", "36px"); //二级标题
  styles.setProperty("--titleThree", "24px"); //三级标题
  styles.setProperty("--titleFour", "18px"); //四级标题
  styles.setProperty("--titleFive", "16px"); //五级标题
  styles.setProperty("--titleSix", "14px"); //六级标题
  styles.setProperty("--titleSeven", "12px"); //七级标题
}
function setHeight(val) {
  let styles = document.body.style;
  styles.setProperty("--DomH", val + "px");
  styles.setProperty("--WrapH", val - 50 + "px");
}
let chartTheme = {
  chartColor: [
    "#FF9945",
    "#55ACEE",
    "#4CDFC0",
    "#FFE437",
    "#788CF0",
    "#2DCA93",
    "#FFC57F",
    "#5F73F3"
  ], //图表颜色
  axisColor: ["#7D6E68", "#ffffff"] //X轴和Y轴的颜色，第一个为light主题，第二个为dark主题
};
export { setTheme, setHeight, chartTheme };
