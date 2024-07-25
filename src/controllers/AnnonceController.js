const annonceModel = require("../models/Annonce");
const { create } = require("../models/Vehicule");

const AnnonceController = {
    async getAllAnnonces(req, res) {
        try {
          let { offset, limit } = req.query;
    
          if (!offset || !limit) {
            offset = 0;
            limit = 6;
          }
    
          let totalCount = await annonceModel.count();
          const annonces = await annonceModel.findAllByoffsetAndLimit(
            offset,
            limit,
          );
    
          const output = {
            count: totalCount,
            next: null,
            previous: null,
            results: annonces,
          };
    
          if (parseInt(offset) + parseInt(limit) < totalCount) {
            // Vérifie s'il y a une page suivante
            const nextOffset = parseInt(offset) + parseInt(limit);
              output.next = `http://localhost:3001/api/annonces?limit=${limit}&offset=${nextOffset}`;
            }
    
          if (parseInt(offset) > 0) {
            // Vérifie s'il y a une page précédente
            const previousOffset = parseInt(offset) - parseInt(limit);
              output.previous = `http://localhost:3001/api/annonces?limit=${limit}&offset=${previousOffset}`;
            }
    
          return res.status(200).json(output);
        } catch (error) {
          console.log(error);
          return res
            .status(500)
            .json({
              message:
                "Une erreur est survenue lors de la récupération des annonces.",
            });
        }
      },
      
      async createAnnonce(req, res) {
        try {
            const { id_vehicule, pays, ville, rue, cp, date_debut, date_fin, prix } = req.body;
    
            // Validation des entrées
            if (!id_vehicule || !pays || !ville || !rue || !cp || !date_debut || !date_fin || !prix)
                return res.status(400).json({ message: "Veuillez fournir toutes les informations nécessaires." });
    
            // Convertir les types de données
            const idVehiculeInt = parseInt(id_vehicule, 10);
            const cpInt = parseInt(cp, 10);
            const dateDebutDate = new Date(date_debut);
            const dateFinDate = new Date(date_fin);
            const prixFloat = parseFloat(prix);
    
            // Créer l'annonce
            const newAnnonce = await annonceModel.create(annonceData = {
                id_vehicule: idVehiculeInt,
                pays,
                ville,
                rue,
                CP: cpInt,
                date_debut: dateDebutDate,
                date_fin: dateFinDate,
                prix: prixFloat
            });
    
            return res.status(201).json({ message: "Annonce enregistrée avec succès." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Une erreur est survenue lors de l'enregistrement de l'annonce.",
            });
        }
    },    

    async getAllAnnoncesByToken(req, res) {
        try {
    
          const annonces = await annonceModel.findAllByUtilisateurId(parseInt(req.user.id));
    
          return res.status(200).json({ annonces });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            message:
              "Une erreur est survenue lors de la récupération du vehicule.",
          });
        }
      },

      async deleteAnnonce(req, res) {

        try {
            const { id } = req.params;
    
            if (!isValidAnnonceId(id)) {
                return res.status(400).json({ message: "L'identifiant de l'annonce n'est pas valide." });
            }
    
            // Supprime l'annonce
            const deletedAnnonce = await annonceModel.findById(parseInt(id
            ));

            if (!deletedAnnonce) {
                return res.status(404).json({ message: "L'annonce n'existe pas." });
            }

            if (deletedAnnonce.vehicule.utilisateur_id != req.user.id) {
                return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette annonce." });
            }

            await annonceModel.deleteById(parseInt(id));

            return res.status(200).json({ message: "Annonce supprimée avec succès." });

        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'annonce." });
        }
    }
};

function isValidAnnonceId(annonceId) {
  // Vérifie si l'identifiant de l'utilisateur est valide
  // Exemple de validation : Vérifier si l'identifiant est un entier positif
  return Number.isInteger(parseInt(annonceId)) && parseInt(annonceId) > 0;
}
module.exports = AnnonceController;
