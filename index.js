// src/index.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');

// Importation des routes
const authRoutes = require('./src/routes/Auth');
const userRoutes = require('./src/routes/User');
const vehiculeRoutes = require('./src/routes/Vehicule')
const annonceRoutes = require('./src/routes/Annonce')
const imageRoutes = require('./src/routes/Image')

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', vehiculeRoutes);
app.use('/api', annonceRoutes);
app.use('/api', imageRoutes);

app.listen(process.env.PORT, () => {
  console.log('Serveur démarré sur le port', process.env.PORT);
});