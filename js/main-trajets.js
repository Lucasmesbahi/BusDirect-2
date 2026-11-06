import { loadTrips } from "./store.js";
import { renderTrips, filterTrips } from "./render.js";

function renderStats(trips) {
    let nombrePassagers = 0;
    let recetteTotale = 0;

    trips.forEach((trip) => {
        trip.reservations.forEach((reservation) => {
            nombrePassagers++;

            if (reservation.seat <= 4) {
                recetteTotale += Math.round(trip.price * 1.1);
            } else {
                recetteTotale += trip.price;
            }
        });
    });

    document.getElementById("nombre-trajets").textContent = trips.length;
    document.getElementById("nombre-passagers").textContent = nombrePassagers;
    document.getElementById("recette-totale").textContent = recetteTotale.toLocaleString("fr-FR") + " DH";
}

async function init() {
    let trips = await loadTrips();
    renderStats(trips)

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