/*****************************************************************************
 *
 * PhoneGap HotShot
 * Chapter 1 - Let's Get Local
 * Application Project: Quiz Time
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
  PKUTIL.include ( [ "./framework/ui-core.js", 
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
  PKLOC.currentUserLocale = "es-ES";
  
  // set up our translation matrix
  
  // english
  PKLOC.addTranslation ("en", "APP_TITLE",     "Quiz Time");
  PKLOC.addTranslation ("en", "APP_TITLE_IMAGE", "AppTitle-enus.png");
  PKLOC.addTranslation ("en", "CORRECT",       "Correct!");
  PKLOC.addTranslation ("en", "INCORRECT",     "Incorrect.");
  PKLOC.addTranslation ("en", "START",         "Start");
  PKLOC.addTranslation ("en", "BACK",          "Back");
  PKLOC.addTranslation ("en", "SKIP",          "Skip");
  PKLOC.addTranslation ("en", "QUESTION_%1",   "Question %1");
  PKLOC.addTranslation ("en", "SCORE_%1",   "Score: %1");
  PKLOC.addTranslation ("en", "RESULTS",    "Results");
  PKLOC.addTranslation ("en", "TRY_AGAIN?",    "Try Again?");
     
  // spanish
  PKLOC.addTranslation ("es", "APP_TITLE",     "Examen Tiempo");
  PKLOC.addTranslation ("es", "APP_TITLE_IMAGE", "AppTitle-eses.png");
  PKLOC.addTranslation ("es", "CORRECT",       "¡Correcto!");
  PKLOC.addTranslation ("es", "INCORRECT",     "Incorrecto.");
  PKLOC.addTranslation ("es", "START",         "Comenzar");
  PKLOC.addTranslation ("es", "BACK",          "Volver");
  PKLOC.addTranslation ("es", "SKIP",          "Omitir"); 
  PKLOC.addTranslation ("es", "QUESTION_%1",   "Pregunta %1");
  PKLOC.addTranslation ("es", "SCORE_%1",   "Puntuación: %1");
  PKLOC.addTranslation ("es", "RESULTS",    "Resultados");
  PKLOC.addTranslation ("es", "TRY_AGAIN?",    "¿Intentar du nuevo?");
  

  // initialize our application
  PKUI.CORE.initializeApplication ( );

  // load our gameView
  PKUTIL.loadHTML ( "./views/gameView.html", 
                    { id : "gameView", 
                      className: "container", 
                      attachTo: $ge("rootContainer"), 
                      aSync: true
                    },
                    function (success)
                    {
                      if (success)
                      {
                        gameView.initializeView();
                      }
                    });

  // load our endView
  PKUTIL.loadHTML ( "./views/endView.html", 
                    { id : "endView", 
                      className: "container", 
                      attachTo: $ge("rootContainer"), 
                      aSync: true
                    },
                    function (success)
                    {
                      if (success)
                      {
                        endView.initializeView();
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
                        // show our view, thus starting the app visually.
                        PKUI.CORE.showView ( startView );
                      }
                    });

}

