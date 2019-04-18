import axios from "axios";
let result = null;
let retry = 0;
let token = localStorage.getItem("token");
//创建axiox实例并配置好全局公用信息
let http = axios.create({
  baseURL: process.env.VUE_APP_userInfoURL, //基础URL
  headers: {
    Authorization: token
  }
});

//请求拦截器
// http.interceptors.request.use(
//   function(config) {
//     //这里主要是因为token会过期，所以需要动态获取
//     let token = localStorage.getItem("token");
//     config.headers.Authorization = token;
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
    if (response.data.err_code == 400400 && retry <= 10) {
      retry++;
      let config = response.config;
      // 这里需要把返回结果return出去，很重要
      return http
        .post("/token/refresh-token", {
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
    } else if (response.data.err_code == 400400 && retry >= 10) {
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

//获取token
async function get_token(username, password, rememberCode) {
  await http
    .post("/token/get-token", {
      username: username,
      password: password,
      is_remember_pass: rememberCode
    })
    .then(res => {
      result = res.data;
    });
  return result;
}

async function refresh_token(refresh_token) {
  await http
    .post("/token/refresh-token", {
      refresh_token: refresh_token
    })
    .then(res => {
      result = res.data;
    });
  return result;
}

async function get_TestNum(trial_name, trial_phone_number, trial_company_name) {
  await http
    .post("/app/trial", {
      trial_name: trial_name,
      trial_phone_number: trial_phone_number,
      trial_company_name: trial_company_name
    })
    .then(res => {
      result = res.data;
    });
  return result;
}

// 反馈
async function feedback(suggestions, phone_number) {
  await http
    .post(`/user/suggestions`, {
      suggestions: suggestions,
      phone_number: phone_number
    })
    .then(res => {
      result = res.data;
    });
  return result;
}

//用户信息
async function find_user() {
  //http是自定义的http实例
  await http.get(`/user/find`).then(res => {
    result = res.data;
  });
  return result;
}

//手机验证码
async function get_pin(phone_number) {
  //http是自定义的axios实例
  await http.get(`/user/get-pin?phone_number=${phone_number}`).then(res => {
    result = res.data;
  });
  return result;
}

//用户新增
async function add_user(
  username,
  password,
  phone_number,
  pin,
  enterprise_name,
  invite_code
) {
  await http
    .post(`/user/add`, {
      username: username,
      password: password,
      phone_number: phone_number,
      pin: pin,
      enterprise_name: enterprise_name,
      invite_code: invite_code
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//手机验证码
async function check_pn(phone_number, pin) {
  await http
    .post(`/user/check-pn`, {
      phone_number: phone_number,
      pin: pin
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
//更新密码
async function change_pw(password, cpn) {
  await http
    .put(`/user/change-pw`, {
      password: password,
      cpn: cpn
    })
    .then(res => {
      result = res.data;
    });
  return result;
}

export {
  get_token,
  refresh_token,
  get_TestNum,
  find_user,
  feedback,
  add_user,
  get_pin,
  check_pn,
  change_pw
};
