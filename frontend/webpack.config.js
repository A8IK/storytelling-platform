module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader', // Ensure this line is included
          ],
        },
      ],
    },
  }
  