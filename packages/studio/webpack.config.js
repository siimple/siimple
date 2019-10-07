//Import dependencies
let path = require("path");

//Import webpack plugins
let MiniCssExtract = require("mini-css-extract-plugin");
//let HtmlWebpackPlugin = require("html-webpack-plugin");
let modulesPath = path.resolve(process.cwd(), "../../node_modules");

//Common loaders configuration
let loaders = {
    // Extract CSS styles to a separaate .css file
    "cssExtract": {
        "loader": MiniCssExtract.loader,
        "options": {
            "publicPath": "./"
        }
    },
    // Common CSS loader for parsing .css and compiled .scss files
    "css": {
        "loader": "css-loader"
    }
};

//Export the webpack configuration
module.exports = function (env) {
    //Export webpack configuration
    return {
        "entry": path.join(process.cwd(), "src", "index.js"),
        "mode": "development",
        "target": "web",
        "output": {
            "path": path.join(process.cwd(), "www"),
            "filename": "app.js"
        },
        "resolve": {
            "modules": [modulesPath],
        },
        "module": {
            "rules": Object.values({
                // Parse .scss files
                "scssLoader": {
                    "test": /\.scss$/,
                    "use": Object.values({
                        "cssExtractLoader": loaders.cssExtract,
                        "cssLoader": loaders.css,
                        "sassLoader": {
                            "loader": "sass-loader",
                            "options": {
                                "includePaths": [modulesPath],
                                "implementation": require("sass")
                            }
                        }
                    })
                },
                // @siimple/icons uses CSS instead of SCSS, so we need to add a loader
                // for parsing css files
                "cssLoader": {
                    "test": /\.css$/,
                    "use": Object.values({
                        "cssExtractLoader": loaders.cssExtract,
                        "cssLoader": loaders.css
                    })
                },
                // Export images to img/ folder
                "imageLoader": {
                    "test": /\.(png|jpg|gif|svg)$/,
                    "use": {
                        "loader": "file-loader",
                        "options": {
                            "name": "[hash].[ext]",
                            "outputPath": "img/"
                        }
                    }
                },
                // Export fonts to fonts/ folder
                "fontLoader": {
                    "test": /\.(ttf|woff|woff2)$/,
                    "use": {
                        "loader": "file-loader",
                        "options": {
                            "name": "[hash].[ext]",
                            "outputPath": "fonts/"
                        }
                    }
                },
                // Parse JSX using babel
                // BUT: ignore all .js files in node_modules and bower_components folders
                "jsxLoader": {
                    "test": /\.js$/,
                    "include": [
                        path.join(process.cwd(), "src")
                    ],
                    "exclude": /(node_modules|bower_components)/,
                    "loader": "babel-loader"
                }
            })
        },
        "plugins": [
            new MiniCssExtract({
                "filename": "app.css"
            })
        ]
    };
};

