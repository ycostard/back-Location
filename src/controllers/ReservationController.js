const reservationModel = require("../models/Reservation");
const annonceModel = require("../models/Annonce");
const MailService = require("../services/mail");

const ReservationController = {
    async getAllReservationByToken(req, res) {
      try {
  
        const reservations = await reservationModel.findAllByUtilisateurId(parseInt(req.user.id));
  
        return res.status(200).json({ reservations });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message:
            "Une erreur est survenue lors de la récupération de la réservation.",
        });
      }
    },
  
  
    async createReservation(req, res) {
        try {
          const { id_annonce  } = req.body;
    
          if (!id_annonce )
            return res.status(400).json({ message: "Veuillez fournir toutes les informations nécessaires." });

          const annonce = await annonceModel.findById(id_annonce);

          if (!annonce)
            return res.status(404).json({ message: "Annonce non trouvé." });
          
          const newReservation = await reservationModel.create(reservationData = { id_utilisateur: parseInt(req.user.id), id_annonce: parseInt(id_annonce) });

          MailService.sendReservationRequest(annonce.vehicule.utilisateur.mail, `${annonce.vehicule.marque} ${annonce.vehicule.modele} ${annonce.vehicule.couleur}`, annonce.date_debut);
          MailService.sendReservationConfirmation(req.user.email, `${annonce.vehicule.marque} ${annonce.vehicule.modele} ${annonce.vehicule.couleur}`, annonce.date_debut);

          return res
            .status(201)
            .json({ message: "Reservation enregistré avec succès." });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            message:
              "Une erreur est survenue lors de l'enregistrement de la reéseravtion.",
          });
        }
      },
      
  
    async deleteReservation(req, res) {
      try {
  
        const { id } = req.params;
        
        if (!isValidVehiculeId(id)) {
          return res.status(400).json({
            message: "L'identifiant de la réservation n'est pas valide.",
          });
        }
    
        // Supprime le véhicule
        const deletedReservation = await reservationModel.findById(parseInt(id));
    
        if (!deletedReservation) {
          return res.status(404).json({
            message: "Le véhicule n'existe pas.",
          });
        }
  
        if (deletedReservation.utilisateur_id != req.user.id){
          return res.status(404).json({
            message: "Vous n'êtes pas autorisé",
          });
        }
  
        await reservationModel.deleteById(parseInt(id));
    
        return res.status(200).json({ message: "Reservation supprimé avec succès." });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Une erreur est survenue lors de la suppression du Reservation.",
        });
      }
    }
  
  };
  
  function isValidReservationId(reservationId) {
    // Vérifie si l'identifiant de l'utilisateur est valide
    // Exemple de validation : Vérifier si l'identifiant est un entier positif
    return Number.isInteger(parseInt(reservationId)) && parseInt(reservationId) > 0;
  }
  module.exports = ReservationController;