import axios from "@/axios";

// 图库列表
export function getImages(page) {
  return axios.get("/image_class/" + page);
}

// 新增图片
export function addImages(data) {
  return axios.post("/image_class", data);
}

// 修改图库
export function editImages(id, data) {
  return axios.post("/image_class/" + id, data);
}

// 删除图库
export function deleteImages(id) {
  return axios.post(`/image_class/${id}/delete`);
}

// 指定分类下的图片列表
export function getImageList(id, page = 1) {
  return axios.get(`/image_class/${id}/image/${page}`);
}

// 修改图片名称
export function updateImage(id, name) {
  return axios.post(`/image/${id}`, { name });
}

// 删除图片
export function deleteImage(ids) {
  return axios.post(`/image/delete_all`, { ids });
}

// 图片上传
// export const uploadImageAction = "/api/image/upload"

// 打包上线
export const uploadImageAction = import.meta.env.VITE_APP_BASE_API + "/image/upload";
