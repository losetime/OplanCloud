import http from "./http";

let result = null;
//获取文件
async function get_fileList() {
  // let SID = localStorage.getItem("SID");
  await http.get(`/fileList`).then(res => {
    result = res.data;
  });
  return result;
}
//回收站文件列表接口
async function get_trashFileList() {
  await http.get(`/fileList?recycle=1`).then(res => {
    result = res.data;
  });
  return result;
}
//回收站恢复接口
async function get_restore(SID) {
  await http
    .post(`/recoverFile?sid=${SID}`, {
      recover: 1
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//回收站永久删除接口
async function permanently_restore(SID) {
  await http
    .post(`/fDeleteFile?sid=${SID}`, {
      f_delete: 1
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//重命名接口
async function set_fileName(SID, title) {
  await http
    .post(`/fileName?sid=${SID}`, {
      file_name: title
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//文件软删除
async function del_file_shallow(SID) {
  await http
    .post(`/deleteFile?sid=${SID}`, {
      delete: 1
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//获取潮流线数据数据
async function getNetWork() {
  await http
    .get(`http://192.168.31.16:5000/pvplant/getInfo`)
    .then(res => {
      result = res.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  return result;
}

//获取潮流节点数据
async function getTransformerSubPoint() {
  await http
    .get(`http://192.168.31.16:5000/pvplant/getStationInfoNew`)
    .then(res => {
      result = res.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  return result;
}
//获取地区数据
async function getRegion(val) {
  await http
    .get(`/pvplant/getId?id=${val}`)
    .then(res => {
      result = res.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  return result;
}
export {
  get_fileList,
  get_trashFileList,
  get_restore,
  permanently_restore,
  set_fileName,
  del_file_shallow,
  getNetWork,
  getTransformerSubPoint,
  getRegion
};
