const tempoQuantity = 4;
const tempoMeasure = 4;

let actualTempo = 1;
let actualTempoMeasure = 0;

let lastPlayedTempo = "";

const scheduledBeats = {
    //"T1.1": ["beat"],
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