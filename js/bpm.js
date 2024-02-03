function parseBpmToMilliseconds(bpm) {
    return Math.floor((defaultTime / bpm) * defaultBpm);
}