const { PrismaClient } = require("@prisma/client");
const { findById } = require("./Vehicule");
const prisma = new PrismaClient();

const Annonce = {
    count() {
        return prisma.annonce.count();
    },
    findAllByoffsetAndLimit(offset, limit, search) {
      const where = {};
    
      // Ajout des filtres pour le champ "search"
      if (search) {
        where.OR = [
          { rue: { contains: search } },
          { ville: { contains: search } },
          { pays: { contains: search } },
          { vehicule: {
            OR: [
              { marque: { contains: search }},
              { modele: { contains: search } },
              { couleur: { contains: search} },
              { carburant: { contains: search } }
            ]
          }}
        ];
      }
    
      return prisma.annonce.findMany({
        skip: parseInt(offset),
        take: parseInt(limit),
        where,
        orderBy: {
          date_creation: 'desc'
        },
        include: {
          vehicule: {
            include: {
              utilisateur: true
            }
          }
        }
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
              vehicule: {
                include: {
                  utilisateur: true
                }
              },
            }
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
            vehicule: {
              include: {
                utilisateur: true
              }
            },
            reservations: {
              include: {
                utilisateur: true
              }
            } 
          }
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

