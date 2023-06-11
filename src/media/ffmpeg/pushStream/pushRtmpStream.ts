import { basename, extname } from 'path';
import { pushStream } from './pushStream';

export function pushRtmpStream({
  path,
  serverUrl,
}: {
  path: string;
  serverUrl: string;
}) {
  const outputUrl = [serverUrl, `${basename(path, extname(path))}`].join('/');
  // ffmpeg -i /Users/andersonyli/Downloads/abc.mp4 -c:v libx264 -hls_time 120 -hls_list_size 0 -c:a aac -strict -2 -f flv rtmp://localhost:1935/rtmplive/home
  return pushStream({ path, outputOptions: useRTMP(), outputUrl });
}

function useRTMP() {
  // ffmpeg -i /Users/andersonyli/Downloads/abc.mp4 -c:v libx264 -hls_time 120 -hls_list_size 0 -c:a aac -strict -2 -f hls rtmp://localhost:1935/rtmplive/home
  const outputOptions: string[] = [];
  outputOptions.push('-c:v');
  outputOptions.push('libx264');

  outputOptions.push('-hls_time');
  outputOptions.push('120');

  outputOptions.push('-hls_list_size');
  outputOptions.push('0');

  outputOptions.push('-c:a');
  outputOptions.push('aac');

  outputOptions.push('-strict');
  outputOptions.push('-2');

  outputOptions.push('-f');
  outputOptions.push('flv');
  return outputOptions;
}
