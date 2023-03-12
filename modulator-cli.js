const Speaker = require('speaker');

const sampleRate = 44100;
const markFrequency = 2125; // hz
const spaceFrequency = 2295; // hz
const charsPerMin = 360;
const bits = 7;
const samplesPerChar = Math.floor((sampleRate * 60) / charsPerMin);
const samplesPerBit = Math.floor((sampleRate * 60) / (charsPerMin * bits));
const message = "hello hello hello hello hello";
//const duration = 10; // in seconds
//const numberOfSamples = sampleRate * duration * 2;
const numberOfSamples = message.length * samplesPerChar;
const samples = new Int16Array(numberOfSamples + (sampleRate * 6)); // adding extra samples, the buffer seems to cut off early otherwise

let bufferIndex = 0;

function mark() {
    for (let i = 0; i < samplesPerBit; i++) {
        bufferIndex++;
        const t = bufferIndex / sampleRate;
        const sample = Math.sin(2 * Math.PI * markFrequency * t);
        samples[bufferIndex] = Math.floor(sample * 32767); // convert to 16-bit integer
    }
}

function space() {
    for (let i = 0; i < samplesPerBit; i++) {
        bufferIndex++;
        const t = bufferIndex / sampleRate;
        const sample = Math.sin(2 * Math.PI * spaceFrequency * t);
        samples[bufferIndex] = Math.floor(sample * 32767); // convert to 16-bit integer
    }
}

/*for (let j = 0; j < (message.length * bits) / 6; j++) {
    space(); // start
    space();
    space();
    mark();
    space();
    mark();
    mark(); // stop
}*/

for (let j = 0; j < 5; j++) {
    space(); // start
    space();
    space();
    mark();
    space();
    mark();
    mark(); // stop

    space(); // start
    mark();
    space();
    space();
    space();
    space();
    mark(); // stop

    space(); // start
    space();
    mark();
    space();
    space();
    mark();
    mark(); // stop

    space(); // start
    space();
    mark();
    space();
    space();
    mark();
    mark(); // stop

    space(); // start
    space();
    space();
    space();
    mark();
    mark();
    mark(); // stop

    space(); // start
    space();
    space();
    space();
    space();
    space();
    mark(); // stop
}


/*for (bufferIndex; bufferIndex < numberOfSamples; bufferIndex++) {
    const t = bufferIndex / sampleRate;
    const sample = Math.sin(2 * Math.PI * spaceFrequency * t);
    samples[bufferIndex] = Math.floor(sample * 32767); // convert to 16-bit integer
}*/

//console.log(numberOfSamples);

const speaker = new Speaker({
    channels: 1,          // mono
    bitDepth: 16,         // 16-bit samples
    sampleRate: sampleRate
});

speaker.write(Buffer.from(samples.buffer));