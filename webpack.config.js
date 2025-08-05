const path = require('path');

module.exports = [
  {
    name: 'forum',
    entry: './js/src/forum/index.js',
    output: {
      path: path.resolve(__dirname, 'js/dist'),
      filename: 'forum.js',
      library: {
        type: 'umd'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        'flarum/forum/app': path.resolve(__dirname, 'js/src/shims/forum-app.js'),
        'flarum/admin/app': path.resolve(__dirname, 'js/src/shims/admin-app.js'),
        'flarum/common/Component': path.resolve(__dirname, 'js/src/shims/Component.js'),
      }
    },
    externals: {
      'mithril': 'm'
    },
    mode: process.env.NODE_ENV || 'production'
  },
  {
    name: 'admin',
    entry: './js/src/admin/index.js',
    output: {
      path: path.resolve(__dirname, 'js/dist'),
      filename: 'admin.js',
      library: {
        type: 'umd'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        'flarum/forum/app': path.resolve(__dirname, 'js/src/shims/forum-app.js'),
        'flarum/admin/app': path.resolve(__dirname, 'js/src/shims/admin-app.js'),
        'flarum/common/Component': path.resolve(__dirname, 'js/src/shims/Component.js'),
      }
    },
    externals: {
      'mithril': 'm'
    },
    mode: process.env.NODE_ENV || 'production'
  }
];
