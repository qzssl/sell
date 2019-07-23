var express = require('express');

var appData = require('../../data');
var seller = appData.seller;
var goods = appData.goods;
var ratings =appData.ratings;
var app = express();
var apiRoutes = express.Router();

apiRoutes.get('/seller',function (req,res) {
    res.join({
        errno:0,
        data:seller
    })
});
apiRoutes.get('/goods',function (req,res) {
    res.json({
        errno:0,
        data:goods
    })
});
apiRoutes.get('/ratings',function (req,res) {
    res.json({
        errno:0,
        data:ratings
    })
});
app.use('/api',apiRoutes);
app.listen(8080, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + 8080 + '\n')
})
