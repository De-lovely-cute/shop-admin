import axios from "@/axios";

import {queryParams} from "@/componsables/util"

// 分销数据统计
export function getAgentStatistics() {
  return axios.get("/agent/statistics");
}

// 分销推广员列表
export function getAgent(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/agent/${page}${r}`);
}

// 推广订单列表
export function getUserBill(page, query = {}) {
  let r= queryParams(query)
  return axios.get(`/user_bill/${page}${r}`);
}

// 修改分销配置
export function editAgentSetting(data) {
  return axios.post("/distribution_setting/set", data);
}

// 获取分销配置
export function getAgentSetting() {
  return axios.get("/distribution_setting/get");
}
