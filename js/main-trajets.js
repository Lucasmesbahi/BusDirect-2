import { loadTrips } from "./store.js";
import { renderTrips, filterTrips } from "./render.js";

async function init() {
    let trips = await loadTrips();

    let ville = document.getElementById("ville");
    let filtrer = document.getElementById("filtrer");

    function updateTrips() {
        let search = ville.value.toLowerCase().trim();
     let status = filtrer.value;
        let filteredTrips = filterTrips(trips, search, status);
        renderTrips(filteredTrips);
    }
    ville.addEventListener("input", updateTrips);
    filtrer.addEventListener("change", updateTrips);

    updateTrips();
}
init();