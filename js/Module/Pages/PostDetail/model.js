const postAPI = require("API/Post");
let request = this._request;
this.countImage = ko.observable("");
this.isShowImageView = ko.observable(false);
this.listComment = ko.observableArray([]);
let fullComment = []
this.myComment = ko.observable("");

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
});

postAPI.getPostDetail(request.id).then((res) => {
    let data = res.data;
    console.log(data);
    data.dateCreate = new Date(data.created_at).toLocaleDateString();
    let length = data.images.length;
    if (length > 5) {
        this.countImage("+" + (length - 5));
    }
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
    let username = 'hoaidien';
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