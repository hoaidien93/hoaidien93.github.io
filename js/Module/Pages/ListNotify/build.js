define(["API/UserAPI"],()=>({viewModel:function(){const userAPI=require("API/UserAPI");this.temp=ko.observableArray([]),this.isShowEmpty=ko.observable(!1),userAPI.getMyNotify().then(res=>{console.log(res),this.temp(res.data.hits.map(e=>(1===e.type&&(e.imgSrc="./img/comment-icon.png"),0===e.type&&(e.imgSrc="./img/post-icon.png"),3===e.type&&(e.imgSrc="./img/warning.png"),e)))}).catch(e=>{console.log(e)}),this.temp.subscribe(newValue=>{0===newValue.length?this.isShowEmpty(!0):this.isShowEmpty(!1)}),this.directPage=((data,event)=>{3===data.type?window.open("tel:+8434531333"):(app.setPage("PostDetail",{id:data.post_id}),0==data.read_at&&userAPI.readNotify(data.id).then(res=>{console.log(res)}).catch(e=>{console.log(e)}))})},template:'\n            <div id="list-notify">\n    <com-slider></com-slider>\n    <com-headercontext></com-headercontext>\n    <div class="body-content">\n        <div class="empty-content" data-bind="visible: isShowEmpty">Hiện không có thông báo nào</div>\n        <div class="search-result" data-bind="foreach: temp">\n            <div class="content-notify"\n                data-bind="event: {tap: $root.directPage}, style: {\'background-color\': read_at !== 0 ? \'#fff\': \'#d3d1d180\'}"\n            >\n                <div class="left">\n                    <img data-bind="attr: {src: imgSrc}">\n                </div>\n                <div class="right">\n                    <div data-bind="text: message">\n                    </div>\n                    <div class="date" data-bind="convertTime: created_at">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n        '}));