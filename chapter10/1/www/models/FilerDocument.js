/*****************************************************************************
 *
 * Filer Document
 *
 *****************************************************************************/

var DOC = DOC || {};

/**
 *
 * Returns an Filer object with the contents of theFile loaded
 *
 */
DOC.Filer = function ( theFileEntry, completion, failure )
{
    var self = this;
    
    // file and state
    self.fileEntry = theFileEntry;
    self.fileName = self.fileEntry.name;
    self.completion = completion;
    self.failure = failure;
    self.state = "";
    
    // file-specific
    self.title = "My Filer";
    self.text = "";

    self.getTitle = function ()
    {
        return self.title;
    }
    
    self.setTitle = function ( theTitle )
    {
        self.title = theTitle;
    }
    
    self.getText = function ()
    {
        return self.text;
    }
    
    self.setText = function ( theText )
    {
        self.text = theText;
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
    }
    
    self.finishedReadingFile = function ( e )
    {
        var theFileContents = e.target.result;
        if (!theFileContents)
        {
            theFileContents = '{"title":"New File","text":""}';
        }
        self.state = "";
        
        try
        {
            var data = JSON.parse ( theFileContents );
            self.title = data.title;
            self.text = data.text;            
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
        return { "title": self.title, "text": self.text };
    }
    
    self.readFileContents();
}

