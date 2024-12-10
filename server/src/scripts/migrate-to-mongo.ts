import mongoose from 'mongoose';
import { Tree } from '../models/tree';
import data from '../../data/output_park_1.json';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_DB}`;


async function run(type:string) {
  try {
    await mongoose.connect(connectionString);

    // Transformar datos a formato GeoJSON para 'location'
    const docs = data.map((item: any) => {
      let street_info;
      let park_info;

      if (type == "street") {
        street_info = {
          district: item.district,
          street_name: item.street_name,
          street_number: item.street_number,
          street_metal_number: item.street_metal_number,
          sidewalk_width: item.sidewalk_width,
          planter_condition: item.planter_condition,
          planter_location: item.planter_location,
          planter_level: item.planter_level,

        }
      }

      if (type == "park") {
        park_info = {
          park: item.park,
          inclination: item.inclination,
          common_name: item.common_name,
          leaf_type: item.leaf_type,
          family_type: item.family_type,
          genus_name: item.genus_name,
          origin: item.origin,
          coord_x: item.coord_x,
          coord_y: item.coord_y,
        }
      }
      return {
        ...item,
        type,
        park_info,
        street_info,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(item.long),
            parseFloat(item.lat)
          ]
        }
      }
    });

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

run("park");
