import { queryMetaAsync } from '../queryMetaAsync';

jest.setTimeout(30 * 1000);
describe('queryMetaAsync test', () => {
  test('queryMetaAsync', async () => {
    const ffmpeg = await queryMetaAsync([
      '/Users/andersonyli/Downloads/abc.mp4',
      '/Users/andersonyli/Downloads/abc.mp4',
    ]);
    expect(ffmpeg).not.toBeNull();
  });
});
