#### 新建vue.config.js
vue.config.js是webpack配置文件
#### 配置文件vue.config.js
```
var appData = require('./data');
var seller = appData.seller;
var goods = appData.goods;
var ratings =appData.ratings;
module.exports={
    //基本路径
    publicPath:'/',
    //输出文件目录,output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
    outputDir:'./dist',
    // webpack-dev-server 相关配置
    devServer: {
        //模拟数据开始
        before(app) {
            app.get('/api/seller', (req, res) => {
                res.json({
                    // 这里是你的json内容
                    errno: 0,
                    data: seller
                })
            });
            app.get('/api/goods', (req, res) => {
                res.json({
                    // 这里是你的json内容
                    errno: 0,
                    data: goods
                })
            });
            app.get('/api/ratings', (req, res) => {
                res.json({
                    // 这里是你的json内容
                    errno: 0,
                    data: ratings
                })
            });
        }
    }
};
```
