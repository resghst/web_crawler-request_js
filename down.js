//you can download image by this code
//image-downloader is a js download image package

var download = require('image-downloader')

// Download to a directory and save with the original filename
const options = {
  url: 'yout image link', //url link
  dest: 'your file path'  // Saved image link
}
download.image(options)
.then(({ filename, image }) => {
  console.log('File saved to '+ filename )
}).catch((err) => {
  throw err
})
   