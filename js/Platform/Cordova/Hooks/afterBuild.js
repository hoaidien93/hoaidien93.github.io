const fs = require('fs');
console.log("BEGIN => after build");

files = fs.readdirSync("./www/js/Platform/Cordova/Php/") || [];
files.forEach((fileName) => {
    content = fs.readFileSync(`./www/js/Platform/Cordova/Php/${fileName}`, "utf-8");
    fs.writeFileSync(`./platforms/browser/www/${fileName}`, content);
});

console.log("--- rmdir ./www/js/pages/Build/");
fs.rmdir(`./www/js/pages/Build/`, { recursive: true },(err) => {
    console.log("--- [DONE] rmdir ./www/js/pages/Build/");
});
console.log("--- rmdir ./www/js/Components/Build/");
fs.rmdir(`./www/js/Components/Build/`, { recursive: true }, (err) => {
    console.log("--- [DONE] rmdir ./www/js/Components/Build/");
});

console.log("--- remove");
let arrRemove = [
    './www/js/Module/Pages',
    './www/js/Module/Components'
];
arrRemove.forEach((folder) => {
    fs.readdir(`${folder}`, (err, files) => {
        files.forEach((file) => {
            fs.unlink(`${folder}/${file}/build.js`, (err) => { });
        })
    })
});
console.log("--- [DONE] remove");

console.log("END => after build");