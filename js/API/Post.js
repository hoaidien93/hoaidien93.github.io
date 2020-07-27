define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");
    const SIZE = 10;

    function APIPost() {
        AbstractAPI.call(this, {});

        this.getMyPost = (page = 0) => {
            return this.send("POST", "/user/list-post", {
                page,
                size: SIZE
            });
        }

        this.getMyPin = (page = 0) => {
            return this.send("GET", "/user/list-user-pin", {
            });
        }

        this.pin = (id) => {
            return this.send("GET", `/user/add-user-pin?post_id=${id}`, {
            });
        }

        this.unpin = (id) => {
            return this.send("GET", `/user/un-user-pin?post_id=${id}`, {
            });
        }

        this.getPostDetail = (id, location = "") => {
            return this.send("POST", `/post/view-detail`, {
                post_id: id,
                location: location
            });
        }

        this.updateImage = (formData) => {
            return this.send("POST", "/post/upload-images", formData, {
                processData: false,
                contentType: 'multipart/form-data'
            });
        }

        this.createPost = (data) => {
            return this.send("POST", "/post/create", data, true);
        }

        this.updatePost = (data) => {
            return this.send("POST", "/post/update", data);
        }

        this.addComment = (post_id, content) => {
            return this.send("POST", "/post/comment/add", {
                post_id,
                content
            });
        }

        this.deletePost = (post_id) => {
            return this.send("POST", "/post/delete?post_id=" + post_id, {
            });
        }

        this.updateStatus = (post_id, status) => {
            return this.send("POST", "/post/update/status", {
                post_id,
                status
            })
        }

        this.report = (post_id, content) => {
            return this.send("POST", "/user/feedback", {
                post_id,
                content
            })
        }


    }
    return new APIPost();
})
