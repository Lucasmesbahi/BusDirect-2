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

export function renderTrips(trips, page = 1) {
    let container = document.getElementById("tripsContainer");
    let pagination = document.getElementById("pagination");

    let totalPages = Math.ceil(trips.length / tripsPerPage);

    currentPage = page;

    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }

    let start = (currentPage - 1) * tripsPerPage;
    let displayedTrips = trips.slice(start, start + tripsPerPage);

    container.innerHTML = "";

    displayedTrips.forEach((trip) => {
        container.innerHTML += `
            <div class="bg-white p-5 rounded-lg border border-slate-200">
                <h3 class="font-bold text-[#0B2545]">
                    ${trip.departure} → ${trip.destination}
                </h3>

                <p class="text-sm text-slate-500 mt-2">
                    ${trip.date} - ${trip.time}
                </p>

                <p class="mt-2">
                    ${trip.reservations.length} / ${trip.capacity} places réservées
                </p>

                <p class="font-semibold mt-2">
                    ${trip.price} DH
                </p>

                <a href="./cabine.html?id=${trip.id}"
                   class="block text-center bg-[#0B2545] text-white rounded-md py-2 mt-4">
                    Gérer les réservations
                </a>
            </div>
        `;
    });

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button
                data-page="${i}"
                class="px-4 py-2 rounded-md ${
                    i === currentPage
                    ? "bg-[#0B2545] text-white"
                    : "bg-white text-[#0B2545] border"
                }">
                ${i}
            </button>
        `;
    }

    pagination.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            renderTrips(trips, Number(button.dataset.page));
        });
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