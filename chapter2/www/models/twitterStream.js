/*****************************************************************************
 *
 * Twitter User Stream
 *
 *****************************************************************************/

var TWITTER = TWITTER || {};

TWITTER._baseURL = "http://api.twitter.com/1/";
TWITTER._searchBase = "http://search.twitter.com/";

TWITTER.TwitterUser = function ( theScreenName, completion )
{
    var self = this;

    self._screenName = "";
    self._userData   = {};

    self.getScreenName = function ()
    {
        return self._screenName;
    }
    
    self.setScreenName = function ( theScreenName, completion )
    {
        self._screenName = theScreenName;
        // load the data from Twitter
        var getUserURL = TWITTER._baseURL + "users/lookup.json?screen_name=" + encodeURIComponent(theScreenName);
        PKUTIL.loadJSON ( getUserURL, function ( success, data )
          {
            if (success)
            {
              self._userData = data;
            }
            else
            {
              self._userData = { "error": "Twitter error; rate limited?" };
            }
            if (completion)
            {
                completion ();
            }
          }
        );
    }
    
    self.getProfileImageURL = function ()
    {
        if (self._userData[0])
        {
            return self._userData[0].profile_image_url;
        }
        return "";
    }

    self.getUserData = function ()
    {
        return self._userData;
    }
    
    self.getTimeline = function ( theMaxCount, completion )
    {
        return new TWITTER.TwitterStream ( "@" + self._theScreenName, completion, theMaxCount || 25 );
    }

    self.setScreenName ( theScreenName, completion ); // this will load the initial user data
}

TWITTER.TwitterStream = function ( theScreenNameOrSearchPhrase, completion, theMaxCount )
{
    var self = this;

    self._searchPhrase = "";
    self._stream     = {};
    self._theMaxCount   = 25; // default count
    
    self.setMaxCount = function ( theMaxCount )
    {
        self._theMaxCount = theMaxCount;
    }
    
    self.getMaxCount = function ()
    {
        return self._theMaxCount;
    }
    
    self.setScreenName = function ( theScreenName )
    {
        self._searchPhrase = "@" + theScreenName;
    }
    
    self.setSearchPhrase = function ( theSearchPhrase )
    {
        self._searchPhrase = theSearchPhrase;
    }
    
    self.getSearchPhrase = function ()
    {
        return self._searchPhrase;
    }
    
    self.getStream = function ()
    {
        return self._stream;
    }
    
    self.loadStream = function ( completion )
    {
    
        var theStreamURL;
        var forScreenName = false;
        
        if (self._searchPhrase.substr(0,1)=="@")
        {
            theStreamURL = TWITTER._baseURL + "statuses/user_timeline.json?include_entities=true&include_rts=true&count=" +
            self._theMaxCount + "&screen_name=" + encodeURIComponent(self._searchPhrase);
            forScreenName = true;
        }
        else
        {
            theStreamURL = TWITTER._searchBase + "search.json?q=" + encodeURIComponent(self._searchPhrase) + "&include_entities=true" + 
            "&include_rts=true&rpp=" + self._theMaxCount;
            console.log (theStreamURL);
            forScreenName = false;
        }

        PKUTIL.loadJSON ( theStreamURL, function (success, data)
          {
            if (success)
            {
              if (forScreenName)
              {
                self._stream = data;
              }
              else
              {
                self._stream = data.results;
              }
            }
            else
            {
              self._stream = { "error": "Twitter error; rate limited?" };
            }
            if (completion)
            {
              completion( self._stream );
            }
          }
        );
    }
    
    self.setSearchPhrase ( theScreenNameOrSearchPhrase );
    self.setMaxCount ( theMaxCount || 25 );
    self.loadStream ( completion );
}