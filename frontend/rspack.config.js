const { composePlugins, withNx, withReact } = require('@nx/rspack');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.resolve = {
    ...config.resolve,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.module.less'],
  };
  // Adding rules for handling .module.less files
  config.module.rules.push(
    {
      test: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true, // Automatically determine if the file is a module
              localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          },
        },
        {
          loader: 'less-loader',
          options: {
            modules: {
              auto: true, // Automatically determine if the file is a module
              localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          },
        },
      ],
    },
    {
      test: /\.less$/, // This rule handles non-module LESS files
      exclude: /\.module\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
  );

  return config;
});
