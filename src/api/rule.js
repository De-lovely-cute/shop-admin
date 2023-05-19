import axios from "@/axios"

// 菜单权限列表
export function getRule(page){
    return axios.get(`/rule/${page}`)
}

// 增加菜单权限
export function addRule(data) {
    return axios.post('/rule',data)
}

// 修改菜单权限
export function editRule(id,data) {
    return axios.post('/rule/'+id, data)
}

// 删除菜单权限
export function deleteRule(id) {
    return axios.post(`/rule/${id}/delete`)
}

// 修改权限状态
export function editRuleStatus(id, status) {
    return axios.post(`/rule/${id}/update_status`,status)
}