export function err(err) {
    if (err instanceof Error) {
        console.log(color('#FF0000', err.stack));
    } else {
        console.log(color('#FF0000', err));
    }
}

export function info(msg, colorVal = '#ffffff') {
    console.log(color(colorVal, msg));
}

export function warn(msg) {
    console.log(color('#FFB600', msg));
}

const color = (color, msg) => `<span style="color: ${color}">, ${msg}, </span>`;
