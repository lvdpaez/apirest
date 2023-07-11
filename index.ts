import express from 'express';
import { customersDB, Customer } from './customersDB';

const app = express();
const PORT = 3000;

let localCustomersDB = customersDB;

app.use(express.json());

app.get('/customers', (req, res) => {
  try {
    const limit = req.query.limit;

    if (limit !== undefined) {
      localCustomersDB = [];
      for (let index = 0; index < parseInt(limit as string); index++) {
        if (index < customersDB.length) {
          localCustomersDB.push(customersDB[index]);
        }
      }
    }

    res.status(200).json({ result: localCustomersDB });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

app.get('/customers/id/:id', (req, res) => {
  try {
    const id = req.params.id;
    const result = localCustomersDB.filter(item => item.id === id);

    if (result.length === 0) {
      res.status(404).json({ message: "El cliente solicitado no existe" });
    } else {
      res.status(200).json({ result: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

app.get('/customers/name/:name', (req, res) => {
  try {
    const name = req.params.name;
    const result = localCustomersDB.filter(item => item.name === name);
    if (result.length === 0) {
      res.status(404).json({ message: "El cliente solicitado no existe" });
    } else {
      res.status(200).json({ result: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

app.post('/customers', function (request, response) {
  try {
    const body = request.body;
    console.log(body);
    localCustomersDB.push(body);
    response.status(201).json({ message: 'El cliente se ha guardado' });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error inesperado" });
  }
});

app.put('/customers/:id', function (request, response) {
  try {
    const id = request.params.id;
    const body = request.body;
    const customerIndex = localCustomersDB.findIndex(item => item.id === id);
    if (customerIndex === -1) {
      response.status(404).json({ message: "El cliente no existe" });
    } else {
      localCustomersDB[customerIndex] = body;
      response.status(200).json({ message: 'Cliente actualizado correctamente' });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error inesperado" });
  }
});

app.delete('/customers/:id', function (request, response) {
  try {
    const id = request.params.id;
    const result = localCustomersDB.filter(item => item.id !== id);
    if (result.length === localCustomersDB.length) {
      response.status(404).json({ message: "El cliente no existe" });
    } else {
      localCustomersDB = result;
      response.status(200).json({ message: "Cliente eliminado correctamente" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error inesperado" });
  }
});

app.patch('/customers/:id', (req, res) => {
  try {
    const id = req.params.id;
    const key = req.query.key;
    const value = req.query.value;

    if (key && value) {
      const customerIndex = customersDB.findIndex(item => item.id === id);

      console.log(customerIndex);

      if (customerIndex === -1) {
        res.status(404).json({ message: "El cliente no existe" });
      } else {
        localCustomersDB[customerIndex][key as keyof Customer] = value as string;
        res.status(200).json({ message: 'Cliente actualizado correctamente' });
      }
    } else {
      res.status(400).json({ message: "No se han enviado los queries necesarios" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

app.listen(PORT, function () {
  console.log("La aplicación es está ejecutando en: http://localhost:" + PORT);
});
