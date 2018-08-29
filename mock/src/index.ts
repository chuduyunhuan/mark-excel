
import * as Koa from 'koa';
import * as CORS from 'kcors';
import * as Session from 'koa-session';
import * as Body from 'koa-body';

import options from './options';

import router from './router';





const {
    port: PORT = 4211,

} = options;



const koaApp = new Koa();

koaApp.keys = [ 'AYBABTU' ];

koaApp
    .use(Session(koaApp))
    .use(Body())
    .use(CORS())

    .use(router.routes())
    .use(router.allowedMethods())

    .listen(PORT)
;











export default koaApp;

