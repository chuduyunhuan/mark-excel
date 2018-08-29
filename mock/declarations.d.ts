
declare module 'koa-body' {

    import Koa = require('koa');

    module 'koa' {
        interface Request {
            body: any;
        }
    }

    function KoaBody (opts?: KoaBody.Options): Koa.Middleware;

    namespace KoaBody {

        interface Options {
            patchKoa?: boolean;
        }
    }

    export = KoaBody;
}

