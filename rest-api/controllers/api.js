module.exports = {
    'POST /api/login': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            aa: '111',
            status: 200
        };
        // console.log(2222)
        // let p = {
        //     name: ctx.request.body.name,
        //     id: '1'
        // }
        // ctx.response.type = 'application/json'
        // ctx.request.body.name
    }
}