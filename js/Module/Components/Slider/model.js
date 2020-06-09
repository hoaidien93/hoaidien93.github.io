this.isShow = false;
this.backHome = () => {

}
this.myFavorite = () => {

}
this.myRoom = () => {

}
this.logout = () => {

}

this.show = () => {
    blank.show();
    this.isShow = true;
    $(this).css(`margin-left`, '0px');
}
this.hide = () => {
    blank.hide();
    this.isShow = false;
    $(this).css(`margin-left`, '-100vw');
}

this.afterBinding = () => {
    document.addEventListener("swipe", (e) => {
        if(e.detail.direction === "left"){
            this.hide();
        }
    });
    document.addEventListener('tap', (e) => {
        let pageX = e.detail.pageX;
        if (this.isShow && pageX > this.offsetWidth) {
            this.hide();
        }

    });
}

window.slider = this;