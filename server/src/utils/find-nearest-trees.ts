import { Tree } from '../models/tree';

export async function findNearestTrees(lat: number, long: number) {
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
  }).limit(10);

  return tree;
}


export async function findNearestTreesWithDistance(lat: number, long: number){
  const trees = await Tree.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [long, lat], // Tu posición
        },
        distanceField: "distance", // Campo adicional con la distancia calculada
        maxDistance: 25, // Distancia máxima en metros
        spherical: true, // Cálculo esférico
      },
    },
    { $limit: 10 }, // Limitar a los 10 árboles más cercanos
  ]);

  return trees;

}


