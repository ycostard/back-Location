const nodemailer = require("nodemailer");

// Créer un objet transporter avec les informations de connexion SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });
};

// Fonction utilitaire pour envoyer un email
const sendMail = async (mailOptions) => {
  let transporter = createTransporter();

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès : " + info.response);
  } catch (error) {
    console.log("Erreur lors de l'envoi de l'email : " + error);
  }
};

const MailService = {

  async sendReservationConfirmation(emailUser, reservationVoiture, reservationDate) {
    let mailOptions = {
      from: process.env.EMAIL,
      to: emailUser,
      subject: `Locavoiture - Confirmation de réservation`,
      text: `Bonjour,\n\n` +
            `Votre demande de réservation pour la voiture ${reservationVoiture}, le ${reservationDate} a été reçue et est en cours de traitement.\n\n` +
            `Merci d'avoir choisi Locavoiture !\n\n` +
            `Cordialement,\n\n` +
            `L'équipe Locavoiture`,
    };

    await sendMail(mailOptions);
  },

  async sendReservationRequest(emailUser, reservationVoiture, reservationDate) {
    let mailOptions = {
      from: process.env.EMAIL,
      to: emailUser,
      subject: `Locavoiture - Nouvelle demande de réservation`,
      text: `Bonjour,\n\n` +
            `Vous avez reçu une nouvelle demande de réservation pour la voiture ${reservationVoiture}, le ${reservationDate}.\n\n` +
            `Merci de consulter la demande et de répondre en conséquence.\n\n` +
            `Cordialement,\n\n` +
            `L'équipe Locavoiture`,
    };

    await sendMail(mailOptions);
  },

  async sendReservationDeclined(emailUser, reservationVoiture, reservationDate) {
    let mailOptions = {
      from: process.env.EMAIL,
      to: emailUser,
      subject: `Locavoiture - Demande de réservation refusée`,
      text: `Bonjour,\n\n` +
            `Nous regrettons de vous informer que votre demande de réservation pour la voiture ${reservationVoiture}, le ${reservationDate} a été déclinée.\n\n` +
            `Merci d'avoir choisi Locavoiture !\n\n` +
            `Cordialement,\n\n` +
            `L'équipe Locavoiture`,
    };

    await sendMail(mailOptions);
  },

  async sendReservationAccepted(emailUser, reservationVoiture, reservationDate) {
    let mailOptions = {
      from: process.env.EMAIL,
      to: emailUser,
      subject: `Locavoiture - Demande de réservation acceptée`,
      text: `Bonjour,\n\n` +
            `Nous avons le plaisir de vous informer que votre demande de réservation pour la voiture ${reservationVoiture}, le ${reservationDate} a été acceptée.\n\n` +
            `Merci d'avoir choisi Locavoiture !\n\n` +
            `Cordialement,\n\n` +
            `L'équipe Locavoiture`,
    };

    await sendMail(mailOptions);
  },

};

module.exports = MailService;