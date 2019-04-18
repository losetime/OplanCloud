import http from "./http";
let result = null;

//潮流图数据
async function netWorkData() {
  //电网潮流图
  await http
    .get("http://192.168.31.105/orait_zero_n/public/pfs/scheduling")
    .then(res => {
      result = res.data;
    });
  return result;
}
//获取表格数据
async function get_tableData(start, count) {
  let SID = localStorage.getItem("SID");
  if (SID != null) {
    await http
      .get(`/table?sid=${SID}&start=${start}&count=${count}`)
      .then(res => {
        result = res.data;
      });
  }
  return result;
}
//双击设置表格数据
async function set_tableData(y, x, val, start) {
  let SID = localStorage.getItem("SID");
  await http
    .post(`/singleData?sid=${SID}`, {
      y: y,
      x: x,
      value: val,
      start: start
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//K线图
//日-D 周-W 月-M 年-A
// async function get_kline(arg) {
//   let SID = localStorage.getItem("SID");
//   await http.get(`/boxplot?sid=${SID}&scale=${arg}`).then(res => {
//     result = res.data;
//   });
//   return result;
// }
async function get_kline(arg) {
  await http.get(`/Kdiagram?sid=20190307121147288&scale=${arg}`).then(res => {
    result = res.data;
  });
  return result;
}
//获得分时
async function get_timeshare(start, count) {
  let SID = localStorage.getItem("SID");
  await http
    .get(`/lineN?sid=${SID}&start=${start}&count=${count}`)
    .then(res => {
      result = res.data;
    });
  return result;
}
// async function get_timeshare(start, count) {
//   let SID = localStorage.getItem("SID");
//   await http
//     .get(
//       `https://www.easy-mock.com/mock/5c7e2f540a3b8c3d7b7b33bd/orait/timeShare`
//     )
//     .then(res => {
//       result = res.data;
//     });
//   return result;
// }

//开始模拟
async function start_parameter(endDate) {
  let SID = localStorage.getItem("SID");
  await http.get(`/simulation?sid=${SID}&endDate=${endDate}`).then(res => {
    result = res.data;
  });
  return result;
}
//上传文件
async function uploadFile(obj) {
  //http是自定义的axios实例
  let config = {
    headers: {
      "Content-Type": "multipart/from-data"
    }
  };
  await http.post(`/file`, obj, config).then(res => {
    result = res.data;
  });
  return result;
}

//风场信息
async function get_windSiteInfo() {
  let SID = localStorage.getItem("SID");
  await http.get(`/info?sid=${SID}`).then(res => {
    result = res.data;
  });
  return result;
}
//修复坏数据
async function repair_error() {
  let SID = localStorage.getItem("SID");
  await http.get(`/repairError?sid=${SID}`).then(res => {
    result = res.data;
  });
  return result;
}
//修复异常数据
async function repair_exception() {
  let SID = localStorage.getItem("SID");
  await http.get(`/repairException?sid=${SID}`).then(res => {
    result = res.data;
  });
  return result;
}
//获取标题
async function get_title() {
  let SID = localStorage.getItem("SID");
  await http.get(`/fileName?sid=${SID}`).then(res => {
    result = res.data;
  });
  return result;
}
//设置标题
async function set_title(title) {
  let SID = localStorage.getItem("SID");
  await http
    .post(`/fileName?sid=${SID}`, {
      file_name: title
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//导出文件
async function exportFile() {
  let SID = localStorage.getItem("SID");
  await http.get(`/to_excel?sid=${SID}`).then(res => {
    result = res.data;
  });
  return result;
}

export {
  netWorkData,
  get_tableData,
  set_tableData,
  get_kline,
  get_timeshare,
  start_parameter,
  uploadFile,
  repair_error,
  repair_exception,
  get_windSiteInfo,
  get_title,
  set_title,
  exportFile
};
