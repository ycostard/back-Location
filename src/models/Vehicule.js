const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Vehicule = {

  findById(id) {
    return prisma.vehicule.findUnique({
      where: {
        id,
      },
    });
  },

  findAllByUtilisateurId(id) {
    return prisma.vehicule.findMany({
      where: {
        utilisateur_id: id,
      },
    });
  },

  create(vehiculeData) {
    return prisma.vehicule.create({
      data: vehiculeData,
    });
  },

  getAll() {
    return prisma.vehicule.findMany();
  },

  deleteById(id) {
    return prisma.vehicule.delete({
      where: {
        id,
      },
    });
  }
  
};

module.exports = Vehicule;