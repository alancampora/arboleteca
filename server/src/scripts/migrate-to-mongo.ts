import mongoose from 'mongoose';
import { Tree } from '../models/tree';
import data from '../../data/output_street_0.json';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_DB}`;


async function run() {
  try {
    await mongoose.connect(connectionString);

    // Transformar datos a formato GeoJSON para 'location'
    const docs = data.map(item => ({
      ...item,
      type: "street",
      location: {
        type: "Point",
        coordinates: [
          parseFloat(item.long),
          parseFloat(item.lat)
        ]
      }
    }));

    const result = await Tree.insertMany(docs);
    console.log(`Se insertaron ${result.length} documentos.`);

    // Crear el índice geoespacial (por si no se hizo automáticamente)
    await Tree.collection.createIndex({ location: "2dsphere" });
    console.log("Índice 2dsphere creado.");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
