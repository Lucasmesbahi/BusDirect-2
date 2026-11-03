let currentPage = 1;
let tripsPerPage = 6;

export function renderTrips(trips) {
    let startIndex = (currentPage - 1) * tripsPerPage;
    let endIndex = startIndex + tripsPerPage;
    let currentTrips = trips.slice(startIndex, endIndex);

    let container = document.getElementById("tripsContainer");
    container.innerHTML = "";
    currentTrips.forEach((trip) => {
        container.innerHTML += `
            <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h2 class="text-lg font-bold text-slate-800">
                    ${trip.departure} → ${trip.destination}
                </h2>
                <p class="text-sm text-slate-500 mt-2">
                    ${trip.departureTime} - ${trip.arrivalTime}
                </p>
                <p class="text-orange-500 font-bold mt-3">
                    ${trip.price} DH
                </p>
            </div>
        `;
    });
}