const fs = require('fs');
const uglifyJS = require("uglify-es");
const sass = require("node-sass");
let css = sass.renderSync({
    file: `./www/css/index.css`,
    outputStyle: 'compressed'
}).css;

// Remove file build fail
try {
    fs.rmdirSync(`./www/js/pages/Build/`, { recursive: true });
    fs.rmdirSync(`./www/js/Components/Build/`, { recursive: true });
} catch (e) {

}
try {
    files = fs.readdirSync("./www/js/pages/");
    fs.mkdirSync("./www/js/pages/Build/");
    files.forEach((fileName) => {
        if (/.json$/.test(fileName)) {
            let nameWithoutExtension = /(.*).json$/.exec(fileName)[1];
            content = fs.readFileSync(`./www/js/pages/${fileName}`, "utf-8");
            content = JSON.parse(content);
            let codeContent = fs.readFileSync(`./www/js/Platform/Cordova/Sample/Combine/Page.sample`, 'utf-8');
            codeContent = codeContent.replace(/{{name}}/g, content.name);
            codeContent = uglifyJS.minify(codeContent, { keep_fnames: true, mangle: false });
            fs.writeFileSync(`./www/js/pages/Build/${nameWithoutExtension}.build.js`, codeContent.code);
            css += sass.renderSync({
                file: `./www/js/Module/Pages/${nameWithoutExtension}/style.scss`,
                outputStyle: 'compressed'
            }).css;
        }
    });
} catch (e) {

}
files = fs.readdirSync("./www/js/Components/");
fs.mkdirSync("./www/js/Components/Build/");
files.forEach((fileName) => {
    if (/.json$/.test(fileName)) {
        let nameWithoutExtension = /(.*).json$/.exec(fileName)[1];
        content = fs.readFileSync(`./www/js/Components/${fileName}`, "utf-8");
        content = JSON.parse(content);
        let codeContent = fs.readFileSync(`./www/js/Platform/Cordova/Sample/Combine/Component.sample`, 'utf-8');
        codeContent = codeContent.replace(/{{name}}/g, content.name);
        codeContent = codeContent.replace(/{{tagName}}/g, content.tagName);
        codeContent = uglifyJS.minify(codeContent, { keep_fnames: true, mangle: false });
        fs.writeFileSync(`./www/js/Components/Build/${nameWithoutExtension}.build.js`, codeContent.code);
        css += sass.renderSync({
            file: `./www/js/Module/Components/${nameWithoutExtension}/style.scss`,
            outputStyle: 'compressed'
        }).css;
    }
});

// Add in index.css
fs.writeFileSync("./www/css/index.build.css", css);

function combine(folderURL, folderConfig) {
    let folderModule = fs.readdirSync(`${folderURL}`);
    folderModule.forEach((folder) => {
        let files = fs.readdirSync(`${folderURL}/${folder}`);
        let model = '';
        let template = '';
        files.forEach((file) => {
            let path = `${folderURL}/${folder}/${file}`;
            if (fs.lstatSync(path).isFile()) {
                let content = fs.readFileSync(path, 'utf-8');
                let extension = file.match(/.([^.]*)$/g)[0];
                switch (extension) {
                    case '.js':
                        model = content;
                        break;
                    case '.html':
                        template = content;
                        break;
                    default: break;
                }
            }
        });
        // Read dependencies
        let config = fs.readFileSync(`${folderConfig}/${folder}.json`, "utf-8");
        config = JSON.parse(config);
        let strListDependencies = "";
        if (config.dependencies) {
            config.dependencies.forEach((element, index) => {
                if (index != config.dependencies.length - 1)
                    strListDependencies += `"${element}",`;
                else strListDependencies += `"${element}"`;
            });
        }
        let fileCombine = fs.readFileSync(`./www/js/Platform/Cordova/Sample/Combine.sample`, 'utf-8');
        fileCombine = fileCombine.replace(/{{listDependencies}}/g, strListDependencies);
        fileCombine = fileCombine.replace(/{{model}}/g, model);
        fileCombine = fileCombine.replace(/{{template}}/g, template);
        let codeContent = uglifyJS.minify(fileCombine, { keep_fnames: true, mangle: false });
        fs.writeFileSync(`${folderURL}/${folder}/build.js`, codeContent.code);
    });
}
combine('./www/js/Module/Pages', './www/js/Pages');
combine('./www/js/Module/Components', './www/js/Components');



console.log('Before build done');