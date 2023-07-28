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

const version = "V0.5 Beta"

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
    frescoleche: String,
    apodo: String,
    sobo: String,
    glowup: String,
    racista: String,
    pareja:String,
    divertido: String,
    aesthetic: String,
    profesor: String,
    fiestero: String,
    inteligente: String,
    momentoaño: String,
    ausente: String,
    grupito: String,
    atletico: String,
    pipi: String,
    empayazado: String,
    ship: String,
    fiel: String,
    infiel: String,
    lagarto: String,
    toxico: String,
    chismoso: String,
    asaltasilos: String,
    desvelado: String,
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
  const { frescoleche, apodo, sobo, glowup, racista, pareja, divertido, aesthetic, profesor, fiestero, inteligente, momentoaño, ausente, grupito, atletico, pipi, empayazado, ship, fiel, infiel, lagarto, toxico, chismoso, asaltasilos, desvelado, nickname } = req.body;

  Form.findOne({ nickname })
    .then((existingForm) => {
      if (existingForm) {
        // Actualizar solo los campos que se enviaron en la solicitud
        if (frescoleche) {
          existingForm.frescoleche = frescoleche;
        }
        
        if (apodo) {
          existingForm.apodo = apodo;
        }
        
        if (sobo) {
          existingForm.sobo = sobo;
        }
        
        if (glowup) {
          existingForm.glowup = glowup;
        }
        
        if (racista) {
          existingForm.racista = racista;
        }
        
        if (pareja) {
          existingForm.pareja = pareja;
        }
        
        if (divertido) {
          existingForm.divertido = divertido;
        }
        
        if (aesthetic) {
          existingForm.aesthetic = aesthetic;
        }
        
        if (profesor) {
          existingForm.profesor = profesor;
        }
        
        if (fiestero) {
          existingForm.fiestero = fiestero;
        }
        
        if (inteligente) {
          existingForm.inteligente = inteligente;
        }
        
        if (momentoaño) {
          existingForm.momentoaño = momentoaño;
        }
        
        if (ausente) {
          existingForm.ausente = ausente;
        }
        
        if (grupito) {
          existingForm.grupito = grupito;
        }
        
        if (atletico) {
          existingForm.atletico = atletico;
        }
        
        if (pipi) {
          existingForm.pipi = pipi;
        }
        
        if (empayazado) {
          existingForm.empayazado = empayazado;
        }
        
        if (ship) {
          existingForm.ship = ship;
        }
        
        if (fiel) {
          existingForm.fiel = fiel;
        }
        
        if (infiel) {
          existingForm.infiel = infiel;
        }
        
        if (lagarto) {
          existingForm.lagarto = lagarto;
        }
        
        if (toxico) {
          existingForm.toxico = toxico;
        }
        
        if (chismoso) {
          existingForm.chismoso = chismoso;
        }
        
        if (asaltasilos) {
          existingForm.asaltasilos = asaltasilos;
        }
        
        if (desvelado) {
          existingForm.desvelado = desvelado;
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
        const newForm = new Form({ frescoleche, apodo, sobo, glowup, racista, pareja, divertido, aesthetic, profesor, fiestero, inteligente, momentoaño, ausente, grupito, atletico, pipi, empayazado, ship, fiel, infiel, lagarto, toxico, chismoso, asaltasilos, desvelado, nickname});

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

