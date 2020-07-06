const postAPI = require("API/Post");
const PAGE_SIZE = 10;
let page = 0;
let size = 1;
this.listResult = ko.observableArray([]);


this.afterBinding = (e) => {
    $(window).off('scroll');
    // Detect scroll end of page
    $(window).on('scroll', function () {
        if ($('.app').height() <= $('html').scrollTop() + $(window).height() + 1) {
            if (page < size) {
                getMyRoom();
            }
        }
    })
}

let getMyRoom = () => {
    postAPI.getMyPost(page++).then((res) => {
        this.listResult.push(...res.data.hits);
        size = Math.ceil(res.data.total / PAGE_SIZE);
    }).catch((err) => {
        console.log(err);
    });
}
getMyRoom();