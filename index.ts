import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Ruta de ejemplo
app.get('/api/hola', (req: Request, res: Response) => {
  res.json({ mensaje: '¡Hola, mundo!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

