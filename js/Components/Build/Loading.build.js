define(["Module/Components/Loading/build"],function(Module){window.customElements.define("com-loading",class Loading extends AbstractComponent{constructor(){super(),this.template=Module.template,Module.viewModel.call(this)}})});