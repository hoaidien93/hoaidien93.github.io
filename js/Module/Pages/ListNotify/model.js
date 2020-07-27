const userAPI = require("API/UserAPI");
this.temp = ko.observableArray([]);
this.isShowEmpty = ko.observable(false);
userAPI.getMyNotify().then((res) => {
    console.log(res);
    this.temp(res.data.hits.map((e) => {
        if (e.type === 1) {
            e.imgSrc = `./img/comment-icon.png`;
        }
        if (e.type === 0) {
            e.imgSrc = `./img/post-icon.png`;
        }
        if (e.type === 3) {
            e.imgSrc = `./img/warning.png`;
        }
        return e;
    }));
}).catch((e) => {
    console.log(e);
})
this.temp.subscribe((newValue) => {
    if (newValue.length === 0) {
        this.isShowEmpty(true);
    } else {
        this.isShowEmpty(false);
    }
})


this.directPage = (data, event) => {
    if (data.type === 3) {
        window.open("tel:+8434531333");
    } else {
        app.setPage('PostDetail', { id: data.post_id });
        if (data.read_at == 0) {
            userAPI.readNotify(data.id).then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            })
        }
    }
}