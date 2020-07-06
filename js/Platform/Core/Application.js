define(function () {
    return (function Application(rootElement) {
        "use strict";
        let me = this;
        let preventChangePage = false;
        this.Screen = "Home";
        this.screenDetail = {};
        this.stackScreen = [];
        this.rootElement = rootElement;
        let appNext; this.setPage = (target, data = {}, isBack = false, isStart = false) => {
            if (!preventChangePage) {
                preventChangePage = true;
                $(window).off('scroll');
                setTimeout(() => { preventChangePage = false }, 500);
                // Push to stack screen
                if (!isBack && !isStart) {
                    this.stackScreen.push({
                        page: this.Screen,
                        data: this.screenData
                    });
                }
                this.Screen = target;
                this.screenData = data;
                // Animation
                if (!isStart) {
                    if (!isBack) { // NEXT
                        appNext = $('<div class="app-next"></div>');
                        appNext.insertBefore($(".app-wrapper .app"));
                        setTimeout(() => {
                            appNext.animate({ left: '0' }, 400, function () {
                                $('.app').remove();
                                appNext.attr('class', 'app');
                                setFixed();
                            });
                        }, 100)

                    }
                    else {
                        appNext = $('<div class="app-prepare"></div>');
                        $(".app-wrapper").prepend(appNext);
                        $('.app').css({
                            position: "fixed",
                            "z-index": 999
                        });
                        setAbsolute();
                        setTimeout(() => {
                            $('.app').animate({ marginLeft: '100vw' }, 400, function () {
                                $('.app').remove();
                                appNext.attr('class', 'app');
                                setFixed();
                            });
                        }, 100);
                    }
                }
                // Get Page
                require([`Pages/Build/${target}.build`], (Page) => {
                    let page;
                    if (isStart) {
                        page = new Page(this, this.rootElement, data);
                    }
                    else {
                        page = new Page(this, appNext[0], data);
                        this.rootElement = appNext[0];
                    }
                    $('html,body').scrollTop(0);
                    page.binding();

                    (isStart) && (setFixed());
                });
            }
        }

        this.Start = function () {
            this.setPage(me.Screen, {}, false, true);
        };

        this.backTo = function () {
            let screenData = me.stackScreen.pop();
            if (screenData) {
                me.setPage(screenData.page, screenData.data, true);
            }
            else console.log("Cannot back");
        }

        function setFixed() {
            $('.pos-fixed').css({
                "position": "fixed",
            });
        }

        function setAbsolute() {
            $('.pos-fixed').css({
                "position": "absolute",
            });
        }
    });
})

