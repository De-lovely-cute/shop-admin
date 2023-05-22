import axios from "@/axios";

// 获取所有商品分类列表
export function getCategory() {
  return axios.get("/category");
}

// 增加商品分类
export function addCategory(data) {
  return axios.post("/category", data);
}

// 修改商品分类
export function editCategory(id, data) {
  return axios.post("/category/" + id, data);
}

// 修改商品分类状态
export function updateStatusCategory(id, stauts) {
  return axios.post(`/category/${id}/update_status`, { stauts });
}

// 删除商品分类
export function deleteCategory(id) {
  return axios.post(`/category/${id}/delete`);
}

// 分类关联产品列表
export function listCategoryItem(category_id) {
  return axios.get(`/app_category_item/list?category_id=${category_id}`);
}

// 删除关联产品列表
export function deleteCategoryItem(id) {
  return axios.post(`/app_category_item/${id}/delete`);
}

// 关联产品
export function CategoryItem(data) {
  return axios.post("/app_category_item", data);
}
