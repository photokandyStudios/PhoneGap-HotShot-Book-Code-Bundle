/*****************************************************************************
 *
 * PhoneGap HotShot
 * Chapter 2 - Getting Sociable
 * Application Project: Socializer
 *
 *****************************************************************************/

var APP = APP || {}; // set up our namespace
//
// WAIT FOR DEVICE READY BEFORE STARTING OUR APPLICATION
//
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  APP.start();
}


/**
 *
 * Starts up the application. We'll create our initial translation matrix,
 * initialize our models, views, and controllers, and go from there.
 *
 */
APP.start = function() {
  // load some useful libraries
  PKUTIL.include(["./framework/ui-core.js", "./framework/device.js", "./framework/localization.js"], function() {
    APP.initLocalization();
  });
}
APP.initLocalization = function() {


  // initialize the globalization libraries
  PKLOC.initializeGlobalization(function() {
    PKLOC.loadLocales(["en-US", "en-AU", "en-GB", "es-ES", "es-MX", "es-US", "es"], function() {
      APP.init();
    });
  });
}
APP.init = function() {
  // for wp7; alert doesn't work: see https://groups.google.com/forum/?fromgroups#!topic/phonegap/4wU-kKr0iQs
  if (device.platform == "WinCE") {
    window.alert = navigator.notification.alert;
  }
  // fake our locale:
  PKLOC.currentUserLocale = "es-ES";

  // set up our translation matrix
  // english
  PKLOC.addTranslation("en", "APP_TITLE", "Socializer2");
  PKLOC.addTranslation("en", "START", "Start");
  PKLOC.addTranslation("en", "BACK", "Back");
  PKLOC.addTranslation("en", "SHARE", "Share");

  // initialize our application
  PKUI.CORE.initializeApplication();

    window.addEventListener("resize", function() {
        plugins.navigationBar.resize();
        plugins.tabBar.resize(); }
    , false);

    plugins.navigationBar.init();
    plugins.tabBar.init();

    plugins.navigationBar.create();
    plugins.tabBar.create();
  
    plugins.navigationBar.hideLeftButton();
    plugins.navigationBar.hideRightButton();

    plugins.navigationBar.setTitle(__T("APP_TITLE"));

    plugins.navigationBar.show();


  

  // load our socialView
  PKUTIL.loadHTML("./views/socialView.html", {
    id: "socialView",
    className: "container",
    attachTo: $ge("rootContainer"),
    aSync: true
  }, function(success) {
    if (success) {
      socialView.initializeView();
    }
  });

  // load our tweetView
  PKUTIL.loadHTML("./views/tweetView.html", {
    id: "tweetView",
    className: "container",
    attachTo: $ge("rootContainer"),
    aSync: true
  }, function(success) {
    if (success) {
      tweetView.initializeView();
    }
  });

  // load our startView
  PKUTIL.loadHTML("./views/startView.html", {
    id: "startView",
    className: "container",
    attachTo: $ge("rootContainer"),
    aSync: true
  }, function(success) {
    if (success) {
      startView.initializeView();
      PKUI.CORE.showView(startView);
      PKUTIL.delay(500, PKUI.CORE.hideSplash);
    }
  });

}