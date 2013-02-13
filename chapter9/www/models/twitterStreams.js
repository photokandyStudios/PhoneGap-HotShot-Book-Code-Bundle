//REQUIRES: twitterStream.js
/*****************************************************************************
 *
 * Twitter Streams
 *
 *****************************************************************************/

TWITTER.users = Array();

TWITTER.loadTwitterUsers = function ( completion )
{
//  TWITTER.users.push ( new TWITTER.TwitterUser ( "photoKandy"  , completion ) ); 
// return;
  TWITTER.users.push ( new TWITTER.TwitterUser ( "photoKandy"  , function () 
    { TWITTER.users.push ( new TWITTER.TwitterUser ( "CNN"  , function ()
      { TWITTER.users.push ( new TWITTER.TwitterUser ( "BBCWorld" , function ()
        { TWITTER.users.push ( new TWITTER.TwitterUser ( "espn", function ()
          { TWITTER.users.push ( new TWITTER.TwitterUser ( "lemondefr", completion ) ); }
          ) ); }
        ) ) ; }
      ) ) ; }
    ) ) ;

}
