import { createServerRoot } from '@common';
import appRootPath from 'app-root-path';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { registServeStatic } from 'src/serve.static';
const serveRoot = 'cache';
export const getStaticRoot = () => {
  return join(appRootPath.path, serveRoot);
};

if (!existsSync(getStaticRoot())) {
  mkdirSync(getStaticRoot());
}

registServeStatic({
  rootPath: getStaticRoot(),
  serveRoot: createServerRoot(serveRoot),
  serveStaticOptions: {
    extensions: ['m3u8', 'ts', 'png'],
    cacheControl: false,
    index: false,
    setHeaders(res) {
      res.set('Access-Control-Allow-Origin', '*');
    },
  },
});
