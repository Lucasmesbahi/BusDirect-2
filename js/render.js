let currentPage = 1;
let tripsPerPage = 6

export function renderTrips() {
    let startIndex = (currentPage - 1) * tripsPerPage;
    let endIndex = startIndex + tripsPerPage;
    let currentTrips = tripsPerPage.slice(startIndex, endIndex);

}