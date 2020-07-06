define(["API/Notify","API/Address"],()=>({viewModel:function(){const nofifyAPI=require("API/Notify"),addressAPI=require("API/Address"),store=require("Store/Store");this.isOpenNoti=ko.observable(!0),this.currentSetting=ko.observable({}),this.listDistrict=ko.observableArray([]),this.selectedDistrict=ko.observable(0),this.listWards=ko.observableArray([]),this.selectedWard=ko.observable(0),this.selectedPrice=ko.observable(0),this.selectedArea=ko.observable(0);let isFirstTime=!0;this.isOpenNoti.subscribe(newValue=>{console.log(newValue),nofifyAPI.update({enable:+newValue}).then(res=>{showPopupSuccess()}).catch(e=>{console.log(e)})}),nofifyAPI.getCurrentSettings().then(res=>{this.currentSetting(res.data),getDistrict(),updatePrice(this.currentSetting().min_price,this.currentSetting().max_price),updateArea(this.currentSetting().min_area,this.currentSetting().max_area)}).catch(e=>{console.log(e)});let updatePrice=(min,max)=>{0===min?0===max?this.selectedPrice(0):this.selectedPrice(1):(1e6===min&&this.selectedPrice(2),2e6===min&&this.selectedPrice(3),5e6===min&&this.selectedPrice(4))},updateArea=(min,max)=>{0===min?0===max?this.selectedArea(0):this.selectedArea(1):(20===min&&this.selectedArea(2),40===min&&this.selectedArea(3))},getDistrict=()=>{addressAPI.getDistricts().then(res=>{let listDiscict=[{id:0,name:"Quận"}].concat(res.data);this.listDistrict(listDiscict),this.selectedDistrict(this.currentSetting().district_id),updateFirstTimeWard(this.currentSetting().district_id)}).catch(e=>{console.log(e)})};this.selectedDistrict.subscribe(e=>{e?isFirstTime||addressAPI.getWards(e).then(res=>{let listWards=[{id:0,name:"Phường"}].concat(res.data);this.listWards(listWards)}).catch(e=>{console.log(e)}):this.listWards([{id:0,name:"Phường"}])});let updateFirstTimeWard=e=>{addressAPI.getWards(e).then(res=>{let listWards=[{id:0,name:"Phường"}].concat(res.data);this.listWards(listWards),this.selectedWard(this.currentSetting().ward_id),isFirstTime=!1}).catch(e=>{console.log(e)})};this.updateNoti=(()=>{store.isShowLoading(!1);let objArea=function(area){let res={min_area:0,max_area:0};return 1==area&&(res.max_area=20),2==area&&(res.min_area=20,res.max_area=40),3==area&&(res.min_area=40,res.max_area=1e3),res}(this.selectedArea()),objPrice=function(price){let res={min_price:0,max_price:0};return 1==price&&(res.max_price=1e6),2==price&&(res.min_price=1e6,res.max_price=2e6),3==price&&(res.min_price=2e6,res.max_price=5e6),4==price&&(res.min_price=5e6,res.max_price=1e8),res}(this.selectedPrice()),dataChange={min_area:objArea.min_area,max_area:objArea.max_area,min_price:objPrice.min_price,max_price:objPrice.max_price,district_id:this.selectedDistrict(),ward_id:this.selectedWard()};nofifyAPI.update(dataChange).then(res=>{showPopupSuccess()}).catch(e=>{console.log(e)})});let showPopupSuccess=()=>{$("#popup-success").addClass("active"),store.isShowBlank(!0)};this.removePopupSuccess=(()=>{store.isShowBlank(!1),$("#popup-success").removeClass("active")})},template:'\n            <div id="notify-page">\n    <com-slider></com-slider>\n    <com-headercontext></com-headercontext>\n    <div class="popup success" id="popup-success">\n        <div>Cập nhật thành công</div>\n        <button class="btn-submit" style="padding: 7px 22px;" data-bind="event: {tap: removePopupSuccess}">OK</button>\n    </div>\n    <div class="body-content">\n        <h3 class="header-title">Thông tin cấu hình</h3>\n        <div class="btn-toggle">\n            <label class="switch">\n                <input type="checkbox" data-bind="checked: isOpenNoti">\n                <span class="slider round"></span>\n            </label>\n        </div>\n        <div class="content-wrapper">\n            <div class="row">\n                <div class="left">\n                    Giá\n                </div>\n                <div class="right">\n                    <select name="price-range" data-bind="value: selectedPrice">\n                        <option value="0">Khoảng giá</option>\n                        <option value="1">Dưới 1.000.000</option>\n                        <option value="2">1.000.000 - 2.000.000</option>\n                        <option value="3">2.000.000 - 5.000.000</option>\n                        <option value="4">Trên 5.000.000</option>\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="left">\n                    Quận\n                </div>\n                <div class="right">\n                    <select name="district_id" data-bind="\n                        options: listDistrict,\n                        optionsText: function(item){return item.name},\n                        optionsValue: function(item){return item.id},\n                        value: selectedDistrict">\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="left">\n                    Phường\n                </div>\n                <div class="right">\n                    <select name="ward_id" data-bind="\n                        options: listWards,\n                        optionsText: function(item){return item.name},\n                        optionsValue: function(item){return item.id},\n                        value: selectedWard">\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="left">\n                    Diện tích\n                </div>\n                <div class="right">\n                    <select name="area" data-bind="value: selectedArea">\n                        <option value="0">Diện tich</option>\n                        <option value="1">Dưới 20m²</option>\n                        <option value="2">Từ 20m² đên 40m²</option>\n                        <option value="3">Trên 40m²</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class="btn-wrapper">\n            <button class="update" data-bind="event: {tap: updateNoti}">Cập nhật</button>\n        </div>\n    </div>\n</div>\n        '}));