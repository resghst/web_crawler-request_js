var request = require("request")
var fs = require("fs")
var cheerio = require("cheerio")
var download = require('image-downloader')
var pageline = 1

request({
  url: "https://www.ptt.cc/bbs/hotboards.html",
  mathod: "GET"
}, 
(e, r, b)=>{ 							 //e => error		r => request		b => body
  if( e || !b ){ return }
  var $ = cheerio.load(b)
  var result =[]
  var titles = $(".board")
  var boardname = $(".board .board-name")  //name
  for(var i=0; i < titles.length; i++){
    if( $(boardname[i]).text() == "Beauty" ){
      var broadurl = "https://www.ptt.cc" + $(".board")[i]["attribs"]["href"]
      request({
				url: broadurl,
				mathod: "GET"
      }, 
      (e, r, b)=>{ 
				if( e || !b ){ return }
				var linklist_total = []
				var linklist = []
				var $ = cheerio.load(b)
				var pagecount = $(".btn-group.btn-group-paging a")[1]["attribs"]["href"].split("/")[3]
				pagecount = pagecount.split(".")[0].replace("index","")
				pagecount = parseInt(pagecount) + 1
				for(var j=0; j < pageline ;j++){
					var broadurl = "https://www.ptt.cc/bbs/Beauty/index" + pagecount-- + ".html"
				  console.log("url :::" +broadurl)
					request({
						url: broadurl,
						mathod: "GET"
					}, 
					(e, r, b)=>{
						if( e || !b ){ return }
						var $ = cheerio.load(b)
						var content = {}
						for(var i=0; i<$(".title a").length; i++){
							content = {}
							content.url = "https://www.ptt.cc" + $(".title a")[i]["attribs"]["href"]
							content.title = $(".title a")[i]["children"][0]["data"]
							linklist_total.push(content)
							linklist.push(content.url)
						}
						for(var item in linklist_total){
							var url = linklist_total[item].url
							request({
								url: url,
								mathod: "GET"
							},
							(e, r, b)=>{
								if( e || !b ){ return }
								var $ = cheerio.load(b)
								var result =[]
								var titles = $('a[href]')
								for(var i=0; i < titles.length; i++){
									if( $(titles[i]).text().match('imgur') != null ){
										var imagelink = $(titles[i]).text()
										result.push(imagelink)
										downfile(imagelink)
									}
								}
								// console.log(result)
							})
						}
					})
				}
      })
    }
  }
})


// // Download to a directory and save with the original filename
var downfile = (imgurl)=>{
	const options = {
		url: imgurl,
		dest: './img'  // Save to /path/to/dest/image.jpg
	}
	download.image(options)
	.then(({ filename, image }) => {
		console.log('File saved to '+ filename )
	}).catch((err) => {
		throw err
	})
}

