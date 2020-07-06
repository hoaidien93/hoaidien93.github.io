define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");

    function APINotify() {
        AbstractAPI.call(this, {});

        this.getCurrentSettings = (str, page = 0) => {
            return this.send("GET", "/notification/setting/get", {
            });
        }

        this.update = (data) => {
            return this.send("POST", "/notification/setting/update", data);
        }
    }
    return new APINotify();
})

