const { program } = require("commander");
const fs = require("fs");
const PNG = require("pngjs").PNG;
const pixelMatch = require("pixelmatch");
const sharp = require('sharp');
const width = 30;
const height = 47;
const columns = 80;
const references = [["a", "A"], ["b", "B"], ["c", "C"], ["d", "D"], ["e", "E"], ["f", "F"], ["g", "G"], ["h", "H"], ["i", "I"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["n", "N"], ["o", "O"], ["p", "P"], ["q", "Q"], ["r", "R"], ["s", "S"], ["t", "T"], ["u", "U"], ["v", "V"], ["w", "W"], ["x", "X"], ["y", "Y"], ["z", "Z"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["c1", "-"], ["c3", "$"], ["c4", "!"], ["c5", "&"], ["c7", "("], ["c8", ")"], ["c9", "\""], ["c10", "/"], ["c11", ":"], ["c12", ";"], ["c13", "?"], ["c14", ","], ["c15", "."], ["c16", " "]];

program.requiredOption("-p, --path <string>", "path to png file");
program.parse();
const options = program.opts();

for (let i = 0; i < references.length; i++) {
    references[i].push(PNG.sync.read(fs.readFileSync("images/charset/" + references[i][0] + ".png")));
}

 sharp(options.path)
    .resize(columns * width)
    .png()
    .toFile('TEMP.png').then(() => {fs.createReadStream('TEMP.png')
     .pipe(new PNG())
     .on("parsed", function () {
         try {
             for (let sectionY = 0; sectionY < Math.floor(this.height / height); sectionY++) {
                 let lineString = "";
                 for (let sectionX = 0; sectionX < Math.floor(this.width / width); sectionX++) {
                     let currentSection = new PNG({width, height});
                     this.bitblt(currentSection, sectionX * width, sectionY * height, width, height, 0, 0);
                     let bestMatchDiff = null;
                     let bestMatchIndex = -1;
                     for (let j = 0; j < references.length; j++) {
                         const currentDiff = new PNG({width, height});
                         pixelMatch(currentSection.data, references[j][2].data, currentDiff.data, width, height, {
                             threshold: 0.1,
                             diffMask: true,
                         });
                         let pixelDiffCount = 0;
                         for (let diffY = 0; diffY < currentDiff.height; diffY++) {
                             for (let diffX = 0; diffX < currentDiff.width; diffX++) {
                                 let idx = (currentDiff.width * diffY + diffX) << 2;
                                 pixelDiffCount += currentDiff.data[idx + 4] === 0 ? 0 : 1; // index 4 is opacity
                             }
                         }
                         if (bestMatchIndex === -1 || pixelDiffCount < bestMatchDiff) {
                             bestMatchDiff = pixelDiffCount;
                             bestMatchIndex = j;
                         }
                     }
                     lineString = lineString + references[bestMatchIndex][1];
                     //currentSection.pack().pipe(fs.createWriteStream("out_" + i +".png"));
                 }
                 console.log(lineString);
             }
         } catch (e) {
             console.log(e);
         }
     });}).catch((e) => console.log(e));

