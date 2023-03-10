const { program } = require("commander");
const fs = require("fs");
const PNG = require("pngjs").PNG;
const pixelMatch = require("pixelmatch");
const image1 = PNG.sync.read(fs.readFileSync("images/test/02.png"));
const image2 = PNG.sync.read(fs.readFileSync("images/charset/1.png"));
const width = 30;
const height = 47;
const currentSection = new PNG({ width, height });
const currentDiff = new PNG({ width, height });

program.requiredOption("-p, --path <string>", "path to png file");
program.parse();
const options = program.opts();

console.log(options.path);

fs.createReadStream(options.path)
  .pipe(new PNG())
  .on("parsed", function () {
    try {
        for (let i = 0; i < 3; i++) {
            let currentSegment = new PNG({ width: 30, height: 47 });
            this.bitblt(currentSegment, 250 + (i * 30), 250, 30, 47, 0, 0);
            currentSegment.pack().pipe(fs.createWriteStream("out_" + i +".png"));
        }
    } catch (e) {
      console.log(e);
    }
  });

pixelMatch(currentSection.data, image2.data, currentDiff.data, width, height, {
  threshold: 0.1,
  diffMask: true,
});*/

/*let pixelDiffCount = 0;
for (let y = 0; y < currentDiff.height; y++) {
  for (let x = 0; x < currentDiff.width; x++) {
    let idx = (currentDiff.width * y + x) << 2;
    pixelDiffCount += currentDiff.data[idx + 4] === 0 ? 0 : 1; // index 4 is opacity
  }
}
console.log(pixelDiffCount);*/
