var express = require('express');
var app = express.Router();
const bParser = require('body-parser');
const data = require('./data.json')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

app.use(express.static(__dirname));
app.use(bParser())
app.get('/login',(req,res)=>{  
    res.status(200)
    res.type('text/html')
    res.sendFile(`${__dirname}/login.html`)

})
app.get('/list',(req,res)=>{
    if (req.query.username == data.users[0].username && req.query.pwd == data.users[0].password) {
        res.status(200);
        res.type('text/html');
        res.sendfile(`${__dirname}/list.html`)
    }else {
        res.send("用户名或者密码错误");
    }
});

app.get('/data',(req,res)=>{
    res.send(data)
})

module.exports = app;