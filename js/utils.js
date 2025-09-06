export function msToTimeFormat(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let sec = totalSeconds % 60;
    let min = Math.floor(totalSeconds / 60) % 60;
    let hour = Math.floor(totalSeconds / 3600);

    if (hour > 0) {
        return `${hour}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    } else if (min > 0) {
        return `${min}:${sec.toString().padStart(2, '0')}`;
    } else {
        return `${sec}`;
    }
}
