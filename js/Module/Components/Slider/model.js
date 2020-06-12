const store = require("Store/Store");
this.isShow = store.isOpenSlider;

this.backHome = () => {

}
this.myFavorite = () => {

}
this.myRoom = () => {

}
this.logout = () => {

}
this.isShow.subscribe((newValue) => {
    if (newValue) {
        store.isShowBlank(true);
        $(this).css(`margin-left`, '0px');
    }
    else {
        store.isShowBlank(false);
        this.isShow = false;
        $(this).css(`margin-left`, '-100vw');
    }
});

this.afterBinding = () => {
    document.addEventListener("swipe", (e) => {
        if (e.detail.direction === "left" && store.isOpenSlider()) {
            store.isOpenSlider(false);
        }
    });
    document.addEventListener('tap', (e) => {
        let pageX = e.detail.pageX;
        if (store.isOpenSlider() && pageX > this.offsetWidth) {
            store.isOpenSlider(false);
        }
    });
}