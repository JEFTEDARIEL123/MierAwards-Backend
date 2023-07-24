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
// Configura bodyParser para procesar datos en formato JSON
app.use(bodyParser.json(), cors());
const version = "0.1 Beta"
// Establece la conexión a la base de datos de MongoDB
mongoose.connect(Mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('[ MaWardsBackend ] '.yellow +'Conexion con Mongodb realizada');
});

// Definir el modelo del formulario utilizando Mongoose
const formSchema = new mongoose.Schema({
  option: String,
  nickname: String,
});

const Form = mongoose.model('Form', formSchema);

// Definir la ruta para recibir los datos del formulario
app.post('/api/form', (req, res) => {
  const { option, nickname } = req.body;

  // Crea un nuevo documento utilizando el modelo de Mongoose
  const newForm = new Form({ option, nickname });

  // Guarda el documento en la base de datos
  newForm.save()
    .then((savedForm) => {
      console.log('[ MaWardsBackend ] '.yellow + 'Formulario guardado correctamente'.green , savedForm);
      res.status(200).json({ message: '[ MaWardsBackend ] Formulario guardado correctamente' });
    })
    .catch((error) => {
      console.error('[ MaWardsBackend ] '.yellow + 'Error al guardar el formulario'.red , error);
      res.status(500).json({ error: '[ MaWardsBackend ] Error al guardar el formulario' });
    });
});

// Iniciar el servidor
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

