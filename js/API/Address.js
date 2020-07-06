define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");

    function APIAddress() {
        AbstractAPI.call(this, {});

        this.getDistricts = () => {
            return this.send("GET", "/home/districts", {
            });
        }

        this.getWards = (id) => {
            return this.send("GET", `/home/wards?district_id=${id}`, {
            });
        }

        this.getRoomTypes = () => {
            return this.send("GET", `/home/room-types`, {
            });
        }

    }
    return new APIAddress();
})

