import { pushStream } from './pushStream';

const EXT = 'm3u8';
export function pushHlsStream({
  path,
  serverUrl,
  onProcessing,
}: {
  path: string;
  serverUrl: string;
  onProcessing?: (process: number) => void;
}) {
  const outputUrl = [serverUrl, EXT].join('.');
  // ffmpeg -i /Users/andersonyli/Downloads/abc.mp4 -c:v libx264 -hls_time 120 -hls_list_size 0 -c:a aac -strict -2 -f hls rtmp://localhost:1935/rtmplive/home
  return pushStream({ path, outputOptions: useHls(), outputUrl, onProcessing });
}

function useHls() {
  // ffmpeg -i <input_file> -codec copy -map 0 -f hls -hls_time <segment_duration>
  // -hls_list_size <segment_count> -hls_flags delete_segments <output_file>.m3u8
  const outputOptions: string[] = [];
  outputOptions.push('-codec');
  outputOptions.push('copy');

  outputOptions.push('-map');
  outputOptions.push('0');

  outputOptions.push('-f');
  outputOptions.push('hls');

  outputOptions.push('-hls_time');
  // 分片视频时间长度. 1分钟一个片段
  outputOptions.push(`${1 * 60}`);

  outputOptions.push('-c:a');
  outputOptions.push('aac');

  outputOptions.push('-strict');
  outputOptions.push('-2');

  outputOptions.push('-hls_list_size');
  // 包含所有片段
  outputOptions.push('0');

  outputOptions.push('-hls_flags');
  outputOptions.push('delete_segments');
  return outputOptions;
}
