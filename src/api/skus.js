import axios from "@/axios";

// 获取所有商品规格
export function getSkus(page) {
  return axios.get("/skus/" + page);
}

// 增加商品规格
export function addSkus(data) {
  return axios.post("/skus", data);
}

// 修改商品规格
export function editSkus(id, data) {
  return axios.post("/skus/" + id, data);
}

// 修改商品规格状态
export function updatStatusSkus(id, status) {
  return axios.post(`/skus/${id}/update_status`, { status });
}

// 批量删除商品规格
export function deleteAllSkus(ids) {
  ids = !Array.isArray(ids) ? [ids] : ids;
  return axios.post("/skus/delete_all", { ids });
}
