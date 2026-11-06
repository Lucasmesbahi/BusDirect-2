export function renderwaitinglist(trip) {
    let container = document.getElementById("attente-container");
    let count = document.getElementById("attente-count");
    count.textContent = trip.waitingList.length;
    container.innerHTML = "";
    trip.waitingList.forEach((passanger, index) => {
        let div = document.createElement("div");
        div.className="mb-2 rounded-lg bg-slate-50 p-3 text-sm";
            let name = document.createElement("p")
            name.textContent = `${index+1}. ${passanger.name}`;
            let phone = document.createElement("p");
            phone.className = "text-xs text-slate-500"
            phone.textContent = passanger.phone;

            div.append(name, phone);
            container.append(div);
    });
}