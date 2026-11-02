import { loadTrips } from "./store.js";
async function init(){
    await loadTrips();
}

init();