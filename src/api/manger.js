import axios from "@/axios";
// 登录
export function login(username, password) {
  return axios.post("/login", {
    username,
    password,
  });
}
// 获取管理员信息和权限菜单
export function getinfo() {
  return axios.post("/getinfo");
}

// 退出登录
export function logout() {
  return axios.post("/logout");
}

// 修改密码
export function updatepassword(data) {
  return axios.post("/updatepassword", data);
}

// 获取管理员列表
export function getManager(page, query = {}) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key} = ${encodeURIComponent(query[key])}`);
    }
  }
  let r = q.join("&");
  r = r ? "?" + r : "";
  return axios.get(`/manager/${page}${r}`);
}

// 修改管理员状态
export function getManagerStatus(id, status) {
  return axios.post(`/manager/${id}/update_status`, {
    status,
  });
}

// 添加管理员
export function addManager(data) {
    return axios.post("/manager",data)
}

// 修改管理员
export function editManager(id,data) {
    return axios.post("/manager/"+id,data)
}
// 删除管理员
export function deleteManager(id) {
    return axios.post(`/manager/${id}/delete`)
}