/*jshint asi:true, forin:true, noarg:true, noempty:true, eqeqeq:false, bitwise:true, undef:true, curly:true, browser:true, devel:true, smarttabs:true, maxerr:50 */
/*****************************************************************************
 *
 * VoiceRec Document Collection
 *
 *****************************************************************************/

var DOCS = DOCS ||
{
};

/**
 *
 * Returns an object that handles looking through the
 * user's persistent storage for any files.
 *
 */
DOCS.VoiceRecDocumentCollection = function(completion, failure)
{
  var self = this;

  self.state = "";
  self.completion = completion;
  self.documents = [];
  self.fileSystem =
  {
  };
  self.failure = failure;
  self.fileEntry =
  {
  };

  self.loadFileSystem = function(completion, failure)
  {
    self.completion = completion;
    self.failure = failure;
    self.getFileSystem();
  }
  /**
   *
   * getFileSystem is the start -- we request the persistent file store. On iOS with will be the
   * local Documents directory.
   *
   */
  self.getFileSystem = function()
  {
    self.state = "Requesting File System";
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, self.getFileSystemSuccess, self.dispatchFailure);
  }
  /**
   *
   * All our functions need a failure callback, so we provide dispatchFailure. If an error occurs, we'll
   * at least log it to the console, and then call the failure function attached to self.failure(), if any.
   *
   */
  self.dispatchFailure = function(e)
  {
    // some sort of failure :-(
    console.log("While " + self.state + ", encountered error: " + JSON.stringify(e));
    if (self.failure)
    {
      // the delay here keeps any subsequent error dialogs from
      // messing up the iOS display if the keyboard is animating out.
      PKUTIL.delay(500, function()
      {
        self.failure(e)
      });
    }
  }
  /**
   *
   * Called when we receive a valid file system. Once we do that, we need to ask for all
   * the documents within the file system.
   *
   */
  self.getFileSystemSuccess = function(fileSystem)
  {
    self.state = "Received File System";
    self.fileSystem = fileSystem;
    // now that we have the file system, we need to iterate over the entries
    self.getDocuments(fileSystem.root);
  }
  /**
   *
   * Creates a directory reader and requests its entries.
   *
   */
  self.getDocuments = function(directoryEntry)
  {
    self.state = "Requesting Reader";
    var directoryReader = directoryEntry.createReader();

    self.state = "Requesting Entries from Reader";
    directoryReader.readEntries(self.getDocumentsSuccess, self.dispatchFailure);
  }
  /**
   *
   * The director reader read all the entries, now we need to process them. First,
   * check to make sure the entry is a file (WE WILL NOT ITERATE SUB DIRECTORIES)
   * and then check to make sure it is a file we might know something about (we're
   * using the file extension). If it is, add it to our document list.
   *
   */
  self.getDocumentsSuccess = function(entries)
  {
    var theDocuments = [];
    for (var i = 0; i < entries.length; i++)
    {
      // is the entry a file? (we won't iterate subdirs)
      if (entries[i].isFile)
      {
        var theFileName = entries[i].name;
        var theFileType = PKUTIL.FILE.extensionSeparator + PKUTIL.FILE.getFileExtensionPart(theFileName);
        if (APP.globalFileExtension.indexOf(theFileType) > -1)
        {
          // a file we know we can process
          theDocuments.push(entries[i]);
        }
      }
    }
    self.documents = theDocuments;
    self.state = "";
    // we've iterated over all our entries, now let the completion know
    // we are finished.
    if (self.completion)
    {
      self.completion(self);
    }
  }
  /**
   *
   * Return the # of documents in our persistent storage. Must have used getFileSystem() first.
   *
   */
  self.getDocumentCount = function()
  {
    return self.documents.length;
  }
  /**
   *
   * Return the document entry at the specific index. For information on the format of the
   * entry, see the PhoneGap APIs.
   *
   */
  self.getDocumentAtIndex = function(idx)
  {
    return self.documents[idx];
  }
  /**
   *
   * Delete the document at the specified index. UNRECOVERABLE, so ASK the user first.
   *
   */
  self.deleteDocumentAtIndex = function(idx, completion, failure)
  {
    self.completion = completion;
    self.failure = failure;
    self.state = "Removing a Document";
    self.documents[idx].remove(self.deleteDocumentAtIndexSuccess, self.dispatchFailure);
  }
  /**
   *
   * We were successful at deleting, re-read our file system
   *
   */
  self.deleteDocumentAtIndexSuccess = function()
  {
    self.state = "";
    // re-read our directory; completion will be called upon successful completion
    self.getFileSystem();
  }
  /**
   *
   * Rename the document at the specified index to newName.
   *
   */
  self.renameDocumentAtIndexTo = function(idx, newName, completion, failure)
  {
    self.completion = completion;
    self.failure = failure;
    self.state = "Renaming a Document";
    // first, check to make sure that the new name isn't already in our document list
    for (var i = 0; i < self.documents.length; i++)
    {
      if (self.documents[i].name.toLowerCase().trim() == newName.toLowerCase().trim())
      {
        self.dispatchFailure(
        {
          "error" : "The file already exists"
        });
        return;
      }
    }
    self.documents[idx].moveTo(self.fileSystem.root, newName.trim(), self.renameDocumentAtIndexToSuccess, self.dispatchFailure);
  }
  /**
   *
   * We renamed the document, so re-read the file system.
   *
   */
  self.renameDocumentAtIndexToSuccess = function()
  {
    self.state = "";
    self.getFileSystem();
  }
  /**
   *
   * A near duplicate to renaming -- we're using copyTo instead of moveTo. Creates a duplicate
   * of the file at the specified index.
   *
   */
  self.copyDocumentAtIndexTo = function(idx, newName, completion, failure)
  {
    self.completion = completion;
    self.failure = failure;
    self.state = "Duplicating a Document";
    // first, check to make sure that the new name isn't already in our document list
    for (var i = 0; i < self.documents.length; i++)
    {
      if (self.documents[i].name.toLowerCase().trim() == newName.toLowerCase().trim())
      {
        self.dispatchFailure(
        {
          "error" : "The file already exists"
        });
        return;
      }
    }
    // copy the document
    self.documents[idx].copyTo(self.fileSystem.root, newName.trim(), self.copyDocumentAtIndexToSuccess, self.dispatchFailure);
  }
  /**
   *
   * The copy is complete; re-read the file system.
   *
   */
  self.copyDocumentAtIndexToSuccess = function()
  {
    self.state = "";
    self.getFileSystem();
  }
  /**
   *
   * Create a new document with the given name. Re-read the file system afterwards.
   *
   */
  self.createDocument = function(theDocumentName, completion, failure)
  {
    self.completion = completion;
    self.failure = failure;
    self.state = "Creating a Document";
    // first, check to make sure that the new name isn't already in our document list
    for (var i = 0; i < self.documents.length; i++)
    {
      if (self.documents[i].name.toLowerCase().trim() == theDocumentName.toLowerCase().trim())
      {
        self.dispatchFailure(
        {
          "error" : "The file already exists"
        });
        return;
      }
    }
    // now create the file
    self.fileSystem.root.getFile(theDocumentName.trim(),
    {
      create : true,
      exclusive : false
    }, function(theFileEntry)
    {
      self.fileEntry = theFileEntry;
      self.state = "";
      self.getFileSystem();
    }, self.dispatchFailure);
  }
  /**
   *
   * Open a document at the specified index. Re-read the file system afterwards.
   *
   */
  self.openDocumentAtIndex = function(idx, completion, failure)
  {
    self.completion = completion;
    self.failure = failure;
    self.state = "Opening a Document";
    self.fileSystem.root.getFile(self.documents[idx].name.trim(),
    {
      create : false,
      exclusive : false
    }, function(theFileEntry)
    {
      self.fileEntry = theFileEntry;
      self.state = "";
      self.getFileSystem();
    }, self.dispatchFailure);
  }
  self.getFileEntry = function()
  {
    return self.fileEntry;
  }

  self.getFileNameOfDocumentAtIndex = function(idx)
  {
    return self.documents[idx].name.trim();
  }
  // as part of our constructor, go ahead and read the directory so we're initialized as quickly
  // as possible.
  self.getFileSystem();
}