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

  export function getImageList(id,page = 1){
    return axios.get(`/image_class/${id}/image/${page}`)
}

export function updateImage(id,name){
    return axios.post(`/image/${id}`,{ name })
}

export function deleteImage(ids){
    return axios.post(`/image/delete_all`,{ ids })
}

export const uploadImageAction = "/api/image/upload"