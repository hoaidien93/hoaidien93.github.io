define([],()=>({viewModel:function(){this.isShow=ko.observable(!1),this.afterBinding=(()=>{window.blank=this}),this.show=(()=>{this.isShow(!0)}),this.hide=(()=>{this.isShow(!1)})},template:'\n            <div class="blank" data-bind="visible: isShow">\n</div>\n        '}));