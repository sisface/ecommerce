var path = require('path');
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            'jquery': 'jquery/src/jquery'
        }
      },
    module: {
        rules: [
          {
            test: /\.(jpe?g|png|gif)$/i,
            loader:"file-loader",
            query:{
              name:'[name].[ext]',
              outputPath:'images/'
              //the images will be emmited to public/assets/images/ folder 
              //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
            }
          },
          {
            test: /\.css$/,
            loaders: ["style-loader","css-loader"]
          }
        ]
      }
};