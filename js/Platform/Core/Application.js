define([], function () {
    return (function Application(rootElement) {
        "use strict";
        this.screen = "Home";
        this.stackScreen = [];
        let appNext = null;
        let preventChangePage = false;
        this.rootElement = rootElement;
        this.Start = () => {
            this.setPage(this.Screen, {}, false, true);
        }

        this.setPage = (target, data = {}, isBack = false, isStart = false) => {
            if (!preventChangePage) {
                preventChangePage = true;
                setTimeout(() => { preventChangePage = false }, 500);
                if (!isBack && !isStart) {
                    this.stackScreen.push({
                        page: this.Screen,
                        data: this.screenData
                    });
                }
                this.Screen = target;
                this.screenData = data;
                if (!isStart) {
                    if (!isBack) { // NEXT
                        appNext = $('<div class="app-next"></div>');
                        appNext.insertBefore($(".app-wrapper .app"));
                        appNext.animate({ left: '0' }, 400, function () {
                            $('.app').remove();
                            appNext.attr('class', 'app');
                        });
                    }
                    else {
                        appNext = $('<div class="app-prepare"></div>');
                        $(".app-wrapper").prepend(appNext);
                        $('.app').animate({ marginLeft: '100vw' }, 400, function () {
                            $('.app').remove();
                            appNext.attr('class', 'app');
                        });
                    }
                }
                // Get Page
                require([`pages/Build/${target}.build`], (Page) => {
                    let page;
                    if (isStart) {
                        page = new Page(this, this.rootElement, data);
                    }
                    else {
                        page = new Page(this, appNext[0], data);
                        this.rootElement = appNext[0];
                    }
                    $('html').scrollTop(0);
                    page.binding();
                });
            }
        }

        this.backTo = () => {
            let screenData = this.stackScreen.pop();
            if (screenData) {
                this.setPage(screenData.page, screenData.data, true);
            }
            else console.log("Cannot back");
        }
    });
})