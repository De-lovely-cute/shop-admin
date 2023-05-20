import axios from "@/axios";

// 角色列表
export function getRole(page) {
  return axios.get("/role/" + page);
}

// 添加角色
export function addRole(data) {
  return axios.post("/role", data);
}

// 修改角色
export function editRole(id, data) {
  return axios.post("/role/" + id, data);
}

// 删除角色
export function deleteRole(id) {
  return axios.post(`/role/${id}/delete`);
}

// 修改角色状态
export function updateRoleStatus(id, status) {
  return axios.post(`/role/${id}/update_status`, { status });
}

// 配置角色权限
export function setRole(id, rule_ids) {
  return axios.post("/role/set_rules", {
    id,
    rule_ids,
  });
}
