const express = require('express');
const app = express();
const connection = require('./conf');
const multer = require('multer');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'public');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage }).single('file');

// app.post('/mixturetexture/upload', (req, res) => {
//   upload(req, res, err => {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     }
//     if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

app.post('/mixturetexture/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  });
});

app.use('/mixturetexture/public', express.static('public'));



app.get(`/mixturetexture/textures`, (req, res) => {
  connection.query('SELECT * FROM texture', (err, results) => {
    if (err) {
      res.status(500).send('Erreur');
      console.log(res);
    } else {
      res.json(results);
    }
  })
});

app.get(`/mixturetexture/ingredients`, (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query('SELECT * FROM ingredient', (err, results) => {
    if (err) {
      res.status(500).send('Erreur');
      // console.log(res);
    } else {
      // si tt s'est bien passé, on envoi le resultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  })
});

const port = 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));
app.listen(port, err => {
  console.log('listening on port 5000');
  if (err) {
    throw new Error('Something bad happened...');
  }
});