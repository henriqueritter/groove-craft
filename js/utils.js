const defaultBpm = 60;
const defaultTime = 1000;

const tempoQuantity = 4;
const tempoMeasure = 4;

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

        scheduledBeats[tempo].forEach(scheduledItem => {
            playScheduledElement(scheduledItem, tempo);
        });

        if (lastPlayedTempo) {
            scheduledBeats[lastPlayedTempo].forEach(alreadyPlayedBeat => {
                toggleItemClassAtTempo(alreadyPlayedBeat, lastPlayedTempo, false);
            });
        }

        lastPlayedTempo = tempo;
    }, bpmInMilliseconds / tempoMeasure);
}

function pause() {
    if (!isPlaying) return;
    isPlaying = false;
    isPaused = true;

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


    if (lastPlayedTempo) {
        scheduledBeats[lastPlayedTempo].forEach(alreadyPlayedBeat => {
            toggleItemClassAtTempo(alreadyPlayedBeat, lastPlayedTempo, false);
        });
    }
}