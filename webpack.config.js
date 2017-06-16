const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'angular-redux-bindings.js'
    },
    externals: {
        angular: 'angular',
        redux: 'redux'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-object-rest-spread'],
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
}