const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/FormaldehydeValue.vue',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'FormaldehydeValue.js',
        library: 'FormaldehydeValue'
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{//vue 解析
            test: /\.vue$/,
            loader: 'vue-loader',
        },
        {//css 解析
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        },
		{
			test: /\.scss$/,
			use: ['vue-style-loader', 'css-loader', 'sass-loader']
		}]
    }
}
