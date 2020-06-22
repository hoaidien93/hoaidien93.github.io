var h = document.getElementsByTagName("head")[0];
document.addEventListener("deviceready", () => {
    let requireJS = document.createElement("script");
    requireJS.type = "text/javascript";
    requireJS.src = "library/require.js";
    requireJS.async = false;
    requireJS.onload = () => {
        requirejs.config({
            baseUrl: 'js'
        });
        require(["config","API/AbstractAPI"], function (config) {
            console.log(config);
            listComponents = config.COMPONENT_USED.map((e) => {
                return `${config.COMPONENT_FOLDER}/Build/${e}.build`;
            });
            require([
                "Platform/Core/Abstract/AbstractComponent",
                "Platform/Core/Helper/DOM/Element",
                "Platform/Core/Helper/Knockout/knockout-custom"
            ], function () {
                require([...listComponents], function () {
                    require(['Platform/Core/Application'], function (Application) {
                        var app = new Application(document.querySelector('.app'));
                        window.app = app;
                        app.Screen = "Login";
                        app.Start();
                    });
                });
            });
        })
    }
    h.parentNode.appendChild(requireJS);
}, false);
