import express from 'express';
import { customersDB, Customer } from '../../customersDB';
import { getCustomers } from '../services/customers.service';

let localCustomersDB = customersDB;

const router = express.Router();

router.get('/customers', async (req, res) => {
  try {
    const limit = req.query.limit as string;
    const response = await getCustomers(limit);
    res.status(200).json({ result: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

router.get('/customers/id/:id', (req, res) => {
  try {
    const id = req.params.id;
    const result = localCustomersDB.filter(item => item.id === id);

    if (result.length === 0) {
      res.status(404).json({ message: "El cliente solicitado no existe" });
    } else {
      res.status(200).json({ result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

router.get('/customers/name/:name', (req, res) => {
  try {
    const name = req.params.name;
    const result = localCustomersDB.filter(item => item.name === name);

    if (result.length === 0) {
      res.status(404).json({ message: "El cliente solicitado no existe" });
    } else {
      res.status(200).json({ result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

router.post('/customers', (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    localCustomersDB.push(body);
    res.status(201).json({ message: 'El cliente se ha guardado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

router.put('/customers/:id', (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const customerIndex = localCustomersDB.findIndex(item => item.id === id);

    if (customerIndex === -1) {
      res.status(404).json({ message: "El cliente no existe" });
    } else {
      localCustomersDB[customerIndex] = body;
      res.status(200).json({ message: 'Cliente actualizado correctamente' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

router.delete('/customers/:id', (req, res) => {
  try {
    const id = req.params.id;
    const result = localCustomersDB.filter(item => item.id !== id);

    if (result.length === localCustomersDB.length) {
      res.status(404).json({ message: "El cliente no existe" });
    } else {
      localCustomersDB = result;
      res.status(200).json({ message: "Cliente eliminado correctamente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
});

router.patch('/customers/:id', (req, res) => {
  try {
    const id = req.params.id;
    const key = req.query.key as keyof Customer;
    const value = req.query.value as string;

    if (key && value) {
      const customerIndex = localCustomersDB.findIndex(item => item.id === id);

      if (customerIndex === -1) {
        res.status(404).json({ message: "El cliente no existe" });
      } else {
        localCustomersDB[customerIndex][key] = value;
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

export default router;
