const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const path = require("path");

const __wd = path.resolve(__dirname, "../");

const entry = webpackConfig.entry;

const historyApiRewrites = [];

Object.keys(entry).forEach((chunkName) => {
    historyApiRewrites.push({
        from: new RegExp(`^\\/(en_US|zh_CN)\\/${chunkName}(\\/.*)*`),
        to: `/${chunkName}.html`,
    });
});

module.exports = merge(webpackConfig, {
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: {
            rewrites: historyApiRewrites,
        },
        proxy: {
            "/calculate": {
                target: "http://localhost:80",
            },
            "/alibaba": {
                target: "http://localhost:80",
            },
            "/userInfo": {
                target: "http://localhost:80",
            },
        },
    },
    devtool: "cheap-module-source-map",
    output: {
        publicPath: `/`,
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg|gif|ico)$/,
                loader: "file-loader",
                include: path.join(__wd, "src/assets"),
                options: {
                    limit: 512,
                    name: "images/[name].[ext]",
                },
            },
            {
                test: /\.(woff2?|svg|ttf|eot)$/,
                include: path.join(__wd, "src/theme"),
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                },
            },
            {
                test: /\.(less|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require("autoprefixer")],
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                "@table-border-radius-base": "0",
                            },
                        },
                    },
                ],
            },
        ],
    },
});
