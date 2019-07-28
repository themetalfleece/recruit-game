export const sleep = (duration: {
    milliseconds?: number;
    seconds?: number;
    minutes?: number;
    hours?: number;
}) => new Promise((resolve) => {
    const totalMs = (duration.milliseconds || 0)
        + (duration.seconds || 0) * 1000
        + (duration.minutes || 0) * 1000 * 60
        + (duration.hours || 0) * 1000 * 60 * 60;
    setTimeout(() => resolve(), totalMs);
});

export const randomArrayElement = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export const removeItemFromArray = <T>(arr: T[], element: T) => {
    const index = arr.indexOf(element);
    if (index !== -1) {
        arr.splice(index, 1);
        return true;
    } else {
        return false;
    }
};