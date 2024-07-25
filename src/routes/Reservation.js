const express = require("express");
const reservationController = require("../controllers/ReservationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/reservationByToken", authMiddleware, reservationController.getAllReservationByToken);
router.post("/reservations", reservationController.createReservation);
router.delete("/reservations/:id", authMiddleware, reservationController.deleteReservation);

module.exports = router;