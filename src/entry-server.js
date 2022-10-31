/*
 * @Author: Shber
 * @Date: 2022-10-27 11:52:09
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-31 15:08:49
 * @Description: 
 */
import { createApp } from './main';
import { renderToString } from '@vue/server-renderer';
import { createRouter } from './router';
export const render = async (
  ctx,
  manifest
) => {
  const { app } = createApp();
  // console.log(ctx, manifest, '');

    // 路由注册
    const router = createRouter('server');
    app.use(router);
    await router.push(ctx.path);
    await router.isReady();

  const renderCtx = {};

  const renderedHtml = await renderToString(app, renderCtx);

  const preloadLinks = renderPreloadLinks(renderCtx.modules, manifest);

  return [renderedHtml, preloadLinks];
};

/**
* 解析需要预加载的链接
* @param modules
* @param manifest
* @returns string
*/
function renderPreloadLinks(
  modules,
  manifest){
  let links = '';
  const seen = new Set();
  if (modules === undefined) throw new Error();
  modules.forEach((id) => {
      const files = manifest[id];
      if (files) {
          files.forEach((file) => {
              if (!seen.has(file)) {
                  seen.add(file);
                  links += renderPreloadLink(file);
              }
          });
      }
  });
  return links;
}

/**
* 预加载的对应的地址
* 下面的方法只针对了 js 和 css，如果需要处理其它文件，自行添加即可
* @param file
* @returns string
*/
function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
      return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith('.css')) {
      return `<link rel="stylesheet" href="${file}">`;
  } else {
      return '';
  }
}