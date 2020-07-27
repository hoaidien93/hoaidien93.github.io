define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");

    function Register() {
        AbstractAPI.call(this, {});

        this.getPhoneCode = (phoneNumber) => {
            return this.send("POST", `/phone-code`, {
                "phone_number": phoneNumber
            });
        }

        this.phoneLogin = (phoneNumber, code) => {
            return this.send("POST", `/phone-login`, {
                "phone_number": phoneNumber,
                "code": code
            });
        }

    }
    return new Register();
})

