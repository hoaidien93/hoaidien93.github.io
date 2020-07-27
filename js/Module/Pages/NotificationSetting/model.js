const nofifyAPI = require("API/Notify");
const addressAPI = require("API/Address");
const store = require("Store/Store");
this.isOpenNoti = ko.observable();
this.currentSetting = ko.observable({});
this.listDistrict = ko.observableArray([]);
this.selectedDistrict = ko.observable(0);
this.listWards = ko.observableArray([]);
this.selectedWard = ko.observable(0);
this.selectedPrice = ko.observable(0);
this.selectedArea = ko.observable(0);
let statusFirstTime = true;

let isFirstTime = true;
this.isOpenNoti.subscribe((newValue) => {
    if (statusFirstTime) {
        statusFirstTime = false;
        if(!newValue){
            $('select').prop("disabled", true);
        }
    } else {
        nofifyAPI.update({
            enable: +newValue
        }).then((res) => {
            showPopupSuccess();
            if(!newValue){
                $('select').prop("disabled", true);
            }else{
                $('select').prop("disabled", false)
            }
        }).catch((e) => {
            console.log(e)
        })
    }
});

nofifyAPI.getCurrentSettings().then((res) => {
    this.isOpenNoti(!!res.data.enable);
    this.currentSetting(res.data);
    getDistrict();
    updatePrice(this.currentSetting().min_price, this.currentSetting().max_price);
    updateArea(this.currentSetting().min_area, this.currentSetting().max_area);
}).catch((e) => {
    console.log(e);
})

let updatePrice = (min, max) => {
    if (min === 0) {
        if (max === 0) {
            this.selectedPrice(0);
        }
        else {
            this.selectedPrice(1);
        }
    } else {
        if (min === 1000000) {
            this.selectedPrice(2);
        }

        if (min === 2000000) {
            this.selectedPrice(3);
        }

        if (min === 5000000) {
            this.selectedPrice(4);
        }
    }
}

let updateArea = (min, max) => {
    if (min === 0) {
        if (max === 0) {
            this.selectedArea(0);
        }
        else {
            this.selectedArea(1);
        }
    } else {
        if (min === 20) {
            this.selectedArea(2);
        }

        if (min === 40) {
            this.selectedArea(3);
        }
    }
}


let getDistrict = () => {
    addressAPI.getDistricts().then((res) => {
        let listDiscict = [{
            id: 0,
            name: 'Quận'
        }].concat(res.data);
        this.listDistrict(listDiscict);
        this.selectedDistrict(this.currentSetting().district_id);
        updateFirstTimeWard(this.currentSetting().district_id);
    }).catch((e) => {
        console.log(e);
    })
}

this.selectedDistrict.subscribe((e) => {
    if (e) {
        if (!isFirstTime) {
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


let updateFirstTimeWard = (e) => {
    addressAPI
        .getWards(e)
        .then((res) => {
            let listWards = [{
                id: 0,
                name: 'Phường'
            }].concat(res.data);
            this.listWards(listWards);
            this.selectedWard(this.currentSetting().ward_id);
            isFirstTime = false;
        })
        .catch((e) => { console.log(e) });
}

let convertArea = function (area) {
    let res = {
        min_area: 0,
        max_area: 0
    };
    if (area == 1) {
        res.max_area = 20;
    }
    if (area == 2) {
        res.min_area = 20;
        res.max_area = 40;
    }
    if (area == 3) {
        res.min_area = 40;
        res.max_area = 1000;
    }
    return res;
}

let convertPrice = function (price) {
    let res = {
        min_price: 0,
        max_price: 0
    };
    if (price == 1) {
        res.max_price = 1000000;
    }
    if (price == 2) {
        res.min_price = 1000000;
        res.max_price = 2000000;
    }
    if (price == 3) {
        res.min_price = 2000000;
        res.max_price = 5000000;
    }
    if (price == 4) {
        res.min_price = 5000000;
        res.max_price = 100000000;
    }
    return res;
}

this.updateNoti = () => {
    store.isShowLoading(false);
    let objArea = convertArea(this.selectedArea());
    let objPrice = convertPrice(this.selectedPrice());
    let dataChange = {
        min_area: objArea.min_area,
        max_area: objArea.max_area,
        min_price: objPrice.min_price,
        max_price: objPrice.max_price,
        district_id: this.selectedDistrict(),
        ward_id: this.selectedWard(),
    };

    nofifyAPI.update(dataChange).then((res) => {
        showPopupSuccess();
    }).catch((e) => {
        console.log(e)
    })
}

let showPopupSuccess = () => {
    $("#popup-success").addClass("active");
    store.isShowBlank(true);
}

this.removePopupSuccess = () => {
    store.isShowBlank(false);
    app.setPage("Home");
}

