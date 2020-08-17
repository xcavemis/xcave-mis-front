# code

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build

```

### Deploy
```
npm run deploy

CMS: https://hml.exposicaodavinci500anos.com.br/cms/#/login
API: https://hml.exposicaodavinci500anos.com.br/api
SITE: https://hml.exposicaodavinci500anos.com.br

Upload assets: 
aws s3 cp ./tmp s3://xcave-mis-assets --recursive

Cache invalidation:
aws cloudfront create-invalidation \
    --distribution-id E1V8AFA2DORWL1 \
    --paths "/assets/*"

Access files:
https://hml.exposicaodavinci500anos.com.br/assets/test.jpeg

AWS console:
https://us-east-2.console.aws.amazon.com/console/home?region=us-east-2#
AWS Bucket:
https://s3.console.aws.amazon.com/s3/buckets/xcave-mis-assets/assets/?region=sa-east-1&tab=overview
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Convert .mp4 to dash
MP4Box for .mpd
MP4Box -dash 4000 -rap -bs-switching no -profile live -out manifest.mpd ./video_240.mp4

FFMPEG for .m3u8
ffmpeg -i video1080p.mp4 -codec: copy -bsf:v h264_mp4toannexb -start_number 0 -hls_time 10 -hls_list_size 0 -f hls manifest1080p.m3u8