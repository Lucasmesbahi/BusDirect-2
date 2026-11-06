import {loadTrips, saveTrips } from "./store.js"
import { validereserve } from "./validators.js";
import { renderSeats, renderAvailableSeats } from "./render.js";
import { renderwaitinglist } from "./reservations.js";
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
    renderAvailableSeats(trip);
    renderwaitinglist(trip);
let btnAttente = document.getElementById("btn-ajouter-attente");

btnAttente.addEventListener("click", () =>{
    let name = document.getElementById("attente-nom").value.trim();
    let phone = document.getElementById("attente-telephone").value;

if (name === "") {
    document.getElementById("attente-nom-error").textContent = "Le nom est obligatoire";
    return;
}

    if (!/^0[67]\d{8}$/.test(phone)) {
        document.getElementById("attente-tel-error").textContent = "Numéro invalide";
        return;
    }
    if (
        trip.waitingLIst.some((passenger) => passenger.phone === phone) || trip.reservations.some((reservation) => reservation.phone === phone)
    ) {
        document.getElementById("attente-tel-error").textContent = "Ce numero existe deja"
        return;
    }
    trip.waitingList.push({
        name: name,
        phone: phone
    })
    saveTrips(trips);
    renderwaitinglist(trip);

    document.getElementById("attente-nom").value = "";
    document.getElementById("attente-telephone").value = "";

    document.getElementById("attente-notification").textContent = "Ajouté à la liste d'attente"
})

    let total = 0;
    trip.reservations.forEach((reservation) => {
        if (reservation.seat <= 4 ){
            total += Math.round(trip.price * 1.1);
        }
        else {
            total += trip.price;
        }
    });

    document.getElementById("chiffreaffaire").textContent = total
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
        renderAvailableSeats(trip);
        let total = 0;
            trip.reservations.forEach((reservation) => {
        if (reservation.seat <= 4 ){
            total += Math.round(trip.price * 1.1);
        }
        else {
            total += trip.price;
        }
    });

    document.getElementById("chiffreaffaire").textContent = total

        form.reset();
        document.getElementById("places-disponibles").textContent = trip.capacity - trip.reservations.length;
        let notification = document.getElementById("ajout")
        notification.textContent = "Réservation confirmée"

        setTimeout(() => {
            notification.textContent= ""
        }, 3000);
        } )    
}
    init();
