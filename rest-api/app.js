const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();
// const cors =  require('cors')

app.use(async (ctx, next) => {
    console.log(111)
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next()
})


// app.use(cors());
app.use(bodyParser());

app.use(controller());
app.listen(3001);