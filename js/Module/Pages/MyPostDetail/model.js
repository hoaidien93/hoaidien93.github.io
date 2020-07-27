const addressAPI = require("API/Address");
const store = require("Store/Store");
const postAPI = require("API/Post");
let request = this._request;
console.log(request);
this.title = ko.observable(request.title || "");
this.listDistrict = ko.observableArray([]);
let isFirstTime = true;
this.selectedDistrict = ko.observable(request.district_id);
this.listWards = ko.observable([]);
this.selectedWard = ko.observable(1);
this.listRoomTypes = ko.observableArray([]);
this.selectedRoomType = ko.observable(1);
this.price = ko.observable(request.price || 0);
this.area = ko.observable(request.area || 0);
this.location = ko.observable(request.location || "");
this.description = ko.observable(request.description || "");
this.status = ko.observable("Cập nhật thành công");
this.isOpenStatus = ko.observable(!!request.status);

this.afterBinding = ()=>{
    if(!request.status){
        $('input, select, textarea').not('.disabled').not(`input[type="checkbox"]`).prop("disabled", true)
    }
}
this.isOpenStatus.subscribe((newValue) => {
    if(!newValue){
        $('input, select, textarea').attr('disabled',"")
    }else{
        $('input, select, textarea').not('.disabled').prop("disabled", false)
    }
    store.isShowLoading(true);
    postAPI.updateStatus(request.id,+newValue).then((res)=>{
        this.status("Cập nhật thành công");
        store.isShowLoading(false);
        showPopupSuccess();
    }).catch((e)=>{
        console.log(e);
    })
})
this.selectedDistrict.subscribe((e) => {
    if (!isFirstTime) {
        if (e) {
            addressAPI
                .getWards(e)
                .then((res) => {
                    this.listWards(res.data);
                })
                .catch((e) => { console.log(e) });
        }
    }
})
let updateFirstTimeWard = (e) => {
    addressAPI
        .getWards(e)
        .then((res) => {
            this.listWards(res.data);
            this.selectedWard(request.ward_id);
            isFirstTime = false;
        })
        .catch((e) => { console.log(e) });
}
addressAPI.getDistricts().then((res) => {
    this.listDistrict(res.data);
    this.selectedDistrict(request.district_id);
    updateFirstTimeWard(request.district_id);
}).catch((e) => {
    console.log(e);
});



addressAPI.getRoomTypes().then((res) => {
    this.listRoomTypes(res.data);
    this.selectedRoomType(request.room_type_id)
}).catch((e) => {
    console.log(e);
});

this.update = () => {
    store.isShowLoading(true);
    let dataUpdate = {
        post_id: request.id,
        title: this.title(),
        description: this.description(),
        price: this.price()
    }
    postAPI.updatePost(dataUpdate).then((res) => {
        this.status("Cập nhật thành công");
        store.isShowLoading(false);
        showPopupSuccess();
    }).catch((e) => {
        console.log(e);
    });
}
this.deletePost = () => {
    store.isShowLoading(true);
    postAPI.deletePost(request.id).then((res) => {
        this.status("Xóa bài đăng thành công");
        store.isShowLoading(false);
        showPopupSuccess();
    }).catch((e) => {
        console.log(e);
    });
}

this.removePopupSuccess = () => {
    store.isShowBlank(false);
    app.setPage("MyRoom");
}

let showPopupSuccess = () => {
    $("#popup-success").addClass("active");
    store.isShowBlank(true);
}