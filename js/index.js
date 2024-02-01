var bpm = 60;
var bpmInMilliseconds = 1000;

var intervalId = 1;
var isPlaying = false;
var isPaused = false;

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
    //"beat"
}

//armazena o estado do tempo para saber quando desligar uma batida
let lastPlayedTempo = "T1.1";

const scheduledBeats = {
    //"T1.1": ["beat"],
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

function initializeScheduledBeats() {
    for (let i = 0; i < tempoQuantity; i++) {
        for (let j = 0; j < tempoMeasure; j++) {
            const tempo = iterateOverTempo();
            if (!scheduledBeats[tempo]) scheduledBeats[tempo] = ["beat"];
        }
    }
}


function increaseBpm() {

    if (bpm >= 300) return;

    bpm = bpm + 1;
    bpmInMilliseconds = parseBpmToMilliseconds(bpm);
    document.getElementById("actualBpm").textContent = bpm;

    if (!isPlaying) return;
    pause();
    play();
}

function decreaseBpm() {
    if (bpm <= 1) return;

    bpm = bpm - 1;
    bpmInMilliseconds = parseBpmToMilliseconds(bpm);
    document.getElementById("actualBpm").textContent = bpm;

    if (!isPlaying) return;
    pause();
    play();
}


function playScheduledElement(element, tempo) {


    if (playedElements[element]) {
        toggleItemClassAtTempo(element, playedElements[element], false);
    }
    console.log(element, tempo);
    toggleItemClassAtTempo(element, tempo, true);

    playedElements[element] = tempo;
}

function toggleItemClassAtTempo(item, tempo, isActivated) {
    if (isActivated) {
        document.getElementById(`${item}-${lastPlayedTempo}`).className = "deactivated";
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


initializeScheduledBeats();