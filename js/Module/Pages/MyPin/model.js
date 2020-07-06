const postAPI = require("API/Post");
this.listMyPin = ko.observableArray([]);
postAPI.getMyPin().then((res) => {
    this.listMyPin.push(...res.data.hits);
}).catch((e) => {
    console.log(e);
})

this.tapItem = (data, event) => {
    if (event.target.tagName.toLowerCase() !== "svg") {
        app.setPage('PostDetail', data)
    }
}

this.removeFavorite = (data) => {
    postAPI.unpin(data.id).then((res)=>{
        if(res.code === 0){
            //remove luon
            this.listMyPin.remove((item) => item.id === data.id ) ;
        }
    }).catch((e)=>{
        console.log(e);
    })
}