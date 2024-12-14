import treeInformation from './tree-information';
import express from 'express';
import cors from 'cors';
import { findNearestTreesWithDistance } from './utils/find-nearest-trees';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import lowercaseSecond from './utils/lowercase-second';
import { Tree } from './models/tree';

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
    const nearestTrees = await findNearestTreesWithDistance(latitude, longitude);
    let nearestTressWithMoreData = [];
    for (const tree of nearestTrees) {
      const formattedTree = tree;
      const treeKey = lowercaseSecond(formattedTree?.scientific_name) as keyof typeof treeInformation;
      nearestTressWithMoreData.push({
        ...formattedTree, information: { ...treeInformation[treeKey] }, metadata: {
          distance: tree.distance,
        }
      });
    }

    //res.json(nearestTrees);
    res.json(nearestTressWithMoreData);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get('/trees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tree = await Tree.findById(id); // Mongoose automatically converts to ObjectId
    if (tree) {
      const formattedTree = tree.toObject();
      const treeKey = lowercaseSecond(formattedTree?.scientific_name) as keyof typeof treeInformation;
      const treeWithInformation = { ...formattedTree, information: { ...treeInformation[treeKey] } };
      res.status(200).json(treeWithInformation);
    } else {
      res.status(404).json({ error: 'Tree not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: "/trees/:id" });
  }
});

app.listen(PORT, async () => {
  const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_DB}`;
  await mongoose.connect(connectionString);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
