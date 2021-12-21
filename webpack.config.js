const path = require('path');

module.exports = {
	entry: './index.ts',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
		]
	},
	resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: {
      name: 'logstr',
      type: 'umd',
    },
		filename: 'logstr.js',
		// libraryTarget: 'commonjs'
	}
};