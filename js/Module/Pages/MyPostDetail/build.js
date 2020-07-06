define(["Store/Store","API/Address","API/Post"],()=>({viewModel:function(){const addressAPI=require("API/Address"),store=require("Store/Store"),postAPI=require("API/Post");let request=this._request;this.title=ko.observable(request.title||""),this.listDistrict=ko.observableArray([]);let isFirstTime=!0;this.selectedDistrict=ko.observable(request.district_id),this.listWards=ko.observable([]),this.selectedWard=ko.observable(1),this.listRoomTypes=ko.observableArray([]),this.selectedRoomType=ko.observable(1),this.price=ko.observable(request.price||0),this.area=ko.observable(request.area||0),this.location=ko.observable(request.location||""),this.description=ko.observable(request.description||""),this.status=ko.observable("Cập nhật thành công"),this.isOpenStatus=ko.observable(!0),this.isOpenStatus.subscribe(newValue=>{newValue?$("input, select, textarea").not(".disabled").prop("disabled",!1):$("input, select, textarea").attr("disabled",""),store.isShowLoading(!0),postAPI.updateStatus(request.id,+newValue).then(res=>{console.log(res),this.status("Cập nhật thành công"),store.isShowLoading(!1),showPopupSuccess()}).catch(e=>{console.log(e)})}),this.selectedDistrict.subscribe(e=>{isFirstTime||e&&addressAPI.getWards(e).then(res=>{this.listWards(res.data)}).catch(e=>{console.log(e)})});let updateFirstTimeWard=e=>{addressAPI.getWards(e).then(res=>{this.listWards(res.data),this.selectedWard(request.ward_id),isFirstTime=!1}).catch(e=>{console.log(e)})};addressAPI.getDistricts().then(res=>{this.listDistrict(res.data),this.selectedDistrict(request.district_id),updateFirstTimeWard(request.district_id)}).catch(e=>{console.log(e)}),addressAPI.getRoomTypes().then(res=>{this.listRoomTypes(res.data),this.selectedRoomType(request.room_type_id)}).catch(e=>{console.log(e)}),this.update=(()=>{store.isShowLoading(!0);let dataUpdate={post_id:request.id,title:this.title(),description:this.description(),price:this.price()};postAPI.updatePost(dataUpdate).then(res=>{this.status("Cập nhật thành công"),store.isShowLoading(!1),showPopupSuccess()}).catch(e=>{console.log(e)})}),this.deletePost=(()=>{store.isShowLoading(!0),postAPI.deletePost(request.id).then(res=>{this.status("Xóa bài đăng thành công"),store.isShowLoading(!1),showPopupSuccess()}).catch(e=>{console.log(e)})}),this.removePopupSuccess=(()=>{store.isShowBlank(!1),app.setPage("MyRoom")});let showPopupSuccess=()=>{$("#popup-success").addClass("active"),store.isShowBlank(!0)}},template:'\n            <div id="post-page">\n    <com-slider></com-slider>\n    <com-headercontext></com-headercontext>\n    <div class="popup success" id="popup-success">\n        <div data-bind="text: status"></div>\n        <button class="btn-submit" style="padding: 7px 22px;" data-bind="event: {tap: removePopupSuccess}">OK</button>\n    </div>\n    <div class="btn-toggle">\n        <label class="switch">\n            <input type="checkbox" data-bind="checked: isOpenStatus">\n            <span class="slider round"></span>\n        </label>\n    </div>\n    <form class="body-content" id="form">\n        <h3 class="header-title">Cập nhật bài đăng</h3>\n        <div class="content-wrapper">\n            <div class="row">\n                <div class="title">Tiêu đề</div>\n                <div class="content">\n                    <input type="text" id="title" placeholder="Tiêu đề bài đăng" data-bind="textInput: title">\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Quận</div>\n                <div class="content">\n                    <select name="district" data-bind="\n                            options: listDistrict,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedDistrict\n                            " disabled class="disabled">\n\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Phường</div>\n                <div class="content">\n                    <select name="ward" data-bind="\n                            options: listWards,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedWard\n                    " disabled class="disabled">\n\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Đường</div>\n                <div class="content">\n                    <textarea data-bind="textInput: location" disabled class="disabled"></textarea>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Loại phòng</div>\n                <div class="content">\n                    <select name="typeRoom" data-bind="\n                            options: listRoomTypes,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedRoomType\n                    " disabled class="disabled">\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Diện tích</div>\n                <div class="content">\n                    <input type="text" id="title" placeholder="Đơn vị (m²)" name="area" data-bind="textInput: area"\n                        disabled class="disabled">\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Giá tiền</div>\n                <div class="content">\n                    <input type="text" id="title" placeholder="Đơn vị (VNĐ)" data-bind="textInput: price">\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Ghi chú</div>\n                <div class="content">\n                    <textarea data-bind="textInput: description"></textarea>\n                </div>\n            </div>\n        </div>\n    </form>\n    <div class="btn-wrapper">\n        <button class="btn-submit delete" data-bind="event: {tap: deletePost}">Xóa</button>\n        <button class="btn-submit" data-bind="event: {tap: update}">Cập Nhật</button>\n    </div>\n</div>\n        '}));