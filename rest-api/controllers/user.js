module.exports = {
    'GET /api/get_user': async(ctx, next) => {
        
        let result = {
        }
        console.log(ctx.query.name)
        if (ctx.query.name === 'admin') {
            let userlist = []
            let user = {}
            for (let i = 0; i< 20; i++) {
                user = {
                    name: `admin的好友${i+1}`,
                    usericon: 'https://www.17sucai.com/preview/1424582/2020-06-22/quicky/assets/media/avatar/2.png'
                }
                userlist.push(user)
            }
            result.userlist = userlist
            result.status = 200
        } else {
            result = {
                message: '当前用户还没有添加好友',
                status: 200,
                type: 'success'
            }
        }
        ctx.response.type = 'application/json'
        ctx.response.body = result
    }
}