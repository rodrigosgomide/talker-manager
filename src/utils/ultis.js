const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;  
}

async function getTalkerById(id) {
    const data = await readTalkerData();
    const talker = data.find((t) => t.id === Number(id));
    return talker;
}

module.exports = {
    readTalkerData,
    getTalkerById,
};