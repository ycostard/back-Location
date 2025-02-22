const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const Reservation = {

    findById(id) {
      return prisma.reservation.findUnique({
        where: {
          id,
        },
      });
    },
  
    findAllByUtilisateurId(id) {
      return prisma.reservation.findMany({
        where: {
          utilisateur_id: id,
        },
      });
    },
  
    create(reservationData) {
      return prisma.reservation.create({
        data: reservationData,
      });
    },
  
    getAll() {
      return prisma.reservation.findMany();
    },
  
    deleteById(id) {
      return prisma.reservation.delete({
        where: {
          id,
        },
      });
    }
    
  };
  
  module.exports = Reservation;