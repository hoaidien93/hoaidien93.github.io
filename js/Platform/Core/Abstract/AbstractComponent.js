define(() => {
    class AbstractComponent extends HTMLElement {
        constructor() {
            super();
            this.state = {};
            // Prevent bind below component
            this.NOT_BIND_BELOW = "DoNotBindBelowThis:true";
            this.UNIQUEID = "duplicated";
            this.comDataChanged = function () {
            }
            this.wrapper = document.createElement("div");
        }
 
        connectedCallback() {
            // Remove duplicate
            if (this.querySelector("#" + this.UNIQUEID)) {
                let innerTemplate = this.querySelector("#" + this.UNIQUEID).innerHTML;
                $(this).find(`#${this.UNIQUEID}`).remove();
            }
            else {
                this.template = this.innerHTML + this.template;
                this.innerHTML = `
                        <div id="${this.UNIQUEID}">
                        </div>
                    `;
                this.wrapper = this.querySelector("#" + this.UNIQUEID);
            }
            this.wrapper.setAttribute("id", this.UNIQUEID);
 
            let dataBind = this.getAttribute("data-bind") || "";
            let allowBinding = this.getAttribute("allowBinding") || false;
            if (!allowBinding) {
                if (dataBind) {
                    if (dataBind.indexOf(this.NOT_BIND_BELOW) === -1) {
                        dataBind += "," + this.NOT_BIND_BELOW;
                    }
                } else {
                    dataBind = this.NOT_BIND_BELOW;
                }
            }
            this.setAttribute('data-bind', dataBind);
            
            this.wrapper.innerHTML = this.template;
            this.appendChild(this.wrapper);
            (!allowBinding) && (ko.applyBindings(this, this.wrapper));
 
            this.afterBinding();
        }
 
        afterBinding() {
 
        }
 
        updateUI() {
            ko.cleanNode(this.wrapper);
            ko.applyBindings(this.viewModel, this.wrapper);
        }
    }
 
    window.AbstractComponent = AbstractComponent;
})