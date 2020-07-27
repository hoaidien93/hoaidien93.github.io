const RegisterAPI = require("API/Register");
const Store = require("Store/Store");
let enableButton = false;

this.afterBinding = () => {
    if (cordova.platformId === "browser") {
        document.getElementById("signInAndroid").style.display = "none";
    }
    if (cordova.platformId === "android") {
        document.getElementById("signInBrowser").style.display = "none";
    }
}

this.phoneNumber = ko.observable("");

this.phoneNumber.subscribe((value) => {
    if (isValidPhoneNumber(value)) {
        $('.btn-continue').css({ 'background-color': '#003780', 'color': 'white' });
        enableButton = true;
    } else {
        $('.btn-continue').css({ 'background-color': '#fff', 'color': '#000' });
        enableButton = false;
    }
});

this.getCode = () => {
    if (enableButton) {
        Store.isShowLoading(true);
        let convertedNumber = convertPhoneNumber(this.phoneNumber());
        console.log(convertedNumber);

        RegisterAPI.getPhoneCode(convertedNumber).then((res) => {
            Store.isShowLoading(false);
            if (res.code == 0) {
                app.setPage("LoginConfirm", { phoneNumber: convertedNumber });
            }
            console.log(res);
        }).catch((e) => {
            Store.isShowLoading(false);
            console.log(e);
        })
    }
}

let isValidPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 10) {
        return /^0/.test(phoneNumber);
    }
    return false;
}

let convertPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/^0/g, "+84");
}