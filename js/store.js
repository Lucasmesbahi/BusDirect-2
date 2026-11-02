export let trips = [];

export async function loadTrips() {
let data = localStorage.getItem("trips");

if (data !== null) {
    trips = JSON.parse(data);
}
else {
    let reponse = await fetch("./data/trips.json")
    trips = await reponse.json();
    localStorage.setItem("trips", JSON.stringify(trips));
}
return trips;
}