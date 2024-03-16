const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Other webpack configuration...
    entry: './src/index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'build'), // Output directory
        filename: 'bundle.js', // Output bundle filename
        publicPath: '/', // Public URL of the output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!o1js)/, // Exclude all node_modules except o1js
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        // Add any other Babel options if needed
                    },
                },
            },
            // Add other rules for different file types if needed
        ],
    },
    resolve: {
        extensions: ['ts', '.tsx', '.js', '.jsx'], // File extensions to resolve
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'), // HTML template
            filename: 'index.html', // Output HTML filename
        }),
    ],
};