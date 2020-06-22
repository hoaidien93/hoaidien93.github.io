this.temp = new Array(10).fill(1);

this.afterBinding = () => {
    cordova.plugins.firebase.messaging.requestPermission({forceShow: true}).then(function() {
        console.log("You'll get foreground notifications when a push message arrives");
        cordova.plugins.firebase.messaging.subscribe("Test");
    });

}