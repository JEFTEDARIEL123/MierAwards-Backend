// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const Mongodb = process.env.MONGODB
// Configura bodyParser para procesar datos en formato JSON
app.use(bodyParser.json());

// Establece la conexión a la base de datos de MongoDB
mongoose.connect(Mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connectado a MongoDB');
});

// Definir el modelo del formulario utilizando Mongoose
const formSchema = new mongoose.Schema({
  option: String,
});

const Form = mongoose.model('Form', formSchema);

// Definir la ruta para recibir los datos del formulario
app.post('/api/form', (req, res) => {
  const { option } = req.body;

  // Crea un nuevo documento utilizando el modelo de Mongoose
  const newForm = new Form({ option });

  // Guarda el documento en la base de datos
  newForm.save((err) => {
    if (err) {
      console.error('Error al guardar el formulario:', err);
      res.status(500).json({ error: 'Error al guardar el formulario' });
    } else {
      console.log('Formulario guardado correctamente');
      res.status(200).json({ message: 'Formulario guardado correctamente' });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

