export function converterMinutes(totalMinutes: any) {
    let result: string;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
        if (minutes == 0) {
            result = hours + ' h'
        } else {
            result = hours + ' h ' + minutes + ' m'
        }
    } else {
        result = minutes + ' m'
    }

    return result;
}