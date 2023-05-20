import axios from "@/axios";

// 会员等级列表
export function getUserLevel(page) {
  return axios.get("/user_level/" + page);
}

// 添加会员等级
export function addUserLevel(data) {
  return axios.post("/user_level", data);
}

// 修改会员等级
export function editUserLevel(id, data) {
  return axios.post("/user_level/" + id, data);
}

// 删除会员等级
export function deleteUserLevel(id) {
  return axios.post(`/user_level/${id}/delete`);
}

// 修改会员等级状态
export function updateUserLevelStatus(id, status) {
  return axios.post(`/user_level/${id}/update_status`, { status });
}

