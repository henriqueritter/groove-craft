var bpm = 60;
var intervalId = 1;



function play() {
    intervalId = setInterval(printTempo, 150);
}

function stop() {
    clearInterval(intervalId);
}

function increaseBpm() {
    bpm = bpm + 1;
    return parseBpmToMilliseconds(bpm);
}

function decreaseBpm() {
    bpm = bpm - 1;
    return parseBpmToMilliseconds(bpm);
}