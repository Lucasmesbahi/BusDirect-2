export function validereserve(trip,name,phone) {
    if (name.trim()=== "") {
        return {
            nameError: "Le nom de passager est obligé "
        }
    }

if (trip.reservations.some((reservation)=> reservation.name === name )) {
    return {
        nameError: "CE nom est déja utilisé sur ce trajet."
    }
}

if (!/^0[67]\d{8}$/.test(phone)) {
    return {
        phoneError: "Le numéro doit contenir 10 chiffres commencant par 06 ou 07."
    }
}

let phoneExists = trip.reservations.some((reservation) => reservation.phone === phone) ||
    trip.waitingList.some((passenger) => passenger.phone === phone);
    
if (phoneExists) {
    return {
        phoneError: "Ce numéro est déja utilse sur ce trajet"
    }
}
return {}
}