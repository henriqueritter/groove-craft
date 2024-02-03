var bpm = 60;
var bpmInMilliseconds = 1000;

var intervalId = 1;
var isPlaying = false;
var isPaused = false;

var actualTempo = 1;
var actualTempoMeasure = 0;

const elements = ["beat", "kick", "snare", "hithat"];

const playedElements = {
    //"beat"
}

//armazena o estado do tempo para saber quando desligar uma batida
let lastPlayedTempo = "";

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
    if (element !== "beat") {
        const audio = new Audio(`assets/${element}.wav`);
        audio.load();
        audio.play();
    }

    toggleItemClassAtTempo(element, tempo, true);

    playedElements[element] = tempo;
}

function toggleItemClassAtTempo(item, tempo, isActivated) {
    if (isActivated) {
        if (lastPlayedTempo) document.getElementById(`${item}-${lastPlayedTempo}`).className = "deactivated";
        document.getElementById(`${item}-${tempo}`).className = "activated";
        return;
    }

    document.getElementById(`${item}-${tempo}`).className = "deactivated";
}

//-----------
function scheduleElement(element) {
    const splitedElementId = element.id.split("-");

    const itemIndex = scheduledBeats[splitedElementId[1]].indexOf(splitedElementId[0]);

    if (itemIndex > -1) {
        //scheduledBeats[splitedElementId[1]].splice(itemIndex, 1);
        //toggleItemClassAtTempo(splitedElementId[0], splitedElementId[1], false);
        unscheduleElement(splitedElementId[0], splitedElementId[1], itemIndex);
        document.getElementById(`${splitedElementId[0]}-${splitedElementId[1]}`).firstChild.className = "statusOff";
        return;
    }

    scheduledBeats[splitedElementId[1]].push(splitedElementId[0]);

    /////toggleItemClassAtTempo(splitedElementId[0], splitedElementId[1], true);
    document.getElementById(`${splitedElementId[0]}-${splitedElementId[1]}`).firstChild.className = "statusOn";
    return;
}

function unscheduleElement(elementId, elementTempo, scheduleIndex) {
    scheduledBeats[elementTempo].splice(scheduleIndex, 1);
    toggleItemClassAtTempo(elementId, elementTempo, false);
}


initializeScheduledBeats();