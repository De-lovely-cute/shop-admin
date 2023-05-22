import axios from "@/axios";
import { queryParams } from "@/componsables/util";

// 商品列表
export function getGoods(page, query = {}) {
  let r = queryParams(query);
  return axios.get(`/goods/${page}${r}`);
}

// 批量上架/下架
export function updateGoodsStatus(ids, status) {
  return axios.post(`/goods/changestatus`, {
    ids,
    status,
  });
}

// 增加商品
export function addGoods(data) {
  return axios.post(`/goods`, data);
}

// 修改商品
export function editGoods(id, data) {
  return axios.post(`/goods/${id}`, data);
}

// 批量删除商品
export function deleteGoods(ids) {
  return axios.post(`/goods/delete_all`, {
    ids,
  });
}

// 批量恢复商品
export function restoreGoods(ids) {
  return axios.post(`/goods/restore`, {
    ids,
  });
}

// 彻底删除商品
export function destroyGoods(ids) {
  return axios.post(`/goods/destroy`, {
    ids,
  });
}

// 查看商品资料
export function readGoods(id) {
  return axios.get(`/goods/read/${id}`);
}

// 设置商品轮播图
export function setGoodsBanner(id, data) {
  return axios.post(`/goods/banners/${id}`, data);
}

// 更新商品规格
export function updateGoodsSkus(id, data) {
  return axios.post(`/goods/updateskus/${id}`, data);
}

// 添加商品规格选项
export function createGoodsSkusCard(data) {
  return axios.post(`/goods_skus_card`, data);
}

// 修改商品规格选项
export function updateGoodsSkusCard(id, data) {
  return axios.post(`/goods_skus_card/${id}`, data);
}

// 删除商品规格选项
export function deleteGoodsSkusCard(id) {
  return axios.post(`/goods_skus_card/${id}/delete`);
}

// 排序商品规格选项
export function sortGoodsSkusCard(data) {
  return axios.post(`/goods_skus_card/sort`, data);
}

// 添加商品规格选项
export function createGoodsSkusCardValue(data) {
  return axios.post(`/goods_skus_card_value`, data);
}

// 修改商品规格选项
export function updateGoodsSkusCardValue(id, data) {
  return axios.post(`/goods_skus_card_value/${id}`, data);
}

// 删除商品规格选项
export function deleteGoodsSkusCardValue(id) {
  return axios.post(`/goods_skus_card_value/${id}/delete`);
}

// 选择设置商品规格和选项
export function chooseAndSetGoodsSkusCard(id, data) {
  return axios.post(`/goods_skus_card/${id}/set`, data);
}
