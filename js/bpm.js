const defaultBpm = 60;
const defaultTime = 1000;

let bpm = 60;
let bpmInMilliseconds = 1000;

const minimumBpm = 1;
const maximuBpm = 400;

function parseBpmToMilliseconds(bpm) {
    return Math.floor((defaultTime / bpm) * defaultBpm);
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

window.onload = function() {
    try {
        const url_string = (window.location.href).toLowerCase();
        const url = new URL(url_string);
        const queryParamBpm = Number(url.searchParams.get("bpm"));
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