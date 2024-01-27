var bpm = 60;
var bpmInMilliseconds = 1000;

var intervalId = 1;
var isPlaying = false;

const tempoQuantity = 2;
const tempoMeasure = 4;

var actualTempo = 1;
var actualTempoMeasure = 0;

const tempoInCompass = `T${actualTempo}.${actualTempoMeasure}`;

const toggledItems = {}

const playItems = [
    { name: "kick", isEveryBeat: false },
    { name: "beat", isEveryBeat: true }
];


function iterateOverTempo() {

    actualTempoMeasure++;

    if (actualTempoMeasure > tempoMeasure) {
        actualTempo++;
        actualTempoMeasure = 1;
    }

    if (actualTempo > tempoQuantity) {
        actualTempo = 1;
    }

    return `T${actualTempo}.${actualTempoMeasure}`; //T1.1
}

function toggledItemOn(item, tempo) {
    document.getElementById(`${item}-${tempo}`).className = "activated";

    toggledItems[item] = tempo;
}

function toggleItemOff(item) {
    if (toggledItems[item]) document.getElementById(`${item}-${toggledItems[item]}`).className = "deactivated";
}

function toggleItem(item, tempo, isEveryBeat) {
    var toggledItemTempo = isEveryBeat ? `${tempo}` : `T${actualTempo}.1`;

    toggleItemOff(item);
    toggledItemOn(item, toggledItemTempo);
}



function play() {
    if (isPlaying) return;
    isPlaying = true;
    console.info("Lets Rick n Roll!");

    intervalId = setInterval(() => {
        const tempo = iterateOverTempo();
        playItems.forEach(item => toggleItem(item.name, tempo, item.isEveryBeat))

    }, bpmInMilliseconds);
}

function stop() {
    if (!isPlaying) return;
    isPlaying = false;

    console.info("Pq parou? parou pq?");
    clearInterval(intervalId);
}

function increaseBpm() {
    if (bpm >= 300) return;

    bpm = bpm + 1;
    bpmInMilliseconds = parseBpmToMilliseconds(bpm);
    document.getElementById("actualBpm").textContent = bpm;
}

function decreaseBpm() {
    if (bpm <= 1) return;

    bpm = bpm - 1;
    bpmInMilliseconds = parseBpmToMilliseconds(bpm);
    document.getElementById("actualBpm").textContent = bpm;
}