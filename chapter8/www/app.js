/*jshint asi:true, forin:true, noarg:true, noempty:true, eqeqeq:false, bitwise:true, undef:true, curly:true, browser:true, devel:true, smarttabs:true, maxerr:50 */
/*****************************************************************************
 *
 * PhoneGap HotShot
 * Chapter 8 - 
 * Application Project: Cave Runner
 *
 *****************************************************************************/

var APP = APP ||
{
};
// set up our namespace

//
// WAIT FOR DEVICE READY BEFORE STARTING OUR APPLICATION
//
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
  APP.start();
}

/**
 *
 * Starts up the application. We'll create our initial translation matrix,
 * initialize our models, views, and controllers, and go from there.
 *
 */
APP.start = function()
{
  // for wp7; alert doesn't work: see https://groups.google.com/forum/?fromgroups#!topic/phonegap/4wU-kKr0iQs
  if (device.platform == "WinCE")
  {
    window.alert = navigator.notification.alert;
  }

  // load some useful libraries
  PKUTIL.include(["./framework/fileutil.js", "./framework/ui-gestures.js", "./framework/ui-msg.js", "./framework/ui-core.js", "./framework/device.js", "./framework/localization.js"], function()
  {
    APP.initLocalization();
  });
}
APP.initLocalization = function()
{

  // initialize the globalization libraries
  PKLOC.initializeGlobalization(function()
  {
    PKLOC.loadLocales(["en-US", "en-AU", "en-GB", "es-ES", "es-MX", "es-US", "es"], function()
    {
      APP.init();
    });
  });
}
APP.init = function()
{

  // set up our translation matrix

  // english
  PKLOC.addTranslation("en", "APP_TITLE", "Cave Runner");
  PKLOC.addTranslation("en", "PLAY", "Play!");
  PKLOC.addTranslation("en", "START", "Start");
  PKLOC.addTranslation("en", "START_OVER", "Try Again");
  PKLOC.addTranslation("en", "CONTINUE", "Continue");
  PKLOC.addTranslation("en", "OPTIONS", "Options");
  PKLOC.addTranslation("en", "BACK", "Back");
  PKLOC.addTranslation("en", "TAP_TO_START", "Tap to Start");
  PKLOC.addTranslation("en", "CRASHED", "*Crash*");
  PKLOC.addTranslation("en", "NEXT_LEVEL", "Level Up!");
  PKLOC.addTranslation("en", "SLIDE", "Slide");
  PKLOC.addTranslation("en", "TILT", "Tilt");

  // initialize our application
  PKUI.CORE.initializeApplication();

  PKUTIL.loadHTML("./views/gameView.html",
  {
    id : "gameView",
    className : "container",
    attachTo : $ge("rootContainer"),
    aSync : true
  }, function(success)
  {
    if (success)
    {
      gameView.initializeView();
    }
  });

  PKUTIL.loadHTML("./views/optionsView.html",
  {
    id : "optionsView",
    className : "container",
    attachTo : $ge("rootContainer"),
    aSync : true
  }, function(success)
  {
    if (success)
    {
      optionsView.initializeView();
    }
  });

  PKUTIL.loadHTML("./views/startView.html",
  {
    id : "startView",
    className : "container",
    attachTo : $ge("rootContainer"),
    aSync : true
  }, function(success)
  {
    if (success)
    {
      startView.initializeView();
      PKUI.CORE.showView(startView);
      PKUI.CORE.hideSplash();
    }
  });


}

