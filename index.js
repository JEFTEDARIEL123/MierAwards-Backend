// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const ADDR = process.env.ADDRESS;
const Mongodb = process.env.MONGODB
const cors = require('cors');
const colors = require('colors');

app.use(bodyParser.json());
app.use(cors());

const version = "0.1 Beta"

mongoose.connect(Mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('[ MaWardsBackend ] '.yellow + 'Conexion con Mongodb realizada');
});

const formSchema = new mongoose.Schema(
  {
    option: String,
    cat1: String,
    cat2: String,
    nickname: String,
  },
  { strict: false }
);

const Form = mongoose.model('Form', formSchema);

app.get('/api/form/:userNickname', (req, res) => {
  const { userNickname } = req.params;

  Form.findOne({ nickname: userNickname })
    .then((userResponse) => {
      if (userResponse) {
        res.status(200).json(userResponse);
      } else {
        res.status(200).json({ answers: {} });
      }
    })
    .catch((error) => {
      console.error('Error al obtener la respuesta del usuario:', error);
      res.status(500).json({ error: 'Error al obtener la respuesta del usuario' });
    });
});

app.post('/api/form', (req, res) => {
  const { cat1, cat2, nickname } = req.body;

  Form.findOne({ nickname })
    .then((existingForm) => {
      if (existingForm) {
        // Actualizar solo los campos que se enviaron en la solicitud
        if (cat1) {
          existingForm.cat1 = cat1;
        }
        if (cat2) {
          existingForm.cat2 = cat2;
        }
        existingForm.nickname = nickname;
        existingForm.save()
          .then((updatedForm) => {
            console.log('Formulario actualizado correctamente', updatedForm);
            res.status(200).json({ message: 'Formulario actualizado correctamente' });
          })
          .catch((error) => {
            console.error('Error al actualizar el formulario:', error);
            res.status(500).json({ error: 'Error al actualizar el formulario' });
          });
      } else {
        const newForm = new Form({ cat1, cat2, nickname });

        newForm.save()
          .then((savedForm) => {
            console.log('Formulario guardado correctamente', savedForm);
            res.status(200).json({ message: 'Formulario guardado correctamente' });
          })
          .catch((error) => {
            console.error('Error al guardar el formulario:', error);
            res.status(500).json({ error: 'Error al guardar el formulario' });
          });
      }
    })
    .catch((error) => {
      console.error('Error al buscar el formulario:', error);
      res.status(500).json({ error: 'Error al buscar el formulario' });
    });
});

var server = app.listen(PORT, ADDR,  function () {
  const appPort = server.address().port
  const appAddr = server.address().address
  console.log('=========================================')
  console.log(`Backend escuchando en:`.green);
  console.log(`${appAddr}@${appPort}`.yellow);
  console.log(`Version: ${version}`.yellow)
  console.log('Github: https://github.com/JEFTEDARIEL123'.green)
  console.log('=========================================')
  console.log(' ')
});
