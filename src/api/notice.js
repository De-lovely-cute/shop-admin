import axios from "@/axios";

// 获取所有公告
export function getNotice(page) {
  return axios.get("/notice/" + page);
}

// 删除某条公告
export function getNoticeDelete(id) {
    return axios.post(`/notice/${id}/delete`)
}

// 修改公告
export function getNoticeEdit(id,data) {
    return axios.post('/notice/'+id,data)
}

// 新增公告
export function getNoticeAdd(data) {
    return axios.post('/notice',data)
}

