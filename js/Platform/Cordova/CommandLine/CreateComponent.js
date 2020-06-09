(function () {
    var readlineSync = require('readline-sync');
    var fs = require('fs');
    const args = process.argv.slice(2);
    let name = "";
    let tagName = "";
    let isWidgetComponent = false;
    args.forEach((val, index) => {
        if (val.indexOf("name=") > -1) {
            name = val.split("=")[1];
        }
        if (val.indexOf("tagName=") > -1) {
            tagName = val.split("=")[1];
        }
    })

    if (!name) {
        name =  readlineSync.question(`What's  name of Component: `);
    }
    if (!tagName) {
        tagName =  readlineSync.question(`What's  tag name of custom element: `);
    }
    let temp = readlineSync.question(`Is a Widget Component: (Y/N)`);
    if(temp.toLowerCase() === 'y') isWidgetComponent = true;
    let contents = fs.readFileSync('../Sample/SampleComponent.json', 'utf8');
    if(isWidgetComponent) contents = contents.replace(/false,/, 'true,');
    contents = contents.replace(/{{NameOfComponent}}/g, name);
    contents = contents.replace(/{{custom-tag-name}}/g, tagName);
    fs.writeFileSync(`../../../Components/${name}.json`,contents);
    // Add to list component used
    fs.readFile("../../../config.js",'utf-8',function(err,config){
        config = config.toString();
        let regexMatch = /COMPONENT_USED:(.*]),/s.exec(config);
        let listComponent = JSON.parse(regexMatch[1]);
        newListComponent = listComponent;
        newListComponent.push(name);
        config = config.replace(/(COMPONENT_USED:).*],/s,`$1 ${JSON.stringify(newListComponent)},`)
        fs.writeFile("../../../config.js",config,function(res){});
    });
    // Add folder in Module
    fs.mkdirSync(`../../../Module/Components/${name}`);
    fs.writeFile(`../../../Module/Components/${name}/model.js`,'',(err)=>{});
    fs.writeFile(`../../../Module/Components/${name}/style.scss`,'',(err)=>{});
    fs.writeFile(`../../../Module/Components/${name}/template.html`,'',(err)=>{});

    console.log('Created');
})()
