import {loadTrips} from "./store.js"
async function init() {
    let params = new URLSearchParams(window.location.search);
    let tripId = params.get("id")

    let trips = loadTrips();
    let trip = trips.find(() => String(trip.id) === tripId)
    if (!trip) {
        return
    }
    document.getElementById("trip-route").textContent = `${trip.departure} => ${trip.destination}`
    document.getElementById("trip-departre").textContent = trip.departureTime;
    document.getElementById("trip-arrival").textContent = trip.arrivalTime
    document.getElementById("trip-price").textContent = trip.price;
    }
    init();