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

function playAudioOfElement(elementName) {
    const audio = new Audio(`assets/${elementName}.wav`);
    audio.load();
    audio.play();
}

function initializeScheduledBeats() {
    for (let i = 0; i < tempoQuantity; i++) {
        for (let j = 0; j < tempoMeasure; j++) {
            const tempo = iterateOverTempo();
            if (!scheduledBeats[tempo]) scheduledBeats[tempo] = ["beat"];
        }
    }
}