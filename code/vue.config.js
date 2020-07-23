module.exports = {
  configureWebpack: {
    output: {
      filename: '[name].[hash].js'
    },
  },
  devServer: {
    https: true,
  },
  publicPath: ".",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/index.scss";`
      }
    }
  },
  pluginOptions: {
    s3Deploy: {
      awsProfile: "default",
      endpoint: "AWS",
      region: "sa-east-1",
      bucket: "xcavemis-site",
      // bucket: "xcave-mis-site-hml",
      createBucket: true,
      staticHosting: true,
      staticIndexPage: "index.html",
      staticErrorPage: "index.html",
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/hml",
      acl: "public-read",
      pwa: false,
      pwaFiles: "Comma-separated list of files to treat as PWA files",
      enableCloudfront: false,
      cloudfrontId: process.env.VUE_APP_CLOUDFRONT_ID,
      cloudfrontMatchers: "/*",
      uploadConcurrency: 5,
      gzip: true,
      gzipFilePattern:
        "**/*.{js,css,json,ico,map,xml,txt,svg,eot,ttf,woff,woff2}",
      registry: undefined,
      overrideEndpoint: false,
      pluginVersion: "4.0.0-rc3"
    }
  }
}