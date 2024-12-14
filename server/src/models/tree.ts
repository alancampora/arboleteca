import { Schema, model, Document } from 'mongoose';

// Subschema for GeoJSON Location
const locationSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
}, { _id: false });

// Interface for the Tree Document
export interface ITree extends Document {
  id_tree: string;
  type: 'street' | 'park';
  long: string;
  lat: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // Longitude, Latitude
  };
  scientific_name: string;
  total_height?: string;
  diameter?: string;
  address?: string;
  id_specie?: string;

  // Street-specific fields
  street_info?: {
    district?: string;
    street_name?: string;
    street_number?: string;
    street_metal_number?: string;
    sidewalk_width?: string;
    planter_condition?: string;
    planter_location?: string;
    planter_level?: string;
  };

  // Park-specific fields
  park_info?: {
    park?: string;
    inclination?: string;
    common_name?: string;
    leaf_type?: string;
    family_type?: string;
    genus_name?: string;
    origin?: string;
    coord_x?: string;
    coord_y?: string;
  };

  metadata?: {
    distance: string;
  }
}

// Main Tree Schema
const treeSchema = new Schema<ITree>({
  id_tree: { type: String, required: true },
  type: { type: String, enum: ['street', 'park'], required: true },

  long: { type: String, required: true },
  lat: { type: String, required: true },
  location: locationSchema, // GeoJSON location

  scientific_name: { type: String, required: true },
  total_height: { type: String },
  diameter: { type: String },
  address: { type: String },
  id_specie: { type: String },

  street_info: {
    district: { type: String },
    street_name: { type: String },
    street_number: { type: String },
    street_metal_number: { type: String },
    sidewalk_width: { type: String },
    planter_condition: { type: String },
    planter_location: { type: String },
    planter_level: { type: String },
  },

  park_info: {
    park: { type: String },
    inclination: { type: String },
    common_name: { type: String },
    leaf_type: { type: String },
    family_type: { type: String },
    genus_name: { type: String },
    origin: { type: String },
    coord_x: { type: String },
    coord_y: { type: String },
  },
});

// Adding a 2dsphere index to the location field
treeSchema.index({ location: '2dsphere' });

// Export the model
export const Tree = model<ITree>('Tree', treeSchema);
