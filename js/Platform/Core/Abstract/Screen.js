define(function () {
    return (class Screen {
        constructor(application, _container, _request = {}) {
            this.application = application;
            this.container = _container;
            this._request = _request;
            this.UIAssets = [];
        }

        binding() {
            this.beforeBinding();
            ko.cleanNode(this.container);
            this.container.innerHTML = this.template;
            ko.applyBindings(this, this.container);
            this.afterBinding();
        }

        beforeBinding() {

        }

        afterBinding() {
        }

        updateUI() {
            ko.cleanNode(this.container);
            ko.applyBindings(this.viewModel, this.container);
        }
    });
})