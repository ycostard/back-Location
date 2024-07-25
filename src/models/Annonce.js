const { PrismaClient } = require("@prisma/client");
const { findById } = require("./Vehicule");
const prisma = new PrismaClient();

const Annonce = {
    count() {
        return prisma.annonce.count();
    },
    findAllByoffsetAndLimit(offset, limit) {
        return prisma.annonce.findMany({
          skip: parseInt(offset),
          take: parseInt(limit),
          orderBy: {
            date_creation: "desc",
          },
            include: {
                vehicule: true,
            },
        });
      },

    create(annonceData) {
        return prisma.annonce.create({
            data: annonceData,
        });
    },

    findById(id) {
        return prisma.annonce.findUnique({
            where: {
                id,
            },
            include: {
                vehicule: true,
            },
        });
    },

    findAllByUtilisateurId(id) {
        return prisma.annonce.findMany({
          where: {
            vehicule: {
              utilisateur_id: id,
            },
          },
          include: {
            vehicule: true,
          },
        });
    },

    deleteById(id) {
        return prisma.annonce.delete({
            where: {
                id,
            },
        });
    }
    
};

module.exports = Annonce;

