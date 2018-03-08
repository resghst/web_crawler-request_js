var request = require("request")
var fs = require("fs")
var cheerio = require("cheerio")

request({
    url: "https://www.ptt.cc/bbs/hotboards.html",
    mathod: "GET"
}, 
(e, r, b)=>{ 
    //e => error
    //r => request
    //b => body
    // console.log(b)
    if( e || !b ){ return }
    var $ = cheerio.load(b)
    var result =[]
    var titles = $(".board")
    var titles0 = $(".board .board-name")  //name
    var titles1 = $(".board .board-nuser") //number
    var titles2 = $(".board .board-class") //class name
    var titles3 = $(".board .board-title") //messge
    for(var i=0; i < titles.length; i++){
        if( $(titles0[i]).text() == "Beauty" ){
            var nexturl = "https://www.ptt.cc" + $(".board")[i]["attribs"]["href"]
            request({
                url: nexturl,
                mathod: "GET"
            }, 
            (e, r, b)=>{ 
                if( e || !b ){ return }
                var $ = cheerio.load(b)
                console.log(b)
            })
        }
        
    }
        // console.log($(titles[i]).text())
        // if( $(titles[i]).text().match('imgur') != null ){
        //     result.push($(titles[i]).text())
        //     console.log($(titles[i]).text())
        // }
})


// board-name
// board-nuser
// board-class