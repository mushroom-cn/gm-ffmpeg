import { pushRtmpStream } from '../pushRtmpStream';

jest.setTimeout(3 * 60 * 1000);
describe('queryMetaAsync test', () => {
  test('queryMetaAsync', async () => {
    const ffmpeg = await pushRtmpStream({
      path: '/Users/andersonyli/Downloads/abc.mp4',
      serverUrl: 'http://127.0.0.1:8000/live',
    });
    expect(ffmpeg).not.toBeNull();
  });
});
