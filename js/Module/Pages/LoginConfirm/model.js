const RegisterAPI = require("API/Register");
const Store = require("Store/Store");
this.phoneNumber = this._request.phoneNumber;
let isEnableButton = false;
let itv;
this.parsePhoneNumber = this.phoneNumber.replace(/^\+84/, "0");

this.showSendAgain = ko.observable(false);

this.backPage = () => {
    if (itv) clearInterval(itv);
    app.backTo();
}

this.afterBinding = () => {
    $(".mm-number-input-item > input").on('input', function (event) {
        let length = this.value.length;
        if (length > 1 || event.originalEvent.data === "e") {
            if (event.originalEvent.data) {
                this.value = event.originalEvent.data;
            }
        }
        if (event.originalEvent.data && event.originalEvent.data !== "e") {
            let nextElement = this.parentNode.nextElementSibling;
            if (nextElement) nextElement.querySelector('input').focus();
        }
        let code = getCode();
        if (code.length >= 6) {
            $('.btn-continue').css({ 'background-color': '#003780', 'color': 'white' });
            isEnableButton = true;
        }
        else {
            $('.btn-continue').css({ 'background-color': '#fff', 'color': '#000' })
            isEnableButton = false;
        }
    });

    initCounter();
}

let initCounter = () => {
    let counter = 30;
    itv = setInterval(() => {
        document.getElementById("counter").innerHTML = --counter;
        if (counter === 0) {
            clearInterval(itv);
            this.showSendAgain(true);
        }
    }, 1000);
}

this.sendAgain = () => {
    Store.isShowLoading(true);
    RegisterAPI.getPhoneCode(this.phoneNumber).then((res) => {
        Store.isShowLoading(false);
        if (res.code == 0) {
            initCounter();
            this.showSendAgain(false);
        }
    }).catch((e) => {
        Store.isShowLoading(false);
        console.log(e);
    })
}

let getCode = () => {
    let code = "";
    $(".mm-number-input-item > input").each(function (index, e) {
        code += e.value;
    })
    return code.trim();
}

this.confirm = () => {
    if (isEnableButton) {
        clearInterval(itv);
        let code = getCode();
        Store.isShowLoading(true);
        RegisterAPI.phoneLogin(this.phoneNumber, code).then((res) => {
            if (res.code == 0) {
                Store.isShowLoading(false);
                localStorage.setItem("appToken", res.data);
                app.setPage("Home");
            }
        }).catch((e) => {
            Store.isShowLoading(false);
            console.log(e);
        })
    }
}

