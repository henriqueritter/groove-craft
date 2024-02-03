var bpm = 60;
var bpmInMilliseconds = 1000;

const minimumBpm = 1;
const maximuBpm = 400;

window.onload = function() {
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var queryParamBpm = Number(url.searchParams.get("bpm"));
        console.log(queryParamBpm);
        if (!queryParamBpm) {
            console.error("Invalid value on 'bpm' Query param");
            return;
        }

        if (!isAValidBpm(queryParamBpm)) {
            console.error(`bpm should be between ${minimumBpm} and ${maximuBpm}`);
            return;
        }

        bpm = Number(queryParamBpm);
        document.getElementById("actualBpm").value = bpm;
        bpmInMilliseconds = parseBpmToMilliseconds(bpm);
    } catch (err) {
        console.error(err);
    }
}


var intervalId = 1;
var isPlaying = false;
var isPaused = false;

var actualTempo = 1;
var actualTempoMeasure = 0;

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


function isAValidBpm(bpm) {
    if (bpm < minimumBpm || bpm > maximuBpm) {
        return false;
    }
    return true;
}


function increaseBpm(amount) {
    if (bpm >= maximuBpm) return;

    bpm = bpm + amount;
    bpmInMilliseconds = parseBpmToMilliseconds(bpm);
    document.getElementById("actualBpm").value = bpm;

    if (!isPlaying) return;
    pause();
    play();
}

function decreaseBpm(amount) {
    if (bpm <= minimumBpm) return;

    bpm = bpm - amount;
    bpmInMilliseconds = parseBpmToMilliseconds(bpm);
    document.getElementById("actualBpm").value = bpm;

    if (!isPlaying) return;
    pause();
    play();
}

function updateBpmFromTextElement(element) {
    const newBpm = Number(element.value);
    if (typeof newBpm !== "number") {
        console.error("BPM is NaN");
        return;
    }

    if (!isAValidBpm(newBpm)) {
        console.error(`bpm should be between ${minimumBpm} and ${maximuBpm}`);
        return;
    }

    bpm = newBpm;
    bpmInMilliseconds = parseBpmToMilliseconds(bpm);

    if (!isPlaying) return;
    pause();
    play();
}

function playAudioOfElement(elementName) {
    const audio = new Audio(`assets/${elementName}.wav`);
    audio.load();
    audio.play();
}

function playScheduledElement(element, tempo) {
    if (element !== "beat") {
        playAudioOfElement(element);
    }

    toggleItemClassAtTempo(element, tempo, true);
}

function toggleItemClassAtTempo(item, tempo, isActivated) {
    if (isActivated) {
        if (lastPlayedTempo) document.getElementById(`${item}-${lastPlayedTempo}`).className = "deactivated";
        document.getElementById(`${item}-${tempo}`).className = "activated";
        return;
    }

    document.getElementById(`${item}-${tempo}`).className = "deactivated";
}

function scheduleElement(element) {
    const splitedElementId = element.id.split("-");

    const itemIndex = scheduledBeats[splitedElementId[1]].indexOf(splitedElementId[0]);

    if (itemIndex > -1) {
        unscheduleElement(splitedElementId[0], splitedElementId[1], itemIndex);
        document.getElementById(`${splitedElementId[0]}-${splitedElementId[1]}`).firstChild.className = "statusOff";
        return;
    }

    scheduledBeats[splitedElementId[1]].push(splitedElementId[0]);

    document.getElementById(`${splitedElementId[0]}-${splitedElementId[1]}`).firstChild.className = "statusOn";
    return;
}

function unscheduleElement(elementId, elementTempo, scheduleIndex) {
    scheduledBeats[elementTempo].splice(scheduleIndex, 1);
    toggleItemClassAtTempo(elementId, elementTempo, false);
}


initializeScheduledBeats();