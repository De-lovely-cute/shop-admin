import axios from "@/axios"

// 菜单权限列表
export function getRule(){
    return axios.get("/rule/1")
}