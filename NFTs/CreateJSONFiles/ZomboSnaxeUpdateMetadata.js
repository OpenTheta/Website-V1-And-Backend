const fs = require('fs');
const path = require('path');

const sourceFolder = './../../../../OpenTheta/Projects/JonneyRenquist/TheRabbitHorde/Drops/PreLaunch/json'; // Folder containing JSON files
const targetFolder = './../../../../OpenTheta/Projects/JonneyRenquist/TheRabbitHorde/Drops/PreLaunch/metadata'; // Folder where modified JSON files will be stored
let fileCounter = 1;


// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Read files from source folder
// Read files from source folder
fs.readdir(sourceFolder, (err, files) => {
    if (err) {
        console.error('Error reading source folder:', err);
        return;
    }

    // Filter files to only include those ending with .json
    files = files.filter(file => file.endsWith('.json'));

    // Shuffle the files array randomly
    files = shuffleArray(files);

    // Iterate through each file
    files.forEach(file => {
        const sourceFilePath = path.join(sourceFolder, file);
        const targetFilePath = path.join(targetFolder, `${fileCounter}.json`);

        // Read JSON file
        fs.readFile(sourceFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }
            try {
                // Parse JSON data
                data = data.toString().slice(0,-4)+data.toString().slice(-3)
                const jsonData = JSON.parse(data);

                // Modify JSON data
                jsonData.external_url = `https://www.therabbitshorde.com/`;
                jsonData.image = `https://arweave.net/6dcEGyu01SR626Eqzy8PyMi3TUOzP7ye-kvOqkMaXp8/${jsonData.image.split('/REPLACE/')[1]}`;
                // Write modified JSON data to target file
                fs.writeFile(targetFilePath, JSON.stringify(jsonData, null, 2), err => {
                    if (err) {
                        console.error(`Error writing file ${targetFilePath}:`, err);
                    } else {
                        console.log(`File ${file} processed and saved as ${targetFilePath}`);
                    }
                });
            } catch (parseErr) {
                console.error(`Error parsing JSON data from file ${file}:`, parseErr);
            }
        });
        fileCounter++;
    });
});