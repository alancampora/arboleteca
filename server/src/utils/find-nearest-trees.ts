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


