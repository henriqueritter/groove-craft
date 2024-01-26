const defaultBpm = 60;
const defaultTime = 1000;

function parseBpmToMilliseconds(bpm) {
    return Math.floor((defaultTime / bpm) * defaultBpm);
}