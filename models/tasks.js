const fs = require("fs")

const read = () => JSON.parse(fs.readFileSync('../data/users.json', 'utf-8'))
const writeJSON = (data) => {
    let stringifiedData = JSON.stringify (data, null, 2);
    return fs.writeFileSync("../data/users.json", stringifiedData);
};

module.exports= {read, writeJSON}