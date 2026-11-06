export let trips = [];
export function saveTrips(trips) {
    localStorage.setItem("trips", JSON.stringify(trips));
}
export async function loadTrips() {
    let data = localStorage.getItem("trips");

    if (data !== null) {
        trips = JSON.parse(data);
    } else {
        let reponse = await fetch("/data/trips.json");

        if (!reponse.ok) {
            throw new Error("Impossible de charger les trajets");
        }

        trips = await reponse.json();
        localStorage.setItem("trips", JSON.stringify(trips));
    }

    return trips;
}