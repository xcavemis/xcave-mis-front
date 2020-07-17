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
      bucket: "xcave-mis-site",
      createBucket: true,
      staticHosting: true,
      staticIndexPage: "index.html",
      staticErrorPage: "index.html",
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/",
      acl: "public-read",
      pwa: false,
      pwaFiles: "Comma-separated list of files to treat as PWA files",
      enableCloudfront: false,
      cloudfrontId: "The ID of the distribution to invalidate",
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