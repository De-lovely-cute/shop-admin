import axios from "@/axios";

// 获取用户列表
export function getUser(page, query = {}) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key} = ${encodeURIComponent(query[key])}`);
    }
  }
  let r = q.join("&");
  r = r ? "?" + r : "";
  return axios.get(`/user/${page}${r}`);
}

// 修改用户状态
export function getUserStatus(id, status) {
  return axios.post(`/user/${id}/update_status`, {
    status,
  });
}

// 添加用户
export function addUser(data) {
    return axios.post("/user",data)
}

// 修改用户
export function editUser(id,data) {
    return axios.post(`/user/${id}`,data)
}
// 删除用户
export function deleteUser(id) {
    return axios.post(`/user/${id}/delete`)
}