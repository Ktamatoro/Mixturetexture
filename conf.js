const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // adresse du serveur
  user: 'admin', // le nom d'utilisateur
  password: 'admin', // le mot de passe
  database: 'mixturetexture' // le nom de la base de données
});

module.exports = connection;