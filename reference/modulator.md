int OUTPUT_PIN = 8;
int MARK_FREQ = 2125;
int SPACE_FREQ = 2295;
int LINE_WIDTH = 73;
String printString = "so this happened a few days ago and its only a minor fuck up. i had recently learned how to do some morse codes.";
boolean figs = true;
int linePosition = 0;

void setup() {
//Serial.begin(9600);
// begin sending current to start converter
tone(OUTPUT_PIN, MARK_FREQ);
delay(5000);
// set figs to a known state
setFigs(false);
// return carriage
carriageReturn();
lineFeed();
// send chars
printString.toUpperCase();
for (int i = 0; i < printString.length(); i++) {
linePosition++;
if (linePosition == LINE_WIDTH) {
linePosition = 0;
carriageReturn();
lineFeed();
}
printChar(printString.charAt(i));
}
carriageReturn();
lineFeed();
noTone(OUTPUT_PIN);
}

void loop() {
}

void printChar(char c) {
boolean bit1 = 0;
boolean bit2 = 0;
boolean bit3 = 0;
boolean bit4 = 0;
boolean bit5 = 0;

if (c == 'A' || c == '-') {
if (c == 'A') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 1;
bit3 = 0;
bit4 = 0;
bit5 = 0;
} else if (c == 'B' || c == '?') {
if (c == 'B') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 0;
bit4 = 1;
bit5 = 1;
} else if (c == 'C' || c == ':') {
if (c == 'C') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 1;
bit3 = 1;
bit4 = 1;
bit5 = 0;
} else if (c == 'D' || c == '$') {
if (c == 'D') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 0;
bit4 = 1;
bit5 = 0;
} else if (c == 'E' || c == '3') {
if (c == 'E') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 0;
bit4 = 0;
bit5 = 0;
} else if (c == 'F' || c == '!') {
if (c == 'F') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 1;
bit4 = 1;
bit5 = 0;
} else if (c == 'G' || c == '&') {
if (c == 'G') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 1;
bit3 = 0;
bit4 = 1;
bit5 = 1;
} else if (c == 'H' || c == '#') {
if (c == 'H') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 0;
bit3 = 1;
bit4 = 0;
bit5 = 1;
} else if (c == 'I' || c == '8') {
if (c == 'I') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 1;
bit3 = 1;
bit4 = 0;
bit5 = 0;
} else if (c == 'J') { // FIGS IS BELL
if (c == 'J') {
setFigs(false);
}
bit1 = 1;
bit2 = 1;
bit3 = 0;
bit4 = 1;
bit5 = 0;
} else if (c == 'K' || c == '(') {
if (c == 'K') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 1;
bit3 = 1;
bit4 = 1;
bit5 = 0;
} else if (c == 'L' || c == ')') {
if (c == 'L') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 1;
bit3 = 0;
bit4 = 0;
bit5 = 1;
} else if (c == 'M' || c == '.') {
if (c == 'M') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 0;
bit3 = 1;
bit4 = 1;
bit5 = 1;
} else if (c == 'N' || c == ',') {
if (c == 'N') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 0;
bit3 = 1;
bit4 = 1;
bit5 = 0;
} else if (c == 'O' || c == '9') {
if (c == 'O') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 0;
bit3 = 0;
bit4 = 1;
bit5 = 1;
} else if (c == 'P' || c == '0') {
if (c == 'P') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 1;
bit3 = 1;
bit4 = 0;
bit5 = 1;
} else if (c == 'Q' || c == '1') {
if (c == 'Q') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 1;
bit3 = 1;
bit4 = 0;
bit5 = 1;
} else if (c == 'R' || c == '4') {
if (c == 'R') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 1;
bit3 = 0;
bit4 = 1;
bit5 = 0;
} else if (c == 'S' || c == '\'') {
if (c == 'S') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 1;
bit4 = 0;
bit5 = 0;
} else if (c == 'T' || c == '5') {
if (c == 'T') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 0;
bit3 = 0;
bit4 = 0;
bit5 = 1;
} else if (c == 'U' || c == '7') {
if (c == 'U') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 1;
bit3 = 1;
bit4 = 0;
bit5 = 0;
} else if (c == 'V' || c == ';') {
if (c == 'V') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 0;
bit2 = 1;
bit3 = 1;
bit4 = 1;
bit5 = 1;
} else if (c == 'W' || c == '2') {
if (c == 'W') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 1;
bit3 = 0;
bit4 = 0;
bit5 = 1;
} else if (c == 'X' || c == '/') {
if (c == 'X') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 1;
bit4 = 1;
bit5 = 1;
} else if (c == 'Y' || c == '6') {
if (c == 'Y') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 1;
bit4 = 0;
bit5 = 1;
} else if (c == 'Z' || c == '"') {
if (c == 'Z') {
setFigs(false);
} else {
setFigs(true);
}
bit1 = 1;
bit2 = 0;
bit3 = 0;
bit4 = 0;
bit5 = 1;
} else if (c == ' ') {
bit1 = 0;
bit2 = 0;
bit3 = 1;
bit4 = 0;
bit5 = 0;
} else if (c == 13) { // carriage return
carriageReturn();
lineFeed();
}

if (bit1 == 0 && bit2 == 0 && bit3 == 0 && bit4 == 0 && bit5 == 0) {
// do nothing, cannot print character
} else {  
// start bit
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
// bit 1
if (bit1 == true) {
tone(OUTPUT_PIN, MARK_FREQ);
} else {
tone(OUTPUT_PIN, SPACE_FREQ);
}
delay(22);
// bit 2
if (bit2 == true) {
tone(OUTPUT_PIN, MARK_FREQ);
} else {
tone(OUTPUT_PIN, SPACE_FREQ);
}
delay(22);
// bit 3
if (bit3 == true) {
tone(OUTPUT_PIN, MARK_FREQ);
} else {
tone(OUTPUT_PIN, SPACE_FREQ);
}
delay(22);
// bit 4
if (bit4 == true) {
tone(OUTPUT_PIN, MARK_FREQ);
} else {
tone(OUTPUT_PIN, SPACE_FREQ);
}
delay(22);
// bit 5
if (bit5 == true) {
tone(OUTPUT_PIN, MARK_FREQ);
} else {
tone(OUTPUT_PIN, SPACE_FREQ);
}
delay(22);  
// stop bit
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
}
}

void carriageReturn() {
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
}

void lineFeed() {
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
}

void setFigs(boolean sFigs) {
if (figs != sFigs) {
figs = sFigs;
if (figs == true) {
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
} else {
tone(OUTPUT_PIN, SPACE_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
tone(OUTPUT_PIN, MARK_FREQ);
delay(22);
}
}
}