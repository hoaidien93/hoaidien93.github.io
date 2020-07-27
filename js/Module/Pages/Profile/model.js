const store = require("Store/Store");
const userAPI = require("API/UserAPI")
this.avatar = localStorage.getItem("imageURL");
this.name = localStorage.getItem("name");
this.location = localStorage.getItem("address");
this.email = localStorage.getItem("email") || "Chưa cập nhật";
let dateJoin = new Date(+localStorage.getItem("created_at"));
this.phone = localStorage.getItem("phone") || "Chưa cập nhật";
this.dateJoin = `Đã tham gia Tháng ${dateJoin.getMonth()} năm ${dateJoin.getFullYear()}`;
let isChangeImage = false;
let updateInfo = {};

this.update = () => {
    if (isChangeImage) {
        store.isShowLoading(true);
        if (Object.keys(updateInfo).length === 0) {
            let formData = new FormData($('#updateAvatar')[0]);
            userAPI.updateAvatar(formData).then((res) => {
                if (res.code == 0) {
                    localStorage.setItem("imageURL", res.data);
                    updateSlider(res.data);
                }
                store.isShowLoading(false);
                showPopupSuccess();
            }).catch((e) => {
                console.log(e);
            })
        }
        else {
            Promise.all([
                userAPI.updateAvatar(formData),
                userAPI.updateInfo(updateInfo)
            ]).then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
        }
    }
    else {
        if (Object.keys(updateInfo).length !== 0) {
            userAPI.updateInfo(updateInfo).then((res) => {
                if (res.code == 0) {
                    //localStorage.setItem("imageURL", res.data);
                    updateInfoLocal(updateInfo);
                }
                console.log(res);
                store.isShowLoading(false);
                showPopupSuccess();
            }).catch((e) => {
                console.log(e);
            })
        }
    }
}

let updateInfoLocal = (infoLocal) => {
    infoLocal['name'] = infoLocal['display_name'];
    delete infoLocal['display_name'];

    Object.keys(infoLocal).forEach((e) => {
        window.localStorage.setItem(e, infoLocal[e]);
    });
    $('com-slider .information-user p')[0].innerHTML = window.localStorage.getItem('name');
}

this.afterBinding = () => {
    $("#myInputFile").change((e) => {
        let selectedFile = e.target.files[0];
        let imgTag = document.getElementById("avatar");
        let reader = new FileReader();
        console.log(e);
        reader.onload = function (event) {
            imgTag.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
        isChangeImage = true;
    });


    $('.img-edit').on('click', (e) => {
        let parent = e.currentTarget.parentNode;
        let value = parent.querySelector('span').innerHTML;
        parent.querySelector('input').value = value;
        parent.classList.add('isEdit');
    });

    $('.icon-check').on('click', (e) => {
        let parent = e.currentTarget.parentNode
        parent.classList.remove('isEdit');
        let inputUpdate = parent.querySelector('input');
        parent.querySelector('span').innerHTML = inputUpdate.value;
        let fieldUpdate = inputUpdate.getAttribute('name');
        updateInfo[fieldUpdate] = inputUpdate.value;
    });
}

this.removePopupSuccess = () => {
    store.isShowBlank(false);
    $("#popup-success").removeClass("active");
}

let showPopupSuccess = () => {
    $("#popup-success").addClass("active");
    store.isShowBlank(true);
}

let updateSlider = (src) => {
    $('com-slider img')[0].src = src;
}