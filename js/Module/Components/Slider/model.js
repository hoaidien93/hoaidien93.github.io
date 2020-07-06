let store = require("Store/Store");
this.isShow = ko.observable(false);

this.backHome = () => {

}
this.myFavorite = () => {

}
this.myRoom = () => {

}
this.logout = () => {

}
this.changePage = (page) => {
    app.setPage(page);
    store.isShowBlank(false);
}

this.isShow.subscribe((newValue) => {
    if (newValue) {
        store.isShowBlank(true);
        $(this).css(`margin-left`, '0px');
    }
    else {
        store.isShowBlank(false);
        $(this).css(`margin-left`, '-100vw');
    }
});


this.afterBinding = () => {
    window.slider = this;
    $(document).off('tap');
    $(document).on("swipe", (e) => {
        if (e.detail.direction === "left" && this.isShow()) {
            this.isShow(false);
        }
    });
    $(document).off('tap');
    $(document).on('tap', (e) => {
        let pageX = e.detail.pageX;
        if (this.isShow() && pageX > this.offsetWidth) {
            this.isShow(false);
        }
    });
}