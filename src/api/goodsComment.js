import axios from "@/axios";

// 获取商品评价列表
export function getGoodsComment(page) {
  return axios.get("/goods_comment/" + page);
}

// 修改商品评价状态
export function updateStatusGoodsComment(id, status) {
  return axios.post(`/goods_comment/${id}/update_status`, { status });
}

// 回复商品评论
export function goodsCommentReview(id, data) {
  return axios.post(`/goods_comment/review/${id}`, { data });
}
