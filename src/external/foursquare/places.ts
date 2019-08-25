require('dotenv').config();

const ID = process.env.FOURSQUARE_ID;
const SEC = process.env.FOURSQUARE_SECRET;

function URI(opts: string, args=false): string {
    let link = '';
    const URL = 'https://api.foursquare.com/v2/venues';
    if(args) link = `${URL}/${opts}&v=20180323`;
    else link = `${URL}/${opts}?v=20180323`;
    return `${link}&client_id=${ID}&client_secret=${SEC}`;
};

export async function placesLatLong(lat: number, long: number): Promise<object> {
    const body = await fetch(URI(`search/?ll=${lat},${long}`, true));
    const json = await body.json();
    return json.response;
};

export async function placesNearby(near: string): Promise<object> {
    const formatted = near.replace(' ', '');
    const body = await fetch(URI(`search/?near=${formatted}`, true));
    const json = await body.json();
    return json.response;
};

export async function place(_id: string): Promise<object> {
    const body = await fetch(URI(`${_id}/`));
    const json = await body.json();
    return json.response;
};
