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
