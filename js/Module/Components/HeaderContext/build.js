define(["Store/Store"],()=>({viewModel:function(){var me=this;const store=require("Store/Store");this.isShowHome=ko.observable(!1),this.searchInput=ko.observable(""),this.isPageHome=ko.observable(!1);me.isHoverSearchBox=ko.observable(!1),me.isSearchResultPage=ko.observable(!1),this.searchHistory=ko.observable(""),this.dataSourceChanged=(keyword=>{keyword&&(me.searchInput(keyword),$(".searchTerm").css({background:"var(--main-color-background)",color:"var(--main-color-black)"}))}),this.openSlider=((data,e)=>{store.isOpenSlider(!0)}),this.searchInput_OnPress=((model,event)=>(13===event.keyCode&&me.searchInput()&&app.setPage("SearchResult",{keyword:me.searchInput(),cate:{}}),!0)),this.backToHome=function(){app.stackScreen.length>1?(app.stackScreen=[app.stackScreen[0]],app.backTo()):app.backTo()},this.afterBinding=(()=>{"Home"===app.Screen&&this.isPageHome(!0),app.stackScreen.length>1?(me.isShowHome(!0),$(".search-box").css({width:"calc(100% - ("+$(".menu").outerWidth(!0)+"px + "+$(".back-btn").outerWidth(!0)+"px + "+$(".home-icon").outerWidth(!0)+"px + 15px))"})):me.isShowHome(!1),function headerEffect(){var $header=$(".post-guide-page").find(".header-homepage").length?$(".post-guide-page").find(".header-homepage"):$(".requestdetailnew-page").find(".header-homepage");$header.css({background:"var(--main-color-background)"}),$header.find("path").css({fill:"var(--main-color-orange-dark)"}),$header.find("rect").css({fill:"var(--main-color-orange-dark)"}),$header.find("i").css({color:"var(--main-color-orange-dark)"}),$header.find(".search-box").remove(),$(document).scroll(function(){$(this).scrollTop()>$header.height()?$header.addClass("header-scrolled"):$header.removeClass("header-scrolled")})}()}),this.openSearchHistory=(()=>{search_history.show(),me.isHoverSearchBox(!0)}),this.deleteKeyword=(()=>{$(".searchTerm").css({background:"rgba(255,255,255,0.5)",color:"var(--main-color-background)"}),me.searchInput(""),$(".searchTerm").val("").change(),search_history.loadListMatches({keyword:""})}),this.toSearchResult=(()=>{me.searchInput()&&app.setPage("SearchResult",{keyword:me.searchInput(),cate:{}})})},template:'\n            <div class="header-homepage pos-fixed">\n    <div class="top-header" data-bind="attr: {id: isPageHome()?\'isHomePage\':\n        \'\'}">\n        <div style="display: flex;">\n            <div class="back-btn" data-bind="directInfo: {to: \'#previousPage\'},\n            hidden: isPageHome">\n                <i class="far fa-chevron-left"></i>\n            </div>\n            <div class="menu" data-bind="event:{tap:openSlider}" target=".leftSlider">\n                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16">\n                    <g id="Group_739" data-name="Group 739" transform="translate(-24\n                    -18)">\n                        <rect id="Rectangle_1228" data-name="Rectangle 1228" width="20" height="2"\n                            transform="translate(24 18)" fill="#fff" />\n                        <rect id="Rectangle_1229" data-name="Rectangle 1229" width="20" height="2"\n                            transform="translate(24 25)" fill="#fff" />\n                        <rect id="Rectangle_1230" data-name="Rectangle 1230" width="20" height="2" transform="translate(24\n                                32)" fill="#fff" />\n                    </g>\n                </svg>\n            </div>\n        </div>\n        <div class="search-box">\n            <input type="text" id="search" class="searchTerm" placeholder="Bạn cần tìm gì?" data-bind="text:\n                                searchInput, event:\n                                { keypress: searchInput_OnPress, tap:\n                                openSearchHistory, input: searchHistory }" autocomplete="off">\n            \x3c!-- ko if: searchInput() == "" --\x3e\n            <svg class="search-icon" data-bind="event: { tap:\n                                toSearchResult }" xmlns="http://www.w3.org/2000/svg" width="24.867" height="24.203"\n                viewBox="0 0\n                                24.867 24.203">\n                <g id="Group_459" data-name="Group 459" transform="translate(0)">\n                    <path id="Path_982" data-name="Path 982"\n                        d="M-1367.913,649.841l-.035-.036a9.355,9.355,0,0,0-12.964-.03l-.06.057a8.714,8.714,0,0,0,0,12.542l.015.014a9.226,9.226,0,0,0,6.445,2.645h.069a9.23,9.23,0,0,0,6.429-2.567A8.8,8.8,0,0,0-1367.913,649.841Zm-1.341,11.44q-.142.136-.292.264a7.588,7.588,0,0,1-10.5-.643,7.2,7.2,0,0,1,.619-10.222,7.57,7.57,0,0,1,4.912-1.795,7.58,7.58,0,0,1,5.388,2.227,7.065,7.065,0,0,1-.13,10.168Z"\n                        transform="translate(1383.635 -647.18)" fill="#fff" />\n                    <path id="Path_983" data-name="Path 983"\n                        d="M-1320.478,706.94l-3.562-3.481a2.327,2.327,0,0,0-1.617-.655h-.012a2.348,2.348,0,0,0-.958.2l-.428-.411a.831.831,0,0,0-1.126,0,.759.759,0,0,0-.233.548.76.76,0,0,0,.233.548l.422.411a2.183,2.183,0,0,0-.21.937,2.206,2.206,0,0,0,.672,1.581l3.572,3.478a2.326,2.326,0,0,0,1.616.655h.013a2.328,2.328,0,0,0,1.617-.654A2.2,2.2,0,0,0-1320.478,706.94Zm-1.2,1.976h0a.594.594,0,0,1-.412.166h0a.592.592,0,0,1-.412-.167l-3.573-3.479a.561.561,0,0,1-.171-.4.553.553,0,0,1,.171-.4.593.593,0,0,1,.412-.166h0a.592.592,0,0,1,.412.167l3.572,3.478A.561.561,0,0,1-1321.682,708.916Z"\n                        transform="translate(1344.675\n                                            -686.552)" fill="#fff" />\n                </g>\n            </svg>\n            \x3c!-- /ko --\x3e\n            \x3c!-- ko if: searchInput() != "" --\x3e\n            <svg class="search-icon" style="top: 30%" data-bind="event: { tap: deleteKeyword\n                                        }" xmlns="http://www.w3.org/2000/svg" width="24.867" height="24.203"\n                viewBox="0 0 24.867 24.203">\n                <path id="Path_1160" data-name="Path\n                                            1160"\n                    d="M1836.011,4630.495l-1.505-1.493-6.012,5.991-5.962-5.939-1.507,1.5,6,5.972-6.015,5.993L1822.5,4644l6.025-6.006,5.978,5.955,1.507-1.5-5.994-5.976Z"\n                    transform="translate(-1821.006\n                                            -4629.002)" fill="#aaa" />\n            </svg>\n            \x3c!-- /ko --\x3e\n        </div>\n    </div>\n</div>\n        '}));