this.isShow = ko.observable(false);

this.afterBinding = () => {
    window.blank = this;
}

this.show = () => {
    this.isShow(true);
}

this.hide = () => {
    this.isShow(false);
}