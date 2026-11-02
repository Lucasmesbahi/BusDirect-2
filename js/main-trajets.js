import { loadTrips } from "./store.js";
import { renderTrips } from "./render.js";
async function init(){
    let trips = await loadTrips();
    renderTrips(trips);
}

init();