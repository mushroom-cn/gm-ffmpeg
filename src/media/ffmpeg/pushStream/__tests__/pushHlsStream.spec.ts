import { pushHlsStream } from '../pushHlsStream';

jest.setTimeout(3 * 60 * 1000);
describe('queryMetaAsync test', () => {
  test('queryMetaAsync', async () => {
    const ffmpeg = await pushHlsStream({
      path: '/Users/andersonyli/Downloads/abc.mp4',
      serverUrl: './',
    });
    expect(ffmpeg).not.toBeNull();
  });
});
