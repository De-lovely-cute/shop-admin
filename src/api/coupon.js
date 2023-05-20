import axios from "@/axios";

// 获取所有优惠券列表
export function getCoupon(page) {
  return axios.get("/coupon/" + page);
}

// 增加优惠券列表
export function addCoupon(data) {
  return axios.post("/coupon", data);
}

// 修改优惠券列表
export function editCoupon(id, data) {
  return axios.post("/coupon/" + id, data);
}

// 删除优惠券列表
export function deleteCoupon(id) {
  return axios.post(`/coupon/${id}/delete`);
}

// 失效优惠券
export function updateStatusCoupon(id, status) {
  return axios.post(`/coupon/${id}/update_status`, { status: 0 });
}
