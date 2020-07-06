define(["API/Address","Store/Store","API/Post"],()=>({viewModel:function(){const addressAPI=require("API/Address"),store=require("Store/Store"),postAPI=require("API/Post");this.title=ko.observable(""),this.listDistrict=ko.observableArray([]),this.selectedDistrict=ko.observable({}),this.listWards=ko.observable({}),this.selectedWard=ko.observable({}),this.listRoomTypes=ko.observableArray([]),this.selectedRoomType=ko.observable({}),this.price=ko.observable(0),this.area=ko.observable(0),this.location=ko.observable(""),this.description=ko.observable(""),this.selectedDistrict.subscribe(e=>{e&&addressAPI.getWards(e).then(res=>{this.listWards(res.data)}).catch(e=>{console.log(e)})}),this.selectedWard.subscribe(e=>console.log(e)),addressAPI.getDistricts().then(res=>{this.listDistrict(res.data)}).catch(e=>{console.log(e)}),addressAPI.getRoomTypes().then(res=>{this.listRoomTypes(res.data)}).catch(e=>{console.log(e)}),this.publish=(()=>{if(checkFillAllData()){store.isShowLoading(!0);let formData=new FormData($("#form-post")[0]);postAPI.createPost(formData).then(res=>{store.isShowLoading(!1),showPopupSuccess()}).catch(e=>{showPopupFail(),console.log(e)})}else showPopupFail()}),this.removePopupFail=(()=>{$("#popup-fail").removeClass("active"),store.isShowBlank(!1)}),this.removePopupSuccess=(()=>{store.isShowBlank(!1),app.setPage("MyRoom")});let checkFillAllData=()=>(res=this.title()&&this.selectedDistrict()&&this.selectedWard()&&this.location()&&this.selectedRoomType()&&this.area()&&this.price()&&this.description()&&$("input[type=file]")[0].files.length>=5,res),showPopupFail=()=>{$("#popup-fail").addClass("active"),store.isShowBlank(!0)},showPopupSuccess=()=>{$("#popup-success").addClass("active"),store.isShowBlank(!0)}},template:'\n            <div id="post-page">\n    <com-slider></com-slider>\n    <com-headercontext></com-headercontext>\n    <div class="popup fail" id="popup-fail">\n        <div>Vui lòng điền đầy đủ thông tin</div>\n        <button class="btn-submit" style="padding: 7px 22px;" data-bind="event: {tap: removePopupFail}">OK</button>\n    </div>\n    <div class="popup success" id="popup-success">\n        <div>Đăng bài thành công</div>\n        <button class="btn-submit" style="padding: 7px 22px;" data-bind="event: {tap: removePopupSuccess}">OK</button>\n    </div>\n    <div class="body-content">\n        <h3 class="header-title">Thêm bài đăng</h3>\n        <form class="content-wrapper" id="form-post">\n            <div class="row">\n                <div class="title">Tiêu đề</div>\n                <div class="content">\n                    <input name="title" name="title" placeholder="Tiêu đề bài đăng" data-bind="textInput: title">\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Quận</div>\n                <div class="content">\n                    <select name="district_id" data-bind="\n                            options: listDistrict,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedDistrict\n                            ">\n\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Phường</div>\n                <div class="content">\n                    <select name="ward_id" data-bind="\n                            options: listWards,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedWard\n                    ">\n\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Đường</div>\n                <div class="content">\n                    <textarea data-bind="textInput: location" name="location"></textarea>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Loại phòng</div>\n                <div class="content">\n                    <select name="room_type_id" data-bind="\n                            options: listRoomTypes,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedRoomType\n                    ">\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Diện tích</div>\n                <div class="content">\n                    <input type="text" id="title" placeholder="Đơn vị (m²)" name="area" data-bind="textInput: area">\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Giá tiền</div>\n                <div class="content">\n                    <input type="text" name="price" placeholder="Đơn vị (VNĐ)" data-bind="textInput: price">\n                </div>\n\n            </div>\n            <div class="row">\n                <div class="title">Ghi chú</div>\n                <div class="content">\n                    <textarea data-bind="textInput: description" name="description"></textarea>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Ảnh chi tiết</div>\n                <div class="content">\n                    <input type="file" name="files" accept="image/*" multiple="multiple" />\n                </div>\n            </div>\n            <div class="row">\n                <div class="title"></div>\n                <div class="note">* Tối thiểu 5 hình ảnh</div>\n            </div>\n    </div>\n    <div class="btn-wrapper">\n        <button class="btn-submit" data-bind="event: {tap: publish}">Đăng bài</button>\n    </div>\n    </form>\n</div>\n        '}));