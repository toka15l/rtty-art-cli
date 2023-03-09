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

program.option("-p, --path <string>", "path to png file");
program.parse();
const options = program.opts();

console.log(options.path);

let dst = new PNG({ width: 30, height: 47 });
fs.createReadStream(options.path)
  .pipe(new PNG())
  .on("parsed", function () {
    try {
      this.bitblt(dst, 250, 250, 30, 47, 0, 0);
      dst.pack().pipe(fs.createWriteStream("out.png"));
    } catch (e) {
      console.log(e);
    }
  });

/*image1.bitblt(currentSection, 0, 0, width, height, 0, 0);
fs.writeFileSync("diff.png", PNG.sync.write(currentSection));

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
