var express = require('express');
var cors = require("cors");
var bodyParser = require('body-parser');
const fs = require('fs')
const ytdl = require('ytdl-core')
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/', express.static('public'));
server.use(cors({}))
server.set("view engine", "ejs");
server.get("/",(require,response)=>{
    response.sendnodeFile("./public/index.html")
});
server.post("/Download",async (require,response)=>{
    try{
        let url = require.body.URL;
        let video = await ytdl.getInfo(url);
        response.header("Content-Disposition","attachment;\ filename="+video.videoDetails.title+".mp4")
        ytdl(url,{}).pipe(response);
    }
    catch{
        response.render("index",{Erro:"Algo deu errado, tente novamente."})
    }
});

server.listen(process.env.PORT || 3000);