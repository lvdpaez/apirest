const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const customers =[{
    name:"pepito"
    cedula:"12324"
    correo:"pepit1@gmail.com"
    cumpleaños:"01/02/1990"
    celular:"3256986"
    direccion:"cll false #123"

}]
// Middleware
app.use(bodyParser.json());

// Ruta de ejemplo
app.get('hola', (req, res) => {
  res.send({ mensaje: '¡Hola, mundo! desde get' });
});
app.post('hola', (req, res) => {
    res.send({ mensaje: '¡Hola, mundo!desde post' });
  });
  app.put('hola', (req, res) => {
    res.send({ mensaje: '¡Hola, mundo! desde put' });
  });
  app.delete('hola', (req, res) => {
    res.send({ mensaje: '¡Hola, mundo! desde delete' });
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto en http//localhost:3000 + PORT`);
});






