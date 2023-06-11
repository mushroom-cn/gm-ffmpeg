export function createServerRoot(path: string) {
  return path[0] !== '/' ? `/${path}` : path;
}
