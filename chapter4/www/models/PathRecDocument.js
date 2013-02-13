/*jshint asi:true, forin:true, noarg:true, noempty:true, eqeqeq:false, bitwise:true, undef:true, curly:true, browser:true, devel:true, smarttabs:true, maxerr:50 */
/*****************************************************************************
 *
 * PathRec Document
 *
 *****************************************************************************/

var DOC = DOC || {};

// internal document object
DOC.PathRecDocumentItem = function ( position )
{
   var self = this;
   
   self.timestamp = {};
   self.latitude = 0;
   self.longitude = 0;
   self.altitude = 0;
   self.heading = 0;
   self.speed = 0;
   
   self.setPosition = function ( position )
   {
       self.timestamp = position.timestamp;
       
       if (position.coords)
       {
           self.latitude = position.coords.latitude;
           self.longitude = position.coords.longitude;
           self.altitude = position.coords.altitude;
           self.heading = position.coords.heading;
           self.speed = position.coords.speed;
       }
       else
       {
           self.latitude = position.latitude;
           self.longitude = position.longitude;
           self.altitude = position.altitude;
           self.heading = position.heading;
           self.speed = position.speed;
       }
      }
   
   self.getLatitude = function ()
   {
       return self.latitude;
   }
   
   self.getLongitude = function ()
   {
       return self.longitude;
   }
   
   self.getAltitude = function ()
   {
       return self.altitude;
   }
   
   self.getHeading = function ()
   {
       return self.heading;
   }
   
   self.getSpeed = function ()
   {
       return self.speed;
   }
   
   self.getLatLong = function ()
   {
       return self.latitude + "," + self.longitude;
   }
   
   self.getGoogleLatLng = function ()
   {
       return new google.maps.LatLng( self.latitude, self.longitude );
   }
   
   self.getGoogleMarker = function ( withMap )
   {
       return new google.maps.Marker(
         {
           map:withMap,
           title:self.getLatLong(),
           draggable:false,
           position:self.getGoogleLatLng()
         }
       );
   }
   
   self.serialize = function ()
   {
       return {
           "timestamp": self.timestamp,
           "latitude": self.latitude,
           "longitude": self.longitude,
           "altitude": self.altitude,
           "heading": self.heading,
           "speed": self.speed
       };
   }
   
   if (position)
   {
      self.setPosition ( position );
   }
}


/**
 *
 * Returns an PathRecDocument object with the contents of theFile loaded
 *
 */
DOC.PathRecDocument = function ( theFileEntry, completion, failure )
{
    var self = this;
    
    // file and state
    self.fileEntry = theFileEntry;
    self.fileName = self.fileEntry.name;
    self.completion = completion;
    self.failure = failure;
    self.state = "";
    
    // file-specific
    self.title = "My Path";
    self.nodes = []; // array of PathRecDocumentItem

    self.getTitle = function ()
    {
        return self.title;
    }
    
    self.setTitle = function ( theTitle )
    {
        self.title = theTitle;
    }
    
    self.getNodes = function ()
    {
        return self.nodes;
    }
    
    self.setNodes = function ( theNodes )
    {
        self.nodes = theNodes;
    }
    
    self.addNode = function ( aNode )
    {
        self.nodes.push ( aNode );
    }
    
    self.getNodeAtIndex = function ( idx )
    {
        return self.nodes[idx];
    }
    
    self.getNodeCount = function ()
    {
        return self.nodes.length;
    }
    
    self.readFileContents = function()
    {
        self.state = "Reading a File"; 
        self.fileEntry.file ( self.gotFile, self.dispatchFailure );
    }
    
    self.dispatchFailure = function( e )
    {
        // some sort of failure :-(
        console.log ("While " + self.State + ", encountered error: " + e.target.error.code);
        if (self.failure)
        {
            self.failure ( e );
        }
    }
    
    self.gotFile = function ( theFile )
    {
        var reader = new FileReader ();
        reader.onloadend = self.finishedReadingFile;
        reader.onloaderror = self.dispatchFailure;
        reader.readAsText ( theFile );
        // just for ios6
        //self.finishedReadingFile ( JSON.stringify({ "target": {}}) ); //REMOVE
    }
    
    self.finishedReadingFile = function ( e )
    {
        var theFileContents = e.target.result;
        if (!theFileContents)
        {
            theFileContents = '{"title":"New File","nodes":[]}';
        }
//        console.log (theFileContents);
        self.state = "";
        
        try
        {
            var data = JSON.parse ( theFileContents );
            self.title = data.title;
//            console.log (data.nodes.length);
            for (var i=0; i<data.nodes.length; i++)
            {
                //console.log (JSON.stringify(data.nodes[i]));
                self.addNode ( new DOC.PathRecDocumentItem ( data.nodes[i] ) );
            }
        }
        catch ( err )
        {
            console.log ("While reading a file, " + err.message );
            if (self.failure)
            {
                self.failure();
            }
            return;
        }
        
        if (self.completion)
        {
            self.completion ();
        }
    }
    
    self.saveFileContents = function ( completion , failure )
    {
        self.completion = completion;
        self.failure = failure;
        self.fileEntry.createWriter ( self.gotFileWriter, self.dispatchFailure );
    }
    
    self.gotFileWriter = function ( writer )
    {
        writer.onerror = self.failure;
        writer.onwriteend = function ( e )
                            {
                              if (self.completion)
                              {
                                  self.completion();
                              }
                            };
        writer.write ( JSON.stringify ( self.serialize() ) );
    }
    
    self.serialize = function ()
    {
        var serializedNodes = [];
        for (var i=0; i<self.nodes.length; i++)
        {
            serializedNodes.push ( self.nodes[i].serialize() );
        }
        return { "title": self.title, "nodes": serializedNodes };
    }
    
    self.readFileContents();
}

