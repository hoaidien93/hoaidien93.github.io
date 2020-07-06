const searchAPI = require("API/Search");
const addressAPI = require("API/Address");
const postAPI = require("API/Post");
const store = require("Store/Store");
const PAGE_SIZE = 10;
let dataChangePage = this._request.data;
this.listPinID = ko.observableArray([]);
this.temp = new Array(10).fill(1);
this.resultSearch = ko.observableArray([]);
this.listDistrict = ko.observableArray([]);
this.listWards = ko.observableArray([]);
this.selectedArea = ko.observable(0);
this.selectedPrice = ko.observable(0);
this.selectedDistrict = ko.observable({});
this.selectedWard = ko.observable({});
let isSetFilter = false;
this.converterPrice = ko.pureComputed(() => {
    let res = {
        max_price: 0,
        min_price: 0
    }
    switch (this.selectedPrice()) {
        case "1":
            res.max_price = 1000000;
            res.min_price = 0;
            break;
        case "2":
            res.max_price = 2000000;
            res.min_price = 1000000;
            break;
        case "3":
            res.max_price = 2000000;
            res.min_price = 5000000;
            break;
        case "4":
            res.max_price = 100000000;
            res.min_price = 5000000;
            break;
        default:
            break;
    }
    return res;
});

this.converterArea = ko.pureComputed(() => {
    let res = {
        max_area: 0,
        min_area: 0
    }
    switch (this.selectedArea()) {
        case "1":
            res.max_area = 20;
            res.min_area = 0;
            break;
        case "2":
            res.max_area = 40;
            res.min_area = 20;
            break;
        case "3":
            res.max_area = 5000;
            res.min_area = 40;
            break;
        default:
            break;
    }
    return res;
});


let page = 0;
let size = 2;
let me = this;

addressAPI.getDistricts().then((res) => {
    let listDiscict = [{
        id: 0,
        name: 'Quận'
    }].concat(res.data);
    this.listDistrict(listDiscict);
}).catch((e) => {
    console.log(e);
})
this.selectedDistrict.subscribe((e) => {
    if (e) {
        addressAPI
            .getWards(e)
            .then((res) => {
                let listWards = [{
                    id: 0,
                    name: 'Phường'
                }].concat(res.data);
                this.listWards(listWards);
            })
            .catch((e) => { console.log(e) });
    }
    else {
        this.listWards([
            {
                id: 0,
                name: 'Phường'
            }
        ]);
    }
})
this.afterBinding = () => {
    cordova.plugins.firebase.messaging.requestPermission({ forceShow: true }).then(function () {
        console.log("You'll get foreground notifications when a push message arrives");
        cordova.plugins.firebase.messaging.subscribe("Test");
    }).catch((e) => {
    });

    $(window).off('scroll');
    // Detect scroll end of page
    $(window).on('scroll', function () {
        if ($('.app').height() <= $('html').scrollTop() + $(window).height() + 1) {
            if (page < size) {
                if (isSetFilter) {
                    callFilter();
                }
                else getStartPage();
            }
        }
    })
}

let getStartPage = () => {
    store.isShowLoading(true);
    searchAPI.indexPage(page++).then((res) => {
        size = Math.ceil(res.data.total / PAGE_SIZE);
        this.resultSearch.push(...res.data.hits.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
        store.isShowLoading(false);
    }).catch((e) => {
        console.log(e);
        store.isShowLoading(false);
    })
}

this.resultWithPin = ko.pureComputed(() => {
    let result = this.resultSearch();
    result.forEach((e) => {
        if (this.listPinID.indexOf(e.id) > -1) {
            e.pinned(true);
        }
        else e.pinned(false);
    })
    return result;
});

if (dataChangePage) {
    this.resultSearch(dataChangePage.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
} else {
    getStartPage();
}

$(document).off("changeSearchResult");
$(document).on("changeSearchResult", (event, res) => {
    this.resultSearch(res.data.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
})

this.addFavorite = (data, event) => {
    if (data.pinned()) {
        postAPI.unpin(data.id).then((res) => {
            data.pinned(false);
        }).catch((e) => console.log(e));
    }
    else {
        event.currentTarget.getElementsByTagName('path')[0].setAttribute("fill", "red");
        postAPI.pin(data.id).then((res) => {
            if (!res.code) {
                app.setPage("MyPin");
            }
        }).catch((e) => console.log(e));
    }
}

(function () {
    postAPI.getMyPin().then((res) => {
        me.listPinID(res.data.hits.map((e) => { return e.id }));
    }).catch((e) => {
        console.log(e);
    })
})();

this.applyFilter = () => {
    isSetFilter = true;
    page = 0;
    this.resultSearch([])
    callFilter();
}

let callFilter = () => {
    store.isShowLoading(true);
    searchAPI.filter({
        "max_area": this.converterArea().max_area,
        "min_area": this.converterArea().min_area,
        "district_id": this.selectedDistrict(),
        "max_price": this.converterPrice().max_price,
        "min_price": this.converterPrice().min_price,
        "ward_id": this.selectedWard(),
        "location": document.getElementById("search").value
    },page++).then((res) => {
        store.isShowLoading(false);
        size = Math.ceil(res.data.total / PAGE_SIZE);
        this.resultSearch.push(...res.data.hits.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
    }).catch((e) => {
        console.log(e);
    })
}