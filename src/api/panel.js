import axios from '@/axios'

export function statistics1() {
    return axios.get('/statistics1')
}

export function statistics2() {
    return axios.get('/statistics2')
}
export function statistics3(type) {
    return axios.get('/statistics3?type=' + type)
}