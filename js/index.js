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

//este só vai servir para o metronomo mesmo
const playItems = [
    { name: "kick", isEveryBeat: false },
    { name: "beat", isEveryBeat: true },
];

const playedElements = {

}

const scheduledBeats = {
    "T1.1": ["beat"],
    "T1.2": ["beat"],
    "T1.3": ["beat"],
    "T1.4": ["beat"],
    "T2.1": ["beat"],
    "T2.2": ["beat"],
    "T2.3": ["beat"],
    "T2.4": ["beat"]
}


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


function playScheduledElement(element, tempo) {
    if (playedElements[element]) {
        toggleItemClassAtTempo(element, playedElements[element], false);
    }

    toggleItemClassAtTempo(element, tempo, true);

    playedElements[element] = tempo;
}

function toggleItemClassAtTempo(item, tempo, isActivated) {
    if (isActivated) {
        document.getElementById(`${item}-${tempo}`).className = "activated";
        return;
    }

    document.getElementById(`${item}-${tempo}`).className = "deactivated";
}

//-----------
function toggleElement(element) {
    const splitedElement = element.id.split("-");

    const itemIndex = scheduledBeats[splitedElement[1]].indexOf(splitedElement[0]);

    if (itemIndex > -1) {
        console.log(itemIndex);
        scheduledBeats[splitedElement[1]].splice(itemIndex, 1);
        toggleItemClassAtTempo(splitedElement[0], splitedElement[1], false);
        return;
    }

    scheduledBeats[splitedElement[1]].push(splitedElement[0]);

    toggleItemClassAtTempo(splitedElement[0], splitedElement[1], true);
    return;
}