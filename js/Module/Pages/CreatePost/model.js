const addressAPI = require("API/Address");
const store = require("Store/Store");
const postAPI = require("API/Post");

this.title = ko.observable("");
this.listDistrict = ko.observableArray([]);
this.selectedDistrict = ko.observable({});
this.listWards = ko.observable({});
this.selectedWard = ko.observable({});
this.listRoomTypes = ko.observableArray([]);
this.selectedRoomType = ko.observable({});
this.price = ko.observable(0);
this.area = ko.observable(0);
this.location = ko.observable("");
this.description = ko.observable("");
this.selectedDistrict.subscribe((e) => {
    if (e) {
        addressAPI
            .getWards(e)
            .then((res) => {
                this.listWards(res.data);
            })
            .catch((e) => { console.log(e) });
    }
})
this.selectedWard.subscribe((e) => console.log(e));
addressAPI.getDistricts().then((res) => {
    this.listDistrict(res.data);
}).catch((e) => {
    console.log(e);
})
addressAPI.getRoomTypes().then((res) => {
    this.listRoomTypes(res.data);
}).catch((e) => {
    console.log(e);
});
this.publish = () => {
    if (!checkFillAllData()) showPopupFail();
    else {
        store.isShowLoading(true);
        let formData = new FormData($('#form-post')[0]);
        postAPI.createPost(formData).then((res) => {
            store.isShowLoading(false);
            showPopupSuccess();
        }).catch((e) => {
            showPopupFail();
            console.log(e);
        })
    }
}

this.removePopupFail = () => {
    $("#popup-fail").removeClass("active");
    store.isShowBlank(false);
}

this.removePopupSuccess = () => {
    store.isShowBlank(false);
    app.setPage("MyRoom");
}

let checkFillAllData = () => {
    res = this.title() && this.selectedDistrict() && this.selectedWard() && this.location() && this.selectedRoomType() && this.area() && this.price() && this.description() && ($("input[type=file]")[0].files.length >= 5);
    return res;

}

let showPopupFail = () => {
    $("#popup-fail").addClass("active");
    store.isShowBlank(true);
}

let showPopupSuccess = () => {
    $("#popup-success").addClass("active");
    store.isShowBlank(true);
}