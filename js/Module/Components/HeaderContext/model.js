var me = this;
const store = require("Store/Store");
this.isShowHome = ko.observable(false);
this.searchInput = ko.observable("");
this.isPageHome = ko.observable(false);
let matchInQuotes = false;
me.isHoverSearchBox = ko.observable(false);
me.isSearchResultPage = ko.observable(false);

this.searchHistory = ko.observable('');
this.dataSourceChanged = (keyword) => {
    if (keyword) {
        me.searchInput(keyword);
        $('.searchTerm').css({ background: 'var(--main-color-background)', color: 'var(--main-color-black)' });
    }
}


this.openSlider = (data, e) => {
    store.isOpenSlider(true);
}

this.searchInput_OnPress = (model, event) => {
    if (event.keyCode === 13 && me.searchInput()) {
        app.setPage('SearchResult', { keyword: me.searchInput(), cate: {} });
    }
    return true;
};

this.backToHome = function () {
    if (app.stackScreen.length > 1) {
        app.stackScreen = [app.stackScreen[0]];
        app.backTo();
    } else {
        app.backTo();
    }
}

function headerEffect() {
    var $header = $('.post-guide-page').find('.header-homepage').length ?
        $('.post-guide-page').find('.header-homepage') : $('.requestdetailnew-page').find('.header-homepage');

    $header.css({
        "background": "var(--main-color-background)"
    });
    $header.find('path').css({
        "fill": "var(--main-color-orange-dark)"
    }
    );
    $header.find('rect').css({
        "fill": "var(--main-color-orange-dark)"
    }
    );
    $header.find('i').css({
        "color": "var(--main-color-orange-dark)"
    }
    );
    $header.find(".search-box").remove();
    $(document).scroll(function () {
        if ($(this).scrollTop() > $header.height()) {
            $header.addClass('header-scrolled');
        } else {
            $header.removeClass('header-scrolled');
        }
    });
}

this.afterBinding = () => {
    if (app.Screen === "Home") this.isPageHome(true);
    let stackScreen = app.stackScreen;
    if (stackScreen.length > 1) {
        me.isShowHome(true);
        $('.search-box').css({ 'width': 'calc(100% - (' + $('.menu').outerWidth(true) + 'px' + ' + ' + $('.back-btn').outerWidth(true) + 'px' + ' + ' + $('.home-icon').outerWidth(true) + 'px + 15px))' });
    } else {
        me.isShowHome(false);
    }
    headerEffect();
}

this.openSearchHistory = () => {
    search_history.show();
    me.isHoverSearchBox(true);
}

this.deleteKeyword = () => {
    $('.searchTerm').css({ background: 'rgba(255,255,255,0.5)', color: 'var(--main-color-background)' });
    me.searchInput("");
    $('.searchTerm').val("").change();
    search_history.loadListMatches({ keyword: "" });
}

this.toSearchResult = () => {
    if (me.searchInput()) {
        app.setPage("SearchResult", { keyword: me.searchInput(), cate: {} });
    }
}
