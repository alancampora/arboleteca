import treeInformation from './tree-information';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { findNearestTrees } from './utils/find-nearest-trees';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

app.get('/nearest/tree', async (req: any, res: any) => {
  const { lat, long } = req.query;

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(long as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Parámetros de latitud o longitud inválidos" });
  }

  try {
    const nearestTrees = await findNearestTrees(latitude, longitude);
    let nearestTressWithMoreData = [];
    for (const tree of nearestTrees) {
      const formattedTree = tree.toObject();
      nearestTressWithMoreData.push({ ...formattedTree, information: { ...treeInformation[formattedTree?.nombre_cientifico as keyof typeof treeInformation] } });
    }

    //res.json(nearestTrees);
    res.json(nearestTressWithMoreData);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, async () => {
  const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_DB}`;
  await mongoose.connect(connectionString);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
