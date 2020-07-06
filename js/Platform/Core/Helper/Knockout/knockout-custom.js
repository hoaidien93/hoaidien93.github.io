define(() => {
    ko.bindingHandlers.DoNotBindBelowThis = {
        init: function () {
            return { controlsDescendantBindings: true };
        }
    };

    ko.bindingHandlers.dataSource = {
        update: function (element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());

            element.dataSource = value;
            if (element.dataSourceChanged)
                element.dataSourceChanged(value);
        }
    };
    ko.bindingHandlers.directInfo = {
        init: function (element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            // value.data = data;
            element.directInfo = value;
        },
        update: function (element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            element.directInfo = value;

        }
    }

    ko.bindingHandlers.convertTime = {
        init: function (element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            let postDate = new Date(parseInt(value));
            let currentDate = new Date();
            let text = "";
            let diffTime = Math.abs(currentDate - postDate);
            let diffMonth = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
            let diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            let diffHour = Math.floor(diffTime / (1000 * 60 * 60));
            let diffMin = Math.floor(diffTime / (1000 * 60));
            if (diffMonth) {
                text = diffMonth + " tháng trước";
            }
            else {
                if (diffDay) {
                    text = diffDay + " ngày trước";
                } else {
                    if (diffHour) {
                        text = diffHour + " giờ trước";
                    }
                    else {
                        text = diffMin + " phút trước";
                    }
                }
            }
            element.innerHTML = text;
        },
        update: function (element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
        }
    }

    ko.bindingHandlers.convertMoney = {
        init: function (element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            let text = "";
            if (parseInt(value) >= 1000000) {
                text = value / 1000000 + " triệu đồng";
            } else {
                text = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đồng";
            }
            element.innerHTML = text;
        },
        update: function (element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            let text = "";
            if (parseInt(value) >= 1000000) {
                text = value / 1000000 + " triệu đồng";
            } else {
                text = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đồng";
            }
            element.innerHTML = text;
        }
    }

});