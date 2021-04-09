import http from '@/utils/index'

export const login = (params:any) => {
    return http.request({
        url: '/api/login',
        method: 'POST',
        params
    })
}