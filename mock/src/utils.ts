
import * as Koa from 'koa';
import * as Cookies from 'cookies';
import * as Router from 'koa-router';





export const empty = function (ctx: Router.IRouterContext) {
    ctx.status = 204;
};



type Pipes = Router.IMiddleware[];

export const hook = function (root: Router) {
    return (path: string, router: Router, { pipes = <Pipes>[], allowed = true } = {}) => {

        pipes.push(router.routes());

        if (allowed === true) {
            pipes.push(router.allowedMethods());
        }

        root.use(path, ...pipes);
    };
};



export const AuthGuard = async function (ctx: Router.IRouterContext, next: () => Promise<any>) {
    const info = ctx.session.info;

    ctx.assert(info != null, 401, errors('assess deny'));

    await next();
};



export function errors (message = '', data = {}) {
    return JSON.stringify({ ...data, message });
}

