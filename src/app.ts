import fetch from './fetch';

if (config.runsWithSiri) {
    const room = process.env.ROOM
    const domain = process.env.DOMAIN
    const api = process.env.API_ENDPOINT

    const response = fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                room,
                domain,
                transports: { bosh: 'https://' + domain + '/http-bind' }
            }
        )
    });

    response.then(response => {
        const participants = response.json().then(participants => {
            if (participants.length == 0) {
                const text = 'Al momento non c\'é nessuno';
                Script.setShortcutOutput(text);
            }
            else if (participants.length == 1) {
                const text = `Al momento c'é solo ${participants[0]}`;
                Script.setShortcutOutput(text);
            }
            else {
                const text = `Al momento ci sono ${participants.length} persone. ${participants.slice(0, participants.length - 1).join(', ')} e, ${participants[participants.length - 1]}`;
                Script.setShortcutOutput(text);
            }
        });
    }).catch(err => {
        const text = 'É avvenuto un errore nella richiesta';
        Script.setShortcutOutput(text);
        log(err);
    });
}