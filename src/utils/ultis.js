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

async function writeNewTalkerData(talker) {
    const data = await readTalkerData();
    const newTalker = { ...talker, id: data.length + 1 };
    data.push(newTalker);
    const talkers = JSON.stringify(data);
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), talkers);
    return newTalker;
}

async function editTalkerData(talkerId, body) {
    const data = await readTalkerData();
    console.log(body);
    const newInfo = { id: Number(talkerId), ...body };
    console.log(newInfo);
    const newData = data.map((talker) => {
        if (talker.id === Number(talkerId)) return newInfo;
        return talker;
    });
    const talkers = JSON.stringify(newData);
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), talkers);
    return newInfo;
}

module.exports = {
    readTalkerData,
    getTalkerById,
    writeNewTalkerData,
    editTalkerData,
};