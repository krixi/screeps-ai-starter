
export function logErr(err) {
    if (err instanceof Error) {
        console.log('<span style="color: #FF0000">', err.stack, '</span>');
    } else {
        console.log('<span style="color: #FF0000">', err, '</span>');
    }
}

export function logWarn(msg) {
    console.log('<span style="color: #ffb600">', msg, '</span>');
}