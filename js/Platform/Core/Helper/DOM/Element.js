define(() => {
    const PREVIOUS_PAGE = "#previousPage";
    let currentTap;
    let eventFireHove;
    let swipeEvent;
    const SWIPE = {
        allowTime: 250,
        threshold: 100
    }

    document.addEventListener('tap', function (e) {
        let isDirectTo = false;
        let elementTarget;
        // Check back to
        for (let i = 0; i < e.detail.path.length; i++) {
            if (e.detail.path[i].directInfo) {
                isDirectTo = true;
                elementTarget = e.detail.path[i];
                break;
            }
        }
        if (isDirectTo) {
            let info = elementTarget.directInfo;
            if (info.to === PREVIOUS_PAGE) {
                app.backTo();
            }
            else {
                // get Direct Data
                app.setPage(info.to, info.data);
            }
        }
    });

    document.addEventListener('touchstart', function (e) {
        window.scrollTopBefore = $(window).scrollTop();
        currentTap = {
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY,
            path: e.path,
            target: e.target
        };
        swipeEvent = {
            startX: e.changedTouches[0].pageX,
            startTime: Date.now()
        };
        eventFireHove = setTimeout(() => {
            var event = new CustomEvent('touchhover', {
                bubbles: true,
                detail: {
                    path: currentTap.path, 
                    target: currentTap.target
                }
            });
            e.target.dispatchEvent(event);
            currentTap = undefined;
        }, 1000);
    });

    document.addEventListener('touchend', function (e) {
        if ($(window).scrollTop() + $(window).innerHeight() >= $("body").height()) {
            let dragEvent = new CustomEvent(
                'loadMore'
            );
            document.dispatchEvent(dragEvent);
        }

        if (currentTap) {
            if (currentTap.pageX === e.changedTouches[0].pageX && currentTap.pageY === e.changedTouches[0].pageY) {
                var event = new CustomEvent('tap', {
                    bubbles: true,
                    detail: {
                        path: currentTap.path
                    }
                });
                currentTap.target.dispatchEvent(event);
            }
        }
        clearTimeout(eventFireHove);

        // HandleSwipeEvent
        let distance = swipeEvent.startX - e.changedTouches[0].pageX;
        if (Math.abs(distance) >= SWIPE.threshold) {
            if (Date.now() - swipeEvent.startTime <= SWIPE.allowTime) {
                // Dispatch Event SWIPE
                var event = new CustomEvent('swipe', {
                    bubbles: true,
                    detail: {
                        direction: distance > 0 ? "left" : "right"
                    }
                });
                e.target.dispatchEvent(event);
            }
        }
        currentTap = undefined;
        swipeEvent = undefined;
    });

    document.addEventListener('touchmove', (e) => {
        clearTimeout(eventFireHove);
        currentTap = undefined;
    })

    if (!("path" in Event.prototype))
        Object.defineProperty(Event.prototype, "path", {
            get: function () {
                var path = [];
                var currentElem = this.target;
                while (currentElem) {
                    path.push(currentElem);
                    currentElem = currentElem.parentElement;
                }
                if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
                    path.push(document);
                if (path.indexOf(window) === -1)
                    path.push(window);
                return path;
            }
        });

    // Add prototype
    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }
});