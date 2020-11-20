const fs = require('fs');

const glob = require("glob-promise")
const { crop } = require('jimp');
const Jimp = require('jimp');

const imageQuality = 100
const outputPath = "./static/sign-images"
const colorThreshold = 100

glob("./data/signs/*.jpg")
    .then(function(files) {
        console.log(files)
        return Promise.all(files.map(readImage)).then(data => {
            console.log(data)
            fs.writeFileSync("./src/data.json", JSON.stringify(data))
            return 0
        })

    })
    .then( s => {
        if (s == 0) {
            console.log("done!")
        }
    })

function readImage(path) {
    const filename = path.split("/").slice(-1)[0].replace(".jpg", "")

    return Jimp.read(path)
        .then(image => {
        const width = image.getWidth()
        const height = image.getHeight()
        const maskImage = image.clone()
        image
            .crop(0, 0, width / 2, height)
            .quality(imageQuality)
            .write(`${outputPath}/${filename}-original.jpg`)


        
        const croppedMask = maskImage
            .quality(imageQuality)
            .crop(width / 2, 0, width / 2, height)

        croppedMask
            // .quality(imageQuality)
            .write(`${outputPath}/${filename}-mask.jpg`)

        const results = Jimp.read(`${outputPath}/${filename}-mask.jpg`)
            .then(img => {
                const ratios = {
                    "red": 0,
                    "blue": 0,
                    "black": 0,
                    "filename": filename,
                }
                img.scan(0, 0, img.getWidth(), img.getHeight(), function(x, y, idx) {
                    const red = this.bitmap.data[idx + 0]
                    const blue = this.bitmap.data[idx + 2]
                    if ( red > colorThreshold) {
                        ratios["red"] += 1
                    } if (blue > colorThreshold) {
                        ratios["blue"] += 1
                    } if( red < 10 && blue < 10) {
                        ratios["black"] += 1
                    }

                })
                return ratios
            })
        return results
    })
}