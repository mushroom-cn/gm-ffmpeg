import { screentshotAsync } from '../screenshot';

jest.setTimeout(30 * 1000);
describe('queryMetaAsync test', () => {
  test('queryMetaAsync', async () => {
    const ffmpeg = await screentshotAsync([
      { path: '/Users/andersonyli/Downloads/abc.mp4' },
    ]);
    expect(ffmpeg).not.toBeNull();
  });
});
