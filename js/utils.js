const defaultBpm = 60;
const defaultTime = 1000;

function parseBpmToMilliseconds(bpm) {
    return Math.floor((defaultTime / bpm) * defaultBpm);
}

function play() {
    if (isPlaying) return;

    isPlaying = true;
    isPaused = false;

    console.info("Lets Rick n Roll!");

    intervalId = setInterval(() => {
        const tempo = iterateOverTempo();
        if (!scheduledBeats[tempo]) scheduledBeats[tempo] = [];
        scheduledBeats[tempo].forEach(scheduledItem => {
            playScheduledElement(scheduledItem, tempo);
        });

    }, bpmInMilliseconds / tempoMeasure);
}

function pause() {
    if (!isPlaying) return;
    isPlaying = false;
    isPaused = true;

    console.log(scheduledBeats);

    console.info("Pq parou? parou pq?");
    clearInterval(intervalId);
}

function stop() {
    if ((isPlaying = true) && (isPaused = false)) return;
    isPlaying = false;

    actualTempo = 1;
    actualTempoMeasure = 0;

    console.info("Pq parou? parou pq?");
    clearInterval(intervalId);

    for (var playedElement in playedElements) {
        if (playedElement) {
            toggleItemClassAtTempo(playedElement, playedElements[playedElement], false);
        }
    }
}