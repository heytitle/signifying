# Signifying

**URL:** https://hardcore-goldstine-702933.netlify.app

**Note:** I currently have no plan to develop this further. If you are interested, pleaes get in touch. One thing that should be addressed is how we should collect data in such a way that we can do statistical comparison.

## Development

### Generate data.json
The website relies on `data.json` which is automatically generated from images in `./data/signs`. These images are **assumed** to the concatenation of the original and its mask side-by-side; hence, the width of the images should be even, i.e. multiplication of two.

```
 node ./scripts/process.js
```
