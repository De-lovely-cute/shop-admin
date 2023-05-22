import axios from "@/axios";

// 获取原有系统设置
export function getSysconfig() {
  return axios.get("/sysconfig");
}

// 修改系统设置
export function updateSysconfig(data) {
  return axios.post("/sysconfig", data);
}

// 上传文件
// export const uploadAction = "/api/sysconfig/upload"
// 打包上线
export const uploadAction = import.meta.env.VITE_APP_BASE_API + "/sysconfig/upload"
