import mongoose from 'mongoose';
import { Tree } from '../models/tree';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_DB}`;


// Función para encontrar el árbol más cercano
async function findNearestTree(lat: number, long: number) {
  // Ajusta la query según tus necesidades
  // $near: Ordena resultados por cercanía.
  // $geometry: Indica el punto de referencia.
  // $maxDistance (opcional): Indicar distancia máxima en metros, si se desea limitar.
  const tree = await Tree.findOne({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [long, lat]
        },
      }
    }
  });

  return tree;
}

async function findNearestTrees(lat: number, long: number) {
  const tree = await Tree.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [long, lat]
        },
        $maxDistance: 25,
      }
    }
  });

  return tree;
}



(async () => {
  // Conexión a la base de datos
  await mongoose.connect(connectionString);

  // Ejemplo: Tu ubicación actual
  const myLat = -34.6364421;
  const myLong = -58.437063;

  //const nearestTree = await findNearestTree(myLat, myLong);
  const nearestTrees = await findNearestTrees(myLat, myLong);

  console.log(nearestTrees);

  if (nearestTrees) {
    nearestTrees.forEach(tree => {
      console.log(tree);
    });
  } else {
    console.log("No se encontró ningún árbol cercano.");
  }
  await mongoose.disconnect();
})();
