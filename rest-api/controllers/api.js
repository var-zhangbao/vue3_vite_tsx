module.exports = {
    'POST /api/login': async (ctx, next) => {
        ctx.response.type = 'application/json';
        console.log(ctx.request.body)
        const {name, password} = ctx.request.body
        let p = {}
        if (name && password) {
            p = {
                name: ctx.request.body.name,
                id: '1',
                status: 200
            }
        } else {
            p = {
              message: '请检查账号密码是否填写',
              status: 1001,
              type: 'error'
            }
            
        }
        ctx.response.body = p
        
    }
}