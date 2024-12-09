import mongoose, { Schema, Document } from 'mongoose';

interface ITree extends Document {
  long: string;
  lat: string;
  nro_registro: string;
  tipo_activ: string;
  comuna: string;
  manzana: string;
  calle_nombre: string;
  calle_altura: string;
  calle_chapa: string;
  direccion_normalizada: string;
  ubicacion: string;
  nombre_cientifico: string;
  ancho_acera: string;
  estado_plantera: string;
  ubicacion_plantera: string;
  nivel_plantera: string;
  diametro_altura_pecho: string;
  altura_arbol: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitud, latitud]
  };
}

const TreeSchema = new Schema<ITree>({
  long: String,
  lat: String,
  nro_registro: String,
  tipo_activ: String,
  comuna: String,
  manzana: String,
  calle_nombre: String,
  calle_altura: String,
  calle_chapa: String,
  direccion_normalizada: String,
  ubicacion: String,
  nombre_cientifico: String,
  ancho_acera: String,
  estado_plantera: String,
  ubicacion_plantera: String,
  nivel_plantera: String,
  diametro_altura_pecho: String,
  altura_arbol: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],  // Solo acepta "Point"
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})


TreeSchema.index({ location: "2dsphere" });

export const Tree = mongoose.model<ITree>("Tree", TreeSchema);
