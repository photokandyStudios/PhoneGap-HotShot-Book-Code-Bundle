/*****************************************************************************
 *
 * PhoneGap HotShot
 * Chapter 3 - Being Productive
 * Application Project: Filer
 *
 *****************************************************************************/

var APP = APP || {};    // set up our namespace

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
APP.start = function ()
{
  // load some useful libraries
  PKUTIL.include ( [ "./framework/ui-msg.js",
                     "./framework/ui-core.js",
                     "./framework/device.js", 
					 "./framework/localization.js" ], 
				   function () { APP.initLocalization(); } );
}
APP.initLocalization = function ()
{
  
  
  // initialize the globalization libraries
  PKLOC.initializeGlobalization( function ()
                                 {
								   PKLOC.loadLocales ( ["en-US","en-AU","en-GB","es-ES","es-MX","es-US","es"], 
								                       function ()
													   {
													     APP.init();
													   } );
								 }
							   );
}
APP.init = function ()
{ 
  // for wp7; alert doesn't work: see https://groups.google.com/forum/?fromgroups#!topic/phonegap/4wU-kKr0iQs
  if (device.platform=="WinCE")
  {
    window.alert = navigator.notification.alert;
  }
  // fake our locale:
  //PKLOC.currentUserLocale = "es-ES";
  
  // set up our translation matrix
  
  // english
  PKLOC.addTranslation ("en", "APP_TITLE",     "Filer");
  PKLOC.addTranslation ("en", "START",         "Start");
  PKLOC.addTranslation ("en", "BACK",          "Back");
  PKLOC.addTranslation ("en", "SHARE",         "Share");
  PKLOC.addTranslation ("en", "MOVE",          "Move");
  PKLOC.addTranslation ("en", "DELETE",        "Delete");
  PKLOC.addTranslation ("en", "COPY",          "Copy");
  PKLOC.addTranslation ("en", "ADD",           "Add");
  PKLOC.addTranslation ("en", "CREATE",        "Create");
  PKLOC.addTranslation ("en", "NO|YES",        "No|Yes");
     
  // initialize our application
  PKUI.CORE.initializeApplication ( );


  // load our socialView
  PKUTIL.loadHTML ( "./views/documentsView.html",
                    { id : "documentsView",
                      className: "container", 
                      attachTo: $ge("rootContainer"), 
                      aSync: true
                    },
                    function (success)
                    {
                      if (success)
                      {
                        documentsView.initializeView();
                      }
                    });

  // load our fileView
  PKUTIL.loadHTML ( "./views/fileView.html",
                    { id : "fileView",
                      className: "container", 
                      attachTo: $ge("rootContainer"), 
                      aSync: true
                    },
                    function (success)
                    {
                      if (success)
                      {
                        fileView.initializeView();
                      }
                    });

  // load our startView
  PKUTIL.loadHTML ( "./views/startView.html", 
                    { id : "startView", 
                      className: "container", 
                      attachTo: $ge("rootContainer"), 
                      aSync: true
                    },
                    function (success)
                    {
                      if (success)
                      {
                        startView.initializeView();
                        PKUI.CORE.showView ( startView );
                      }
                    });

}

