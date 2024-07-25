const ImageController = {
    async getImageByName(req, res) {
      try {
        const filename = req.params.filename;
        return res.sendFile(process.cwd() + "/src/img/" + filename);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Une erreur est survenue lors de la récupération de l'image.",
        });
      }
    },
  };
  
module.exports = ImageController;
  