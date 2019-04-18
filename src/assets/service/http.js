import axios from "axios";

let retry = 0;
let token = localStorage.getItem("token");
let http = axios.create({
  //创建axiox实例并配置好全局公用信息
  baseURL: process.env.VUE_APP_wpSimluateURL, //基础URL
  // timeout: 5000, //超时限制
  headers: {
    Authorization: token
  }
});

// //请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     //这里主要是因为token会过期，所以需要动态获取
//     let token = localStorage.getItem("token");
//     config.headers.Authorization = token;
//     console.log(config);
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );

//响应拦截器
http.interceptors.response.use(
  async function(response) {
    /**
     * 当err_code==2000,说明token过期，首先获取refresh_token
     * 然后发送refresh_token去请求新的token
     * 如果返回了错误，直接跳回登录
     * 如果返回了正确，重新发数据的请求
     */
    let refreshToken = localStorage.getItem("refresh_token");
    if (response.data.err_code == 2000 && retry <= 8) {
      retry++;
      let config = response.config;
      // 这里需要把返回结果return出去，很重要
      return axios
        .post(process.env.VUE_APP_userInfoURL + "/token/refresh-token", {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.data.err_code == 0) {
            token = res.data.data.token;
            localStorage.setItem("token", token);
            config.headers.Authorization = token;
            return axios(config);
          } else {
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("SID");
            window.location.href = "/login.html#/login";
          }
        });
    } else if (response.data.err_code == 2000 && retry > 8) {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("SID");
      window.location.href = "/login.html#/login";
    } else {
      return response;
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default http;
