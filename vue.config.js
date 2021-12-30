module.exports = {
  publicPath:'./',
  outputDir:'dist',
  devServer: {
    // https: true,// 用于设置是否启用https
    host: '0.0.0.0',
    port: 8080,//  指定要监听请求的端口号
    proxy: {
      '/*': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    }
  }
}