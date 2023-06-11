import NodeMediaServer from 'node-media-server';

const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: './media',
  },
};
//ffmpeg -re -rtsp_transport tcp -i rtsp://账号:密码@IP:端口/mpeg4/ch1/sub/av_stream.mp4 -acodec aac -strict experimental -ar 44100 -ac 2 -b:a 96k -r 25 -b:v 500k -s 480*480 -c `copy` -f hls -hls_time 2.0 -hls_list_size 0 -hls_wrap 15 /application/nginx/html/hls/test.m3u8
export function runMediaServer() {
  const nms = new NodeMediaServer(config);
  nms.run();
  return () => {
    nms.stop();
  };
}
runMediaServer();
