define([], function () {
    const ROOT_HOST = 'http://ec2-54-169-144-80.ap-southeast-1.compute.amazonaws.com:3000';
    return function AbstractAPI() {
        this.send = (method, url, data, isFormData = false) => {
            const token = window.localStorage.getItem("appToken") || "";
            if (isFormData) {
                return $.ajax(Object.assign({
                    url: ROOT_HOST + url,
                    enctype: 'multipart/form-data',
                    method: method,
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    data: data,
                    contentType: false,
                    processData: false
                }));
            }
            else {
                if (method === "POST")
                    return $.ajax(Object.assign({
                        url: ROOT_HOST + url,
                        method: method,
                        headers: {
                            Authorization: "Bearer " + token
                        },
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                    }));
                else {
                    return $.ajax({
                        url: ROOT_HOST + url,
                        method: method,
                        headers: {
                            Authorization: "Bearer " + token
                        },
                        contentType: 'application/json',
                    });
                }
            }
        }
    }
})