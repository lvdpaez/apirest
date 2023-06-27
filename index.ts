import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

interface Client {
  nombre: string;
  correo: string;
  edad: number;
  numeroCelular: string;
  numeroCedula: string;
}

const clients: Client[] = [];

app.get('clients', (req: Request, res: Response) => {
  res.json(clients);
});

app.post('clients', (req: Request, res: Response) => {
  const { nombre, correo, edad, numeroCelular, numeroCedula } = req.body;

  const newClient: Client = {
    nombre,
    correo,
    edad,
    numeroCelular,
    numeroCedula,
  };

  clients.push(newClient);

  res.json(newClient);
});

app.listen(port, () => {
  console.log(`Servidor API REST corriendo en http://localhost:3000`);
});
