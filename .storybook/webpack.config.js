const path = require('path')

// const HappyPack = require('happypack')
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')
module.exports = (baseConfig, env, config) => {
  config.resolve.extensions.push('.ts', '.tsx', '.js', '.json', '.md');
  config.resolve.alias = {
    '@config': path.resolve(__dirname, '../src/config'),
    '@components': path.resolve(__dirname,'../src/components'),
    '@pages': path.resolve(__dirname, '../src/pages'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@stories': path.resolve(__dirname, '../src/stories'),
    '@layouts': path.resolve(__dirname, '../src/layouts'),
    '@api': path.resolve(__dirname, '../src/api'),
    '@assets': path.resolve(__dirname, '../src/assets'),
    '@theme': path.resolve(__dirname, '../src/theme')
  };
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve('awesome-typescript-loader'),
      require.resolve("react-docgen-typescript-loader")
    ]
  }, {
    test: /\.(le|sa|sc|c)ss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          // modules: true,
          localIdentName: '[local]_[hash:base64:6]',
          minimize: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: false,
          ident: 'postcss'
        }
      },
      {
        loader: 'resolve-url-loader'
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          sourceMap: false
        }
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  // Extend it as you need.
  config.plugins.push(new TSDocgenPlugin());
  return config;
};