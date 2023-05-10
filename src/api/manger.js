import axios from '@/axios'
// 登录
export function login(username, password) {
    return axios.post('/login', {
        username,
        password
    })
}
// 获取管理员信息和权限菜单
export function getinfo() {
    return axios.post('/getinfo')
}

// 退出登录
export function logout() {
    return axios.post('/logout')
}

// 修改密码
export function updatepassword(data) {
    return axios.post('/updatepassword', data)
}
