const path = require('path');
const testPath = path.join(__dirname,'test');

module.exports ={
    entry:'./src/app.js',
    output:{
        path: testPath,
        filename:'bundle.js'
    },
    module: {
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: [/node_modules/, /oldcode/]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: testPath
    }
};

