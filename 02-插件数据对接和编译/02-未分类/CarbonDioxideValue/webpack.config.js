const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/CarbonDioxideValue.vue',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'CarbonDioxideValue.js',
        library: 'CarbonDioxideValue'
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
