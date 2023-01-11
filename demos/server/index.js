import Koa from 'koa';
import getRandomExam from '../../download.js';

const app = new Koa();


app.use(async ctx => {
    if(ctx.request.path == '/') {
        try {
            ctx.body = (await getRandomExam()).cuestionario;
        } catch {
            ctx.status = 500;
        }
    }
})

app.listen(process.env.PORT || 3000);