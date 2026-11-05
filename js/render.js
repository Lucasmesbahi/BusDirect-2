let currentPage = 1;
let tripsPerPage = 6;

export function renderTrips(trips) {
    let startIndex = (currentPage - 1) * tripsPerPage;
    let endIndex = startIndex + tripsPerPage;
    let currentTrips = trips.slice(startIndex, endIndex);

    let container = document.getElementById("tripsContainer");
    let pagination = document.getElementById("pagination");

    container.innerHTML = "";
    pagination.innerHTML = "";

    currentTrips.forEach((trip) => {
        container.innerHTML += `
            <div class="bg-white p-5 rounded-xl shadow border border-slate-200">
                <h2 class="text-lg font-bold text-slate-800">
                    ${trip.departure} → ${trip.destination}
                </h2>
                <p class="text-sm text-slate-500 mt-2">
                    ${trip.departureTime} - ${trip.arrivalTime}
                </p>
                <p class="text-orange-500 font-bold mt-3">
                    ${trip.price} DH
                </p>
                <a href="./cabine.html?id=${trip.id}" class="block text-center bg-blue-900 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-800"> Voir la Cabine </a>
            </div>
        `;
    });

    let totalPages = Math.ceil(trips.length / tripsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button 
                class="px-4 py-2 rounded-lg border ${currentPage === i ? 'bg-blue-900 text-white' : 'bg-white text-slate-700'}"
                data-page="${i}">
                ${i}
            </button>
        `;
    }

    pagination.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            currentPage = Number(button.dataset.page);
            renderTrips(trips);
        });
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