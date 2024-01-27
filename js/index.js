var bpm = 60;
var bpmInMilliseconds = 1000;

var intervalId = 1;
var isPlaying = false;



var tempo = 1;
var tempoMark = 1;

const initialBeat = "beat-1.1";

var lastBeat = initialBeat;

function printTempo() {
    if (lastBeat) {
        document.getElementById(lastBeat).className = "deactivated";
    }

    lastBeat = `beat-${tempo}.${tempoMark}`;
    document.getElementById(lastBeat).className = "activated";

    tempoMark++;
    if (tempoMark > 4) {
        //tempo++;
        tempoMark = 1;
    }
    if (tempo > 4) {
        tempo = 1;
    }

    return false;
}


function play() {
    if (isPlaying) return;
    isPlaying = true;
    console.info("Lets Rick n Roll!");

    intervalId = setInterval(printTempo, bpmInMilliseconds);
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