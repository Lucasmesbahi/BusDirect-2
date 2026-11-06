# BusDirect – Gestion des Réservations de Places

## Présentation

BusDirect est une application web permettant de gérer les trajets et les réservations de places dans un bus reliant Safi à Marrakech.

L'application permet de consulter les trajets, réserver une place, modifier ou supprimer une réservation et gérer une liste d'attente.

## Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6 Modules)
- LocalStorage
- Fetch API
- Git & GitHub

## Fonctionnalités

### Gestion des trajets
- Affichage des trajets disponibles.
- Recherche par ville de départ ou de destination.
- Filtrage selon la disponibilité.
- Pagination des trajets (6 trajets par page).

### Gestion des réservations
- Réservation d'une place.
- Attribution automatique de la première place libre hors VIP.
- Gestion des places VIP (01 à 04) avec un supplément de 10 %.
- Modification du nom et du siège d'une réservation.
- Suppression d'une réservation.
- Validation des informations du passager.

### Liste d'attente
- Ajout d'un passager à la liste d'attente.
- Vérification du nom et du numéro de téléphone.
- Prévention des doublons.

### Statistiques
- Affichage du nombre de places disponibles.
- Calcul du chiffre d'affaires.
- Mise à jour de l'état des sièges après chaque opération.

### Stockage des données
- Chargement initial des trajets depuis `data/trips.json`.
- Utilisation de LocalStorage pour conserver les modifications.

## Structure du projet

```text
BusDirect/
├── data/
│   └── trips.json
├── js/
│   ├── store.js
│   ├── validators.js
│   ├── render.js
│   ├── reservations.js
│   ├── main-trajets.js
│   └── main-cabine.js
├── index.html
├── cabine.html
└── README.md
```

## Auteur

Projet réalisé dans le cadre de la formation YouCode.