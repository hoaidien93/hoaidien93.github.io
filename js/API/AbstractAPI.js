define([], function () {
    const ROOT_HOST = 'http://ec2-54-169-144-80.ap-southeast-1.compute.amazonaws.com:3000/';
    return class AbstractAPI {
        constructor() {
        }

        send(method, url, data) {
            return $.ajax({
                url: ROOT_HOST + 'login',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: 'huongnq',
                    password: 'string'
                }),
            });
        }
    }
})