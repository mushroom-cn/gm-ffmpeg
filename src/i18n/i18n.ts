import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';

export const i18n = I18nModule.forRoot({
  fallbackLanguage: 'en',
  fallbacks: {
    'en-*': 'en',
    'zh-*': 'zh',
  },
  logging: true,
  loaderOptions: {
    path: join(__dirname, '/resources'),
    watch: true,
  },
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    { use: HeaderResolver, options: ['lang'] },
    { use: CookieResolver, options: ['lang'] },
    AcceptLanguageResolver,
  ],
});
