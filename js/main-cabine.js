import {loadTrips, saveTrips } from "./store.js"
import { validereserve } from "./validators.js";
import { renderSeats } from "./render.js";
async function init() {
    let params = new URLSearchParams(window.location.search);
    let tripId = params.get("id")

    let trips = await loadTrips();
    let trip = trips.find((trip) => String(trip.id) === tripId)
    if (!trip) {
        return
    }
    document.getElementById("trip-route").textContent = `${trip.departure} => ${trip.destination}`
    document.getElementById("trip-departre").textContent = trip.departureTime;
    document.getElementById("trip-arrival").textContent = trip.arrivalTime
    document.getElementById("trip-price").textContent = trip.price;
    let form = document.getElementById("reserveform");
    renderSeats(trip);
    document.getElementById("places-disponibles").textContent = trip.capacity - trip.reservations.length;
    form.addEventListener("submit" , (event) =>{
        event.preventDefault();
        let name = document.getElementById("reserver-nom").value;
        let phone = document.getElementById("reserver-telephone").value;

        let errors = validereserve(trip, name, phone);

        document.getElementById("nomerror").textContent = errors.nameError || "";
        document.getElementById("telerror").textContent = errors.phoneError || "";
        if (Object.keys(errors).length > 0) {
            return;
        }
        let SelectSiege = document.getElementById("reserver-siege");
        let seat = Number(SelectSiege.value);

        if (!seat) {
            for (let i = 5 ; i <= trip.capacity; i++) {
                let occupied = trip.reservations.some(
                    (reservation) =>reservation.seat === i
                )
                if (!occupied) {
                    seat = i; 
                    break;
                } 

            }
        }
        if (!seat) {
            return;
        }
        let nouvelle = {
            seat: seat,
            name: name.trim(),
            phone: phone
        }
        trip.reservations = [...trip.reservations, nouvelle]    
        saveTrips(trips);
        renderSeats(trip);
        document.getElementById("places-disponibles").textContent = trip.capacity - trip.reservations.length;
        let notification = document.getElementById("ajout")
        notification.textContent = "Réservation confirmée"

        setTimeout(() => {
            notification.textContent= ""
        }, 3000);
        } )    
}
    init();