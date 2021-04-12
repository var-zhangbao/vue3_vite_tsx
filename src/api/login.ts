import http from '@/utils/index'

export const login = (params:any) => {
    return http.request({
        url: '/api/login',
        method: 'get',
        params
    })
}

export const getUserList = (params:any) => {
    return http.request({
        url: '/api/get_user',
        method: 'get',
        params
    })
}