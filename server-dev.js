/*
 * @Author: Shber
 * @Date: 2022-10-27 11:41:55
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 11:58:16
 * @Description: 
 */

import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import koaConnect from 'koa-connect';
import * as vite from 'vite';


(async () => {
    const app = new Koa();
    // 创建 vite 服务
    const viteServer = await vite.createServer({
      root: process.cwd(),
      logLevel: 'error',
      server: {
      middlewareMode: true,
      },
    })

    // 注册 vite 的 Connect 实例作为中间件（注意：vite.middlewares 是一个 Connect 实例）
    app.use(koaConnect(viteServer.middlewares))

    app.use(async ctx => {
      try {
          // 1. 获取index.html
          let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

          // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
          template = await viteServer.transformIndexHtml(ctx.path, template)

          // 3. 加载服务器入口, vite.ssrLoadModule 将自动转换
          const { render } = await viteServer.ssrLoadModule('/src/entry-server.js')

          //  4. 渲染应用的 HTML
          const { renderedHtml } = await render(ctx, {})

          const html = template.replace('<!--app-html-->', renderedHtml)

          ctx.type = 'text/html'
          ctx.body = html
      } catch (e) {
          viteServer && viteServer.ssrFixStacktrace(e)
          console.log(e.stack)
          ctx.throw(500, e.stack)
      }
    })

    app.listen(9000, () => {
        console.log('server is listening in 9000');
    });
})();
