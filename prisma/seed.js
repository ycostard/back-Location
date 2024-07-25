const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Ajouter des utilisateurs
    const users = [
        { nom: "Dupont", prenom: "Jean", mail: "jean.dupont@example.com", password: "password123", pays: "France", ville: "Paris", rue: "123 Rue de Paris", CP: 75001 },
        { nom: "Martin", prenom: "Claire", mail: "claire.martin@example.com", password: "password123", pays: "France", ville: "Lyon", rue: "456 Rue de Lyon", CP: 69001 },
        { nom: "Bernard", prenom: "Paul", mail: "paul.bernard@example.com", password: "password123", pays: "France", ville: "Marseille", rue: "789 Rue de Marseille", CP: 13001 },
        { nom: "Dubois", prenom: "Sophie", mail: "sophie.dubois@example.com", password: "password123", pays: "France", ville: "Toulouse", rue: "101 Rue de Toulouse", CP: 31000 },
        { nom: "Lefevre", prenom: "Pierre", mail: "pierre.lefevre@example.com", password: "password123", pays: "France", ville: "Nice", rue: "202 Rue de Nice", CP: 06000 },
        { nom: "Moreau", prenom: "Julie", mail: "julie.moreau@example.com", password: "password123", pays: "France", ville: "Nantes", rue: "303 Rue de Nantes", CP: 44000 },
        { nom: "Petit", prenom: "Luc", mail: "luc.petit@example.com", password: "password123", pays: "France", ville: "Strasbourg", rue: "404 Rue de Strasbourg", CP: 67000 }
    ];

    const createdUsers = [];
    for (const user of users) {
        const createdUser = await prisma.utilisateur.create({
            data: user
        });
        createdUsers.push(createdUser);
    }

    // Ajouter des véhicules pour certains utilisateurs
    const vehicles = [
        { utilisateur_id: createdUsers[0].id, marque: "Toyota", modele: "Corolla", couleur: "Bleu", kilometrage: 15000, carburant: "Essence", photo: "url/photo1.jpg" },
        { utilisateur_id: createdUsers[1].id, marque: "Renault", modele: "Clio", couleur: "Rouge", kilometrage: 10000, carburant: "Diesel", photo: "url/photo2.jpg" },
        { utilisateur_id: createdUsers[2].id, marque: "Peugeot", modele: "308", couleur: "Noir", kilometrage: 20000, carburant: "Essence", photo: "url/photo3.jpg" },
        { utilisateur_id: createdUsers[3].id, marque: "Citroen", modele: "C3", couleur: "Blanc", kilometrage: 25000, carburant: "Diesel", photo: "url/photo4.jpg" },
        { utilisateur_id: createdUsers[4].id, marque: "Ford", modele: "Fiesta", couleur: "Vert", kilometrage: 30000, carburant: "Essence", photo: "url/photo5.jpg" },
        { utilisateur_id: createdUsers[5].id, marque: "BMW", modele: "X1", couleur: "Gris", kilometrage: 35000, carburant: "Diesel", photo: "url/photo6.jpg" },
        { utilisateur_id: createdUsers[6].id, marque: "Audi", modele: "A3", couleur: "Bleu", kilometrage: 40000, carburant: "Essence", photo: "url/photo7.jpg" }
    ];

    const createdVehicles = [];
    for (const vehicle of vehicles) {
        const createdVehicle = await prisma.vehicule.create({
            data: vehicle
        });
        createdVehicles.push(createdVehicle);
    }

    // Ajouter des annonces pour les véhicules
    const annonces = [
        { id_vehicule: createdVehicles[0].id, pays: "France", ville: "Paris", rue: "123 Rue de Paris", CP: 75001, date_debut: new Date('2023-08-01'), date_fin: new Date('2023-08-31'), prix: 50.0 },
        { id_vehicule: createdVehicles[1].id, pays: "France", ville: "Lyon", rue: "456 Rue de Lyon", CP: 69001, date_debut: new Date('2023-09-01'), date_fin: new Date('2023-09-30'), prix: 40.0 },
        { id_vehicule: createdVehicles[2].id, pays: "France", ville: "Marseille", rue: "789 Rue de Marseille", CP: 13001, date_debut: new Date('2023-10-01'), date_fin: new Date('2023-10-31'), prix: 60.0 },
        { id_vehicule: createdVehicles[3].id, pays: "France", ville: "Toulouse", rue: "101 Rue de Toulouse", CP: 31000, date_debut: new Date('2023-11-01'), date_fin: new Date('2023-11-30'), prix: 55.0 },
        { id_vehicule: createdVehicles[4].id, pays: "France", ville: "Nice", rue: "202 Rue de Nice", CP: 06000, date_debut: new Date('2023-12-01'), date_fin: new Date('2023-12-31'), prix: 45.0 },
        { id_vehicule: createdVehicles[5].id, pays: "France", ville: "Nantes", rue: "303 Rue de Nantes", CP: 44000, date_debut: new Date('2024-01-01'), date_fin: new Date('2024-01-31'), prix: 70.0 },
        { id_vehicule: createdVehicles[6].id, pays: "France", ville: "Strasbourg", rue: "404 Rue de Strasbourg", CP: 67000, date_debut: new Date('2024-02-01'), date_fin: new Date('2024-02-28'), prix: 65.0 },
        { id_vehicule: createdVehicles[0].id, pays: "France", ville: "Paris", rue: "123 Rue de Paris", CP: 75001, date_debut: new Date('2024-03-01'), date_fin: new Date('2024-03-31'), prix: 50.0 },
        { id_vehicule: createdVehicles[1].id, pays: "France", ville: "Lyon", rue: "456 Rue de Lyon", CP: 69001, date_debut: new Date('2024-04-01'), date_fin: new Date('2024-04-30'), prix: 40.0 },
        { id_vehicule: createdVehicles[2].id, pays: "France", ville: "Marseille", rue: "789 Rue de Marseille", CP: 13001, date_debut: new Date('2024-05-01'), date_fin: new Date('2024-05-31'), prix: 60.0 },
        { id_vehicule: createdVehicles[3].id, pays: "France", ville: "Toulouse", rue: "101 Rue de Toulouse", CP: 31000, date_debut: new Date('2024-06-01'), date_fin: new Date('2024-06-30'), prix: 55.0 },
        { id_vehicule: createdVehicles[4].id, pays: "France", ville: "Nice", rue: "202 Rue de Nice", CP: 06000, date_debut: new Date('2024-07-01'), date_fin: new Date('2024-07-31'), prix: 45.0 },
        { id_vehicule: createdVehicles[5].id, pays: "France", ville: "Nantes", rue: "303 Rue de Nantes", CP: 44000, date_debut: new Date('2024-08-01'), date_fin: new Date('2024-08-31'), prix: 70.0 },
        { id_vehicule: createdVehicles[6].id, pays: "France", ville: "Strasbourg", rue: "404 Rue de Strasbourg", CP: 67000, date_debut: new Date('2024-09-01'), date_fin: new Date('2024-09-30'), prix: 65.0 }
    ];

    for (const annonce of annonces) {
        await prisma.annonce.create({
            data: annonce
        });
    }

    console.log("Base de données peuplée avec succès!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
