const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { chapterList, userList} = require('./record.js');
var qs=require("querystring");
var id=0;
var nChapter = {};
let server=http.createServer(function(req, res){
    // var ext = url.parse(req.url).pathname.match(/(\.[^.]+|)$/)[0];
    // var instead = url.parse(req.url).pathname.split('/')[1];
    // switch(ext){
    //     case ".css":
    //     case ".js":
    //     fs.readFile(("."+req.url).replace("/" + instead,''), 'utf-8',function (err, data) {
    //             res.writeHead(200, {"Content-Type": {".css":"text/css",".js":"application/javascript"}[ext]});
    //             res.write(JSON.stringify(data));
    //             res.end()})
    //     break;
    // }

    switch(req.method) {
        case 'GET':
          Select(req, res);
          break;
    
        case 'POST':
          Create(req, res);
          break;
    }
});
function Select(req,res){
    var instead = url.parse(req.url).pathname.split('/')[1];
    if(req.url == '/login'){
        
        fs.readFile(path.join(__dirname,'login.html'),'utf-8',(err,data)=>{
            if(err){
                // console.error(message);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
         
    }else if(req.url == '/list'){
        
        fs.readFile(path.join(__dirname,'chapterList.html'),'utf-8',(err,data)=>{
            if(err){
                // console.error(message);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }else if(url.parse(req.url).pathname == '/listmanager'){  
        console.log(url.parse(req.url, true).query.username);  
        if(url.parse(req.url, true).query.username == userList[0].username && url.parse(req.url, true).query.pwd ==userList[0].pwd ){
            var listPath = path.join(__dirname,'list.html');
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile(listPath,'utf-8',(err,data)=>{
                if(err){
                    // console.error(message);
                }else{
                    res.end(data);
                }
            })
        }else{
            res.end('404');
        } 
    }else if(req.url =='/listboth/'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }else if(req.url === '/addChapter/'){
        
        fs.readFile(path.join(__dirname,'addChapter.html'),'utf-8',(err,data)=>{
            if(err){
                // console.error(message);
            }else{
                res.writeHead(200,{'Content-Type':'text/html'}); 
                res.end(data);
            }
        })    
    }else if(req.url==='/both/'){
      res.write(JSON.stringify(chapterList));
      res.end();
    }else if(url.parse(req.url).pathname =='/detail'){
        id=url.parse(req.url).query.replace(/chapterId=/,"")-1;
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(path.join(__dirname,'chapter.html'),'utf-8',(err,data)=>{
            if(err){
                // console.error(message);
            }else{
                res.end(data);
            }
        })
        // var nowChapter = {};
        // fs.readFile(path.join(__dirname,'chapter.html'),'utf-8',(err,data)=>{
        //     if (req.query.again) {
        //         res.writeHead(200,{'Content-Type':'text/json'}); 
        //         res.write(nowChapter);
        //         res.end();
        //     } else {
        //         res.writeHead(200,{'Content-Type':'text/html'});
        //         for (let i in chapterList) {
        //             if (chapterList[i].chapterId == req.query.chapterId) {
        //                 nowChapter = chapterList[i];
        //                 break;
        //             }
        //         }    
        //     }
        // })
        
    }else if(req.url == '/nChapter/'){
        res.writeHead(200,{'Content-Type':'text/json'});
        nChapter=chapterList[id];  
        res.end(JSON.stringify(nChapter));
    } 
    else if(req.url !== '/'){
        var turl = '.'+req.url;
        res.writeHead(200,{'Content-type':"text/css"});
        fs.readFile(turl, function(err, data) {
            if (err) {
        //         console.error(err);
            }else{
                res.end(data);
            }
        });
    }
}
function Create(req,res){
    if(req.url == '/add'){
        var newChapter = {};
        var postData = ""; 
        // 数据块接收中
         req.addListener("data", function (pDataChunk) {
            postData += pDataChunk;

            var title=qs.parse(postData).title;
            var content=qs.parse(postData).content;
            console.log(qs.parse(postData));

            newChapter.chapterId=chapterList.length+1;
            newChapter.chapterName=title;
            newChapter.chapterDes=content;
            newChapter.chapterContent=content;
            newChapter.publishTimer= "2019-10-19";
            newChapter.author="admin";
            newChapter.views=1022;
            newChapter.imgPath='';
            chapterList.push(newChapter);
        });
        
    }
}
server.listen(8083);
