const postAPI = require("API/Post");
const store = require("Store/Store");
let request = this._request;
this.countImage = ko.observable("");
this.isShowImageView = ko.observable(false);
this.listComment = ko.observableArray([]);
let fullComment = []
this.myComment = ko.observable("");
this.content = ko.observable("");

this.showMore = ko.computed(() => {
    return this.listComment().length < fullComment.length;
});

this.pagingImage = ko.observable({
    current: 0,
    max: 7
});

this.postDetail = ko.observable({
    title: "",
    location: "",
    phone: "",
    description: "",
    area: "",
    dateCreate: "",
    price: 0,
    images: [],
    avatar_user_post: "",
    use_post: "",
    phoneConvert: ""
});

postAPI.getPostDetail(request.id, request.location).then((res) => {
    let data = res.data;
    data.dateCreate = new Date(data.created_at).toLocaleDateString();
    let length = data.images.length;
    if (length > 5) {
        this.countImage("+" + (length - 5));
    }
    data.phoneConvert = (data.phone || "").replace(/^0/g, '+84');
    data.phoneConvert = "tel:" + data.phoneConvert;
    this.pagingImage().max = length;
    this.pagingImage(this.pagingImage());
    this.postDetail(data);
    fullComment = data.comment_infos;
    this.listComment(data.comment_infos.filter((e, index) => {
        return (index <= 2);
    }));
}).catch((e) => {
    console.log(res);
});

this.showMoreAction = () => {
    let len = this.listComment().length;
    this.listComment.push(...fullComment.filter((e, index) => {
        return (index >= len && index < len + 5);
    }));
}

this.favoritePost = () => {
    store.isShowLoading(true);
    postAPI.pin(request.id).then((res) => {
        store.isShowLoading(false);
    }).catch((e) => {
        store.isShowLoading(false);
        console.log(e);
    })
}

this.showImage = (index) => {
    this.isShowImageView(true);
    updateIndexImage(++index);
}
let updateIndexImage = (index) => {
    let desIndex = index;
    if (index <= 1) desIndex = 1;
    if (index >= this.pagingImage().max) desIndex = this.pagingImage().max;
    this.pagingImage().current = desIndex;
    this.pagingImage(this.pagingImage());
}
this.closeImageView = () => {
    this.isShowImageView(false);
}
this.changeIndexImage = (data, event) => {
    let currentIndex = this.pagingImage().current;
    switch (event.detail.direction) {
        case "left":
            updateIndexImage(++currentIndex);
            break;
        case "right":
            updateIndexImage(--currentIndex);
            break;
    }
}

this.addComment = () => {
    let username = localStorage.getItem('name');
    const AVATAR = "https://huongnq.s3-ap-southeast-1.amazonaws.com/avatars/defaut.jpg";
    postAPI.addComment(request.id, this.myComment()).then((res) => {
        if (res.code == 0) {
            //Clear input
            this.listComment.unshift({
                avatar_uer_comment: AVATAR,
                user_comment: username,
                content: this.myComment(),
                created_at: Date.now()
            });
            this.myComment("");
        }
    }).catch((e) => {
        console.log(e);
    })
}

this.reportPost = () => {
    showPopupSuccess();
}

let showPopupSuccess = () => {
    $("#popup-success").addClass("active");
    this.content(`
        <h4>Nội dung báo xấu</h4>
        <textarea id="reportText"></textarea>
    `)
    store.isShowBlank(true);
}

this.removePopupSuccess = () => {
    store.isShowLoading(true);
    let reportText = $('#reportText').val();
    postAPI.report(request.id, reportText).then((res) => {
        store.isShowLoading(false);
        store.isShowBlank(false);
        app.setPage("Home");
    }).catch((e) => {
        console.log(e);
    })
}

this.cancel = () => {
    store.isShowBlank(false);
    $("#popup-success").removeClass("active");
}