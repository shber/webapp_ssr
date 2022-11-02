/*
 * @Author: Shber
 * @Date: 2022-10-27 14:23:22
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 11:49:30
 * @Description: 
 */
import Koa from 'koa';
import sendFile from 'koa-send';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url); // 这里不能声明__filename,因为已经有内部的__filename了，重复声明会报错
const _dirname = path.dirname(filename);
const resolve = (p) => path.resolve(_dirname, p);

const clientRoot = resolve('dist/client');
const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
import { render } from './dist/server/entry-server.js';
import manifest from './dist/client/ssr-manifest.json' assert { type: "json" };


(async () => {
    const app = new Koa();

    app.use(async (ctx) => {
		// 请求的是静态资源
        if (ctx.path.startsWith('/assets')) {
            await sendFile(ctx, ctx.path, { root: clientRoot });
            return;
        }

        const [renderedHtml, preloadLinks] = await render(ctx, manifest);
        // console.log("manifest~~~~~", renderedHtml, manifest );
        const html = template
            .replace('<!--preload-links-->', preloadLinks)
            .replace('<!--app-html-->', renderedHtml);

        ctx.type = 'text/html';
        ctx.body = html;
    });

    app.listen(8080, () => console.log('started server on http://localhost:8080'));
})();