import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { isEqual } from 'lodash';
import { join } from 'path';
import { createServerRoot } from './common/static.server';

const serveStaticModuleOptions: ServeStaticModuleOptions[] = [
  {
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: createServerRoot('public'),
    // // renderPath: '*',
    // serveStaticOptions: {
    //   cacheControl: false,
    // },
  },
];
export const registServeStatic = (option: ServeStaticModuleOptions) => {
  if (!serveStaticModuleOptions.some((v) => isEqual(v, option))) {
    serveStaticModuleOptions.push(option);
  }
};

export const getServeStaticModule = () =>
  ServeStaticModule.forRoot(...serveStaticModuleOptions);
