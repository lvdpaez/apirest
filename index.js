const express = require('express');
const app = express();
const port = 3000;

// Arreglos para almacenar los datos
const clients = [];
const products = [];

// Rutas de clientes
app.get('clients', (req, res) => {
  res.json(clients);
});

app.post('clients', (req, res) => {
  // Obtener los datos del cliente del cuerpo de la solicitud
  const { nombre, correo, edad, numeroCelular, numeroCedula } = req.body;

  //crear un nuevo cliente
  const newClient = {
    nombre,
    correo,
    edad,
    numeroCelular,
    numeroCedula,
    
  };

  // Agregar el cliente al arreglo de clientes
  clients.push(newClient);

  res.json(newClient);
});

// Rutas de productos
app.get('products', (req, res) => {
  res.json(products);
});

app.post('products', (req, res) => {
  // Obtener los datos del producto del cuerpo de la solicitud
  const { tipoProducto, cantidad } = req.body;

  // Crear un nuevo producto
  const newProduct = {
    tipoProducto,
    cantidad,
  };

  // Agregar el producto al arreglo de productos
  products.push(newProduct);

  res.json(newProduct);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API REST corriendo en http://localhost:3000`);
});

