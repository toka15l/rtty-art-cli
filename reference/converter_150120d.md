# Converter

## Load
```
import flash.display.Loader;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.geom.Rectangle;
import flash.display.MovieClip;
import flash.utils.ByteArray;

stop();

var currentReference = 0;
var currentX = 0;
var currentY = 0;
var image:BitmapData;
var references:Array = [["a", "A"], ["b", "B"], ["c", "C"], ["d", "D"], ["e", "E"], ["f", "F"], ["g", "G"], ["h", "H"], ["i", "I"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["n", "N"], ["o", "O"], ["p", "P"], ["q", "Q"], ["r", "R"], ["s", "S"], ["t", "T"], ["u", "U"], ["v", "V"], ["w", "W"], ["x", "X"], ["y", "Y"], ["z", "Z"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["c1", "-"], ["c3", "$"], ["c4", "!"], ["c5", "&"], ["c7", "("], ["c8", ")"], ["c9", "\""], ["c10", "/"], ["c11", ":"], ["c12", ";"], ["c13", "?"], ["c14", ","], ["c15", "."], ["c16", " "]]; // ["c2", "'"] | ["c6", "#"]
//var references:Array = [["01", ""], ["02", ""], ["03", ""], ["04", ""], ["05", ""], ["06", ""], ["07", ""], ["08", ""], ["09", ""], ["10", ""], ["11", ""], ["12", ""], ["13", ""], ["14", ""], ["15", ""], ["16", ""]];
var referenceWidth:Number;
var referenceHeight:Number;
var loader:Loader;
var holder:MovieClip = new MovieClip();
addChild(holder);

var currentYSection:Number = 0;
var currentXSection:Number = 0;
var totalXSections:Number;
var totalYSections:Number;
var textOutput:String = "";


function loadReferences():void {
	loader = new Loader();
	loader.load(new URLRequest("reference/" + references[currentReference][0] + ".png"));
	//loader.load(new URLRequest("testReference/" + references[currentReference][0] + ".png"));
	loader.contentLoaderInfo.addEventListener(Event.COMPLETE, referenceLoaded);
}
loadReferences();

function referenceLoaded(e:Event):void {
	references[currentReference][0] = Bitmap(loader.content).bitmapData;
	if (currentReference == 0) {
		referenceWidth = (references[currentReference][0] as BitmapData).width;
		referenceHeight = (references[currentReference][0] as BitmapData).height;
	}
	if ((references[currentReference][0] as BitmapData).height != referenceHeight || (references[currentReference][0] as BitmapData).width != referenceWidth) {
		trace("Error: Inconsistant Reference Size");
	} else {
		var bitmap:Bitmap = new Bitmap(references[currentReference][0])
		bitmap.x = currentX;
		bitmap.y = currentY;
		holder.addChild(bitmap);
		currentX += referenceWidth;
		if (currentX > stage.stageWidth) {
			currentX = 0;
			currentY += referenceHeight;
		}
		if (currentReference + 1 < references.length) {
			currentReference++;
			loadReferences();
		} else {
			while (holder.numChildren > 0) {
				holder.removeChildAt(0);
			}
			loadImage();
		}
	}
}

function loadImage():void {
	loader = new Loader();
	loader.load(new URLRequest("compare.png"));
	loader.contentLoaderInfo.addEventListener(Event.COMPLETE, imageLoaded);
}
 
function imageLoaded(e:Event):void {
	image = Bitmap(loader.content).bitmapData;
	var imageBitmap:Bitmap = new Bitmap(image);
	holder.addChild(imageBitmap);
	holder.height = 768;
	holder.width = 423;
	totalXSections = Math.floor(image.width / referenceWidth);
	totalYSections = Math.floor(image.height / referenceHeight);
	gotoAndPlay("loop");
}

function compare(section:BitmapData):Number {
	var currentMatch:Number = 0;
	var bestMatchDifferenceAmount:Number;
	
	for (var i:Number = 0; i < references.length; i++) {
		
		
		
		var bounds:Rectangle = new Rectangle(0, 0, referenceWidth, referenceHeight);
		var sectionPixels:ByteArray = section.getPixels(bounds);
		var referencePixels:ByteArray = (references[i][0] as BitmapData).getPixels(bounds);
		var currentDifferenceAmount:Number = 0;
		for (var j:Number = 1; j < sectionPixels.length; j += 4) {
			currentDifferenceAmount += Math.abs(sectionPixels[j] - referencePixels[j]);
			currentDifferenceAmount += Math.abs(sectionPixels[j + 1] - referencePixels[j + 1]);
			currentDifferenceAmount += Math.abs(sectionPixels[j + 2] - referencePixels[j + 2]);
		}
		
		
		if (i == 0) {
			bestMatchDifferenceAmount = currentDifferenceAmount;
		} else {
			if (currentDifferenceAmount < bestMatchDifferenceAmount) {
				currentMatch = i;
				bestMatchDifferenceAmount = currentDifferenceAmount;
			}
		}
	}
	
	/*
	for (var i:Number = 0; i < references.length; i++) {
		var currentDifferenceAmount:Number = 0;
		for (var j:Number = 0; j < referenceHeight; j++) {
			for (var k:Number = 0; k < referenceWidth; k++) {
				var sectionPixel:ByteArray = new ByteArray();
				sectionPixel.writeUnsignedInt(section.getPixel(k, j));
				var referencePixel:ByteArray = new ByteArray();
				referencePixel.writeUnsignedInt((references[i][0] as BitmapData).getPixel(k, j));
				currentDifferenceAmount += Math.abs(sectionPixel[1] - referencePixel[1]);
			}
		}
		if (i == 0) {
			bestMatchDifferenceAmount = currentDifferenceAmount;
		} else {
			if (currentDifferenceAmount < bestMatchDifferenceAmount) {
				currentMatch = i;
				bestMatchDifferenceAmount = currentDifferenceAmount;
			}
		}
	}
	*/
	return currentMatch;
}

/*
function compare(section:BitmapData):Number {
	var currentMatch:Number = 0;
	var matchingNumber = 0;
	for (var i:Number = 0; i < references.length; i++) {
		var currentComparison:BitmapData = section.compare(references[i][0]) as BitmapData;
		if (currentComparison == null) {
			currentMatch = i;
			break;
		} else {
			var bounds:Rectangle = new Rectangle(0, 0, referenceWidth, referenceHeight);
			var pixels:ByteArray = currentComparison.getPixels(bounds);
			var difference:Number = 0;
			for (var j:Number = 0; j < pixels.length; j++) {
				difference += pixels[j];
			}
			if (i == 0) {
				matchingNumber = difference;
			} else {
				if (difference < matchingNumber) {
					matchingNumber = difference;
					currentMatch = i;
				}
			}
		}
	}
	return currentMatch;
}
*/
```
## Loop
```
stop();

var currentSection:BitmapData = new BitmapData(referenceWidth, referenceHeight);			
currentSection.copyPixels(image, new Rectangle(currentXSection * referenceWidth, currentYSection * referenceHeight, referenceWidth, referenceHeight), new Point(0, 0));
var matchingIndex:Number = compare(currentSection);
textOutput = textOutput + references[matchingIndex][1];
var matchingBitmap:Bitmap = new Bitmap(references[matchingIndex][0]);
matchingBitmap.x = currentXSection * referenceWidth;
matchingBitmap.y = currentYSection * referenceHeight;
holder.addChild(matchingBitmap);

gotoAndPlay(currentFrame + 1);
```

## Last frame
```
stop();

currentXSection++;

if (currentXSection == totalXSections) {
	currentXSection = 0;
	currentYSection++;
	textOutput = textOutput + "\n";
	if (currentYSection == totalYSections) {
		trace("done");
		trace(textOutput);
	} else {			
		gotoAndPlay("loop");
	}
} else {
	gotoAndPlay("loop");
}
```