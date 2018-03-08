var request = require("request")
var fs = require("fs")
var cheerio = require("cheerio")

request({
    url: "https://www.ptt.cc/bbs/Beauty/M.1520475917.A.D6C.html",
    mathod: "GET"
}, 
(e, r, b)=>{ 
    //e => error
    //r => request
    //b => body 
    if( e || !b ){ return }
    var $ = cheerio.load(b)
    var result =[]
    var titles = $('a[href]')
    for(var i=0; i < titles.length; i++){
        if( $(titles[i]).text().match('imgur') != null ){
            result.push($(titles[i]).text())
            console.log($(titles[i]).text())
        }
    }
})