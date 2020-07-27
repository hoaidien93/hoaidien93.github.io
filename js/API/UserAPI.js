define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");

    function UserAPI() {
        AbstractAPI.call(this, {});

        this.getInfo = () => {
            return this.send("GET", `/user/get-info`, {
            });
        }

        this.getMyNotify = () => {
            return this.send("GET", `/notification/get`, {
            });
        }

        this.updateAvatar = (data) => {
            return this.send("POST", "/user/upload-avatar", data, true);
        }

        this.updateInfo = (data) => {
            return this.send("POST", `/user/update`, data);
        }

        this.readNotify = (id) => {
            return this.send("GET", `/notification/update-read-at?notification_id=${id}`, {
            });
        }
    }

    return new UserAPI();
})