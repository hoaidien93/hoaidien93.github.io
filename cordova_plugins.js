cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-firebase-analytics/www/FirebaseAnalytics.js",
        "id": "cordova-plugin-firebase-analytics.FirebaseAnalytics",
        "pluginId": "cordova-plugin-firebase-analytics",
        "merges": [
            "cordova.plugins.firebase.analytics"
        ]
    },
    {
        "file": "plugins/cordova-plugin-firebase-messaging/www/FirebaseMessaging.js",
        "id": "cordova-plugin-firebase-messaging.FirebaseMessaging",
        "pluginId": "cordova-plugin-firebase-messaging",
        "merges": [
            "cordova.plugins.firebase.messaging"
        ]
    },
    {
        "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
        "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
        "pluginId": "cordova-plugin-firebase-authentication",
        "merges": [
            "cordova.plugins.firebase.auth"
        ]
    },
    {
        "file": "plugins/cordova-plugin-googleplus/www/GooglePlus.js",
        "id": "cordova-plugin-googleplus.GooglePlus",
        "pluginId": "cordova-plugin-googleplus",
        "clobbers": [
            "window.plugins.googleplus"
        ]
    },
    {
        "file": "plugins/cordova-plugin-googleplus/src/browser/GooglePlusProxy.js",
        "id": "cordova-plugin-googleplus.GooglePlusProxy",
        "pluginId": "cordova-plugin-googleplus",
        "clobbers": [
            "GooglePlus"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-firebase-analytics": "4.3.0",
    "cordova-plugin-firebase-messaging": "4.4.1",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-firebase-authentication": "3.3.0",
    "cordova-plugin-googleplus": "8.5.0"
}
// BOTTOM OF METADATA
});