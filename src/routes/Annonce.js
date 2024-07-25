const express = require("express");
const annonceController = require("../controllers/AnnonceController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/annonces", annonceController.getAllAnnonces);
router.get("/annoncesByToken", authMiddleware, annonceController.getAllAnnoncesByToken);
router.post("/annonces", annonceController.createAnnonce);
router.delete("/annonces/:id", authMiddleware, annonceController.deleteAnnonce);

module.exports = router;