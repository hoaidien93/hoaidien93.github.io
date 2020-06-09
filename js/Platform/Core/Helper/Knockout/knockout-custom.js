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
});