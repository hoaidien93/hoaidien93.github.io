const searchAPI = require("API/Search");
const addressAPI = require("API/Address");
const postAPI = require("API/Post");
const store = require("Store/Store");
const userAPI = require("API/UserAPI");
const PAGE_SIZE = 10;
let dataChangePage = this._request.data;
let searchInput = this._request.searchInput || "";
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
this.order = ko.observable(1);
this.isShowEmpty = ko.observable(false);
let me = this;
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

this.resultSearch.subscribe(function (newValue) {
    if (newValue.length === 0) {
        me.isShowEmpty(true);
    } else {
        me.isShowEmpty(false);
    }
})

let page = 0;
let size = 2;

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

let subscribeMyTopic = (user_id) => {
    cordova.plugins.firebase.messaging.requestPermission({ forceShow: true }).then(function () {
        cordova.plugins.firebase.messaging.subscribe(`/topics/notification.user.${user_id}`).then((e) => {
            console.log(e);
        }).catch((e) => {
            console.log(e);
        })
    }).catch((e) => {
    });
}

this.afterBinding = () => {
    $('#search').val(searchInput)
    cordova.plugins.firebase.messaging.onMessage(function (payload) {
        setTimeout(() => {
            app.setPage("PostDetail", { id: payload.post_id });
        }, 1000);
    });

    cordova.plugins.firebase.messaging.onBackgroundMessage(function (payload) {
        setTimeout(() => {
            app.setPage("PostDetail", { id: payload.post_id });
        }, 1000);
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
    });

    userAPI.getInfo().then((res) => {
        localStorage.setItem("imageURL", res.data.avatar);
        localStorage.setItem("name", res.data.display_name);
        localStorage.setItem("email", res.data.email || "");
        localStorage.setItem("userId", res.data.user_id);
        localStorage.setItem("created_at", res.data.created_at);
        localStorage.setItem("phone", res.data.phone || "");
        localStorage.setItem("address", res.data.address || "Hồ Chí Minh");
        $('com-slider img')[0].src = res.data.avatar;
        $('com-slider .information-user p')[0].innerHTML = window.localStorage.getItem('name');
        subscribeMyTopic(res.data.user_id);
    }).catch((e) => {
        console.log(e);
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
        "location": document.getElementById("search").value,
        "order": this.order()
    }, page++).then((res) => {
        store.isShowLoading(false);
        size = Math.ceil(res.data.total / PAGE_SIZE);
        this.resultSearch.push(...res.data.hits.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
    }).catch((e) => {
        console.log(e);
    })
}

this.removePopupSuccess = () => {
    store.isShowBlank(false);
    $("#popup-success").removeClass("active");
    // Get name input checked
    this.order($("input[name='order']:checked").val());
}

this.getOrder = () => {
    $(`input[value='${this.order()}']`)[0].checked = true;
    $("#popup-success").addClass("active");
    store.isShowBlank(true);
}


this.changePageDetail = (data, event) => {
    //changePageDetail
    app.setPage("PostDetail", Object.assign(data, {
        location: $('#search').val()
    }));
}