(function(){
    var readlineSync = require('readline-sync');
    var createFile = require('create-file');
    var fs = require('fs');
    const args = process.argv.slice(2);
    let isEnterName = false;
    
    
    args.forEach((val, index) => {
        if(val.indexOf("name=") > -1){
            isEnterName = true;
            let name = val.split("=")[1];
            createPage(name);
        }
    });
    if(!isEnterName){
        let name =  readlineSync.question(`What's  name of Page: `);
        createPage(name);
    }
    
    function createPage(name){
        fs.readFile('../Sample/SamplePage.json', 'utf8', function(err, contents) {
            contents = contents.replace(/{{SamplePage}}/g,name);
            createFile(`../../../pages/${name}.json`, contents , function (err) {
                if(!err){
                    console.log("Page created");
                }
            });
            // Create folder
            fs.mkdirSync(`../../../Module/Pages/${name}`);
            fs.writeFile(`../../../Module/Pages/${name}/model.js`,'',(err)=>{});
            fs.writeFile(`../../../Module/Pages/${name}/template.html`,'',(err)=>{});
            fs.writeFile(`../../../Module/Pages/${name}/style.scss`,'',(err)=>{});
        });
    }
})()
