var download = require('image-downloader')

// Download to a directory and save with the original filename
const options = {
    url: 'https://imgur.com/1rxbmvW.jpg',
    dest: './'                  // Save to /path/to/dest/image.jpg
  }
   
  download.image(options)
    .then(({ filename, image }) => {
		  console.log('File saved to '+ filename )
    }).catch((err) => {
      throw err
    })
   