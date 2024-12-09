const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const convertirCsvAJson = (inputFilePath, outputDir, maxRowsPerFile) => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    let rowCounter = 0;
    let fileCounter = 0;
    let rows = [];

    const writeChunk = () => {
        if (rows.length > 0) {
            const outputFilePath = path.join(outputDir, `output_${fileCounter}.json`);
            fs.writeFileSync(outputFilePath, JSON.stringify(rows, null, 2), 'utf8');
            console.log(`Archivo JSON generado: ${outputFilePath}`);
            fileCounter++;
            rows = [];
        }
    };

    fs.createReadStream(inputFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // Verifica si los campos `long` o `lat` están vacíos
            if (row.long !== "" && row.lat !== "") {
                rows.push(row);
                rowCounter++;
            }

            if (rowCounter % maxRowsPerFile === 0) {
                writeChunk();
            }
        })
        .on('end', () => {
            writeChunk();
            console.log('Migración completada.');
        })
        .on('error', (err) => {
            console.error('Error procesando el archivo:', err);
        });
};

const inputFilePath = './data/arbolado-publico.csv'; // Ruta al archivo CSV de entrada
const outputDir = './data'; // Carpeta donde se guardarán los archivos divididos
const maxRowsPerFile = 50000; // Número máximo de filas por archivo JSON

convertirCsvAJson(inputFilePath, outputDir, maxRowsPerFile);
