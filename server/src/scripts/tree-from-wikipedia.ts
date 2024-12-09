import axios from 'axios';
import fs from 'fs';

// Define el tipo de respuesta de la API de Wikipedia
interface WikipediaResponse {
  query: {
    pages: {
      [key: string]: {
        extract?: string;
        title: string;
        pageid?: number;
        images?: { title: string }[];
      };
    };
  };
}

interface ImageInfoResponse {
  query: {
    pages: {
      [key: string]: {
        imageinfo?: { url: string }[];
      };
    };
  };
}

// Función para obtener información de una imagen original
async function obtenerImagenOriginal(imageTitle: string): Promise<string> {
  const urlBase = 'https://es.wikipedia.org/w/api.php';

  try {
    const params = {
      action: 'query',
      format: 'json',
      prop: 'imageinfo',
      titles: imageTitle,
      iiprop: 'url', // Obtener la URL original de la imagen
    };

    const { data } = await axios.get<ImageInfoResponse>(urlBase, { params });
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    if (page?.imageinfo?.[0]?.url) {
      return page.imageinfo[0].url;
    }
  } catch (error) {
    console.error(`Error obteniendo la imagen original para "${imageTitle}":`, (error as Error).message);
  }

  return 'Imagen original no disponible.';
}

// Función para buscar información en Wikipedia
async function buscarEnWikipedia(tiposDeArboles: string[]): Promise<Record<string, { descripcion: string; imagen?: string }>> {
  const urlBase = 'https://es.wikipedia.org/w/api.php';
  const resultados: Record<string, { descripcion: string; imagen?: string }> = {};

  for (const arbol of tiposDeArboles) {
    try {
      const params = {
        action: 'query',
        format: 'json',
        prop: 'extracts|images',
        titles: arbol,
        exintro: true,
        explaintext: true,
      };

      const { data } = await axios.get<WikipediaResponse>(urlBase, { params });

      const pages = data.query.pages;
      const page = Object.values(pages)[0];

      if (page && page.pageid) {
        // Obtener el título de la primera imagen (si existe)
        
        let imageUrl ='Imagen no disponible.';

        if (page.images) {
          for (const image of page.images) {
            if (image.title.split('.').pop() === "jpg") {
              imageUrl = await obtenerImagenOriginal(image.title);
            }
          }
        }

        resultados[arbol] = {
          descripcion: page.extract || 'Descripción no encontrada.',
          imagen: imageUrl,
        };
      } else {
        resultados[arbol] = {
          descripcion: 'Información no encontrada.',
          imagen: 'Imagen no disponible.',
        };
      }
    } catch (error) {
      console.error(`Error buscando información para "${arbol}":`, (error as Error).message);
      resultados[arbol] = {
        descripcion: 'Error al buscar.',
        imagen: 'Imagen no disponible.',
      };
    }
  }

  return resultados;
}

// Función para guardar en un archivo JSON
function guardarEnJson(nombreArchivo: string, datos: Record<string, { descripcion: string; imagen?: string }>): void {
  fs.writeFileSync(nombreArchivo, JSON.stringify(datos, null, 2), 'utf8');
  console.log(`Información guardada en el archivo: ${nombreArchivo}`);
}

// Array de tipos de árboles
const tiposDeArboles = ["Tipuana_tipu",
  "Peltophorum_dubium",
  "Fraxinus_pennsylvanica",
  "Jacaranda_mimosifolia",
  // "Tilia_x_moltkensiana",
  "Ficus_benjamina"];



// Ejecutar la función principal
(async () => {
  const resultados = await buscarEnWikipedia(tiposDeArboles);
  guardarEnJson('arboles_con_imagenes_originales.json', resultados);
})();



