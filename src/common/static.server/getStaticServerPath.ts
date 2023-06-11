import { join } from 'lodash';

export function getStaticServerPath() {
  return join([__dirname, '..', '..', 'cache']);
}
