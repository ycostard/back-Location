const vehiculeModel = require("../models/Vehicule");
const multer = require("multer");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Spécifiez le dossier de destination où l'image sera enregistrée
    cb(null, process.cwd()+"/src/img/");
  },
  filename: function (req, file, cb) {
    // Ajoutez le suffixe unique au nom d'origine du fichier
    cb(null, `${uuid.v4().split('-')[0]}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const VehiculeController = {
  async getAllVehiculesByToken(req, res) {
    try {

      const vehicule = await vehiculeModel.findAllByUtilisateurId(parseInt(req.user.id));

      return res.status(200).json({ vehicule });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la récupération du vehicule.",
      });
    }
  },


  async createVehicule(req, res) {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Une erreur est survenue lors de l'upload de l'image.",
        });
      }
      try {
        const { marque, modele, couleur, kilometrage, carburant } = req.body;
        const photo = req.file;
  
        if (!marque || !modele || !couleur || !kilometrage || !carburant || !photo )
          return res.status(400).json({ message: "Veuillez fournir toutes les informations nécessaires." });
  
        const newVehicule = await vehiculeModel.create(vehiculeData = { utilisateur_id: req.user.id, marque, modele, couleur, kilometrage: parseInt(kilometrage), carburant, photo: photo.filename });
  
        return res
          .status(201)
          .json({ message: "Vehicule enregistré avec succès.", photo: photo.filename });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message:
            "Une erreur est survenue lors de l'enregistrement du vehicule.",
        });
      }
    },
    );
  },
    

  async deleteVehicule(req, res) {
    try {

      const { id } = req.params;
      
      if (!isValidVehiculeId(id)) {
        return res.status(400).json({
          message: "L'identifiant du vehicule n'est pas valide.",
        });
      }
  
      // Supprime le véhicule
      const deletedVehicule = await vehiculeModel.findById(parseInt(id));
  
      if (!deletedVehicule) {
        return res.status(404).json({
          message: "Le véhicule n'existe pas.",
        });
      }

      if (deletedVehicule.utilisateur_id != req.user.id){
        return res.status(404).json({
          message: "Vous n'êtes pas autorisé",
        });
      }

      await vehiculeModel.deleteById(parseInt(id));
  
      return res.status(200).json({ message: "Véhicule supprimé avec succès." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Une erreur est survenue lors de la suppression du véhicule.",
      });
    }
  }

};

function isValidVehiculeId(vehiculeId) {
  // Vérifie si l'identifiant de l'utilisateur est valide
  // Exemple de validation : Vérifier si l'identifiant est un entier positif
  return Number.isInteger(parseInt(vehiculeId)) && parseInt(vehiculeId) > 0;
}
module.exports = VehiculeController;
