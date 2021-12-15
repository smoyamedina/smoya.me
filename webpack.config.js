const path = require('path');
module.exports = {
    mode: 'production',
    entry: './scripts/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'scripts')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};
