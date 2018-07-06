import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server'; // eslint-disable-line

const GRAPHQL_PORT = 8080;

const compiler = webpack({
  entry: path.resolve(__dirname, 'app', 'app.js'),
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  },
  output: { filename: 'app.js', path: '/' },
});

export default new WebpackDevServer(compiler, {
  compress: true,
  contentBase: '/lib/public/',
  disableHostCheck: true,
  proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` },
  publicPath: '/lib/app/',
  stats: { colors: true },
});
