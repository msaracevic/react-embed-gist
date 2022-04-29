module.exports = {
  entry: './src/ReactEmbedGist.js',
  mode: 'production',
  output: {
    path: __dirname,
    filename: 'main.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          presets: ['@babel/react', '@babel/env']
        }
      }
    ]
  }
};
