export type Tree = {
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

  information?: {
    name: string;
    summary: string;
    img: string;
  }
}


