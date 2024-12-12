const axios = require("axios");
const fs = require('fs');
const cheerio = require("cheerio");
const allTrees = require('./all-trees');

// URL de la página de Wikipedia específica

async function scrapeWikipedia(tree) {
  try {

    const url = `https://es.wikipedia.org/wiki/${tree.replace(" ", "_")}`;

    // Obtener el HTML de la página
    const { data } = await axios.get(url);

    // Cargar el HTML en Cheerio
    const $ = cheerio.load(data);



    const infoBox = $("table.infobox").first();
    const summary = infoBox.nextAll("p").first().text();

    const headingDiv = $("div.mw-heading.mw-heading2").first();
    const origin = headingDiv.nextAll("p").first().text();

    const imageSrc = $("img")
      .filter((_, el) => $(el).attr("src")?.endsWith(".jpg"))
      .first()
      .attr("srcset");

    const img = `https:${imageSrc.split(",").pop().slice(0, -3).trim()}`;

    // Imprimir un resumen del contenido
    console.log("----Información extraída----");
    console.log(summary); // Muestra solo los primeros 500 caracteres
    console.log(origin); // Muestra solo los primeros 500 caracteres
    console.log(`https:${imageSrc.split(",").pop().slice(0, -3).trim()}`); // Muestra solo los primeros 500 caracteres

    return { name: tree, summary, origin, img }

    // (Opcional) Guarda el contenido en un archivo o úsalo como quieras
  } catch (error) {
    console.error("Error al hacer scraping:", error);
  }
}

function toJson(nombreArchivo, datos) {
  fs.writeFileSync(nombreArchivo, JSON.stringify(datos, null, 2), 'utf8');
  console.log(`Información guardada en el archivo: ${nombreArchivo}`);
}

async function run() {
  let results = {};

  for (const tree of allTrees) {
    results = { [tree]: { ...await scrapeWikipedia(tree) }, ...results }
  }


  toJson('tree-information.json', results);
}

run();





