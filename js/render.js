let currentPage = 1;
let tripsPerPage = 6;

export function renderSeats(trip) {
    let seats = document.querySelectorAll(".seat");

    seats.forEach((seatElement) => {
        let seatNumber = Number(seatElement.dataset.seat);

        let reservation = trip.reservations.find(
            (reservation) => reservation.seat === seatNumber
        );

        let nameElement = seatElement.querySelector("p:last-child");

        if (reservation) {
            seatElement.classList.remove(
                "bg-[#DCFCE7]",
                "bg-[#f8ffc5]",
                "text-green-800",
                "text-yellow-600"
            );

            seatElement.classList.add(
                "bg-[#FEE2E2]",
                "text-red-700"
            );

            nameElement.textContent = reservation.name;
        } else {
            seatElement.classList.remove(
                "bg-[#FEE2E2]",
                "text-red-700"
            );

            seatElement.classList.add(
                "bg-[#DCFCE7]",
                "text-green-800"
            );

            nameElement.textContent = "Libre";
        }
    });
}
export function filterTrips(trips, search, status) {
    return trips.filter((trip) => {
        let matchSearch = trip.departure.toLowerCase().includes(search) || trip.destination.toLowerCase().includes(search);

        let matchStatus = true;

        if (status === "disponible") {
            matchStatus = trip.reservations.length < trip.capacity;
        }

        if (status === "complete") {
            matchStatus = trip.reservations.length >= trip.capacity;
        }

        return matchSearch && matchStatus;
    });
}

export function renderAvailableSeats(trip) {
    let select = document.getElementById("reserver-siege");
    
    select.innerHTML = `<option value="">Attribution automatique</option>`;

    for (let i=1; i<=trip.capacity; i++) {
        let occupied = trip.reservations.some(
            (reservation) => reservation.seat === i
        )
        if (!occupied) {
            let price = i <= 4 ? Math.round(trip.price * 1.1) : trip.price;

            select.innerHTML += `
            <option value="${i}">
                Siege ${String(i).padStart(2, "0")} - ${i <= 4 ? "VIP" : "Normal"} ${price} DH
                </option>
            `
        }
    }
}