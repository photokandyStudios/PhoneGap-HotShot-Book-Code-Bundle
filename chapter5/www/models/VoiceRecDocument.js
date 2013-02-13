/*jshint asi:true, forin:true, noarg:true, noempty:true, eqeqeq:false, bitwise:true, undef:true, curly:true, browser:true, devel:true, smarttabs:true, maxerr:50 */
/*****************************************************************************
 *
 * VoiceRec Document
 *
 *****************************************************************************/

var DOC = DOC ||
{
};

/**
 *
 * Returns a VoiceRecDocument object with the contents of theFile loaded
 *
 */
DOC.VoiceRecDocument = function(theFileEntry, completion, failure)
{
  var self = this;
  // file and state
  self.fileEntry = theFileEntry;
  self.fileName = self.fileEntry.fullPath;
  self.fileType = PKUTIL.FILE.getFileExtensionPart(self.fileName);
  self.completion = completion;
  self.failure = failure;
  self.state = "";

  // file-specific
  self.title = PKUTIL.FILE.getFileNamePart(self.fileName);
  self.media = null;
  self.position = 0;
  self.duration = 0;
  self.playing = false;
  self.recording = false;
  self.paused = false;
  self.positionTimer = -1;
  self.durationTimer = -1;

  self.getFileName = function()
  {
    return self.fileName;
  }

  self.setFileName = function(theFileName)
  {
    self.theFileName = theFileName;
    self.fileType = PKUTIL.FILE.getFileExtensionPart(self.fileName);
    self.title = PKUTIL.FILE.getFileNamePart(self.fileName);
  }
  // for the first time, we aren't using a lot of file API stuff
  // since the media can handle itself. All we need to do is provide
  // utility functions to deal with the media.

  self.initializeMediaObject = function()
  {
    if (self.media == null)
    {
      if (PKDEVICE.platform()=="android")
      {
        console.log ("Android doesn't support file:// prepended to the media path.");
        self.fileName = self.fileName.replace ("file://","");
        // and apparently, it wants it relative!?
        self.fileName = PKUTIL.FILE.getFilePart(self.fileName);
      }
      self.media = new Media(self.fileName, self.dispatchSuccess, self.dispatchFailure);
      self.positionTimer = setInterval(self.updatePosition, 250);
      self.durationTimer = setInterval(self.updateDuration, 250);
    }
  }

  self.isPlaying = function()
  {
    return self.playing;
  }

  self.isRecording = function()
  {
    return self.recording;
  }

  self.updatePosition = function()
  {
    if (self.playing)
    {
      self.media.getCurrentPosition(function(position)
      {
        self.position = position;
      }, self.dispatchFailure);
    } else
    {
      if (self.recording)
      {
        self.position += 0.25;
        // we get called evry 250ms
      } else
      {
        self.position = 0;
      }
    }
  }

  self.updateDuration = function()
  {
    if (self.media == null)
    {
      console.log ("Media assertion: self.media is null; released, but timers running?");
      clearInterval(self.durationTimer);
    }
    if (self.media.getDuration() > -1)
    {
      self.duration = self.media.getDuration();
      clearInterval(self.durationTimer);
      self.durationTimer = -1;
    } else
    {
      self.duration--;
      if (self.duration < -20)
      {
        self.duration = -1;
        clearInterval(self.durationTimer);
        self.durationTimer = -1;
      }
    }
  }

  self.getPlaybackPosition = function()
  {
    return self.position;
  }

  self.setPlaybackPosition = function(newPosition)
  {
    self.position = newPosition;
    self.initializeMediaObject();
    self.media.seekTo(newPosition * 1000);
  }

  self.getDuration = function()
  {
    return self.duration;
  }

  self.startPlayback = function()
  {
    self.initializeMediaObject();
    self.media.play();
    self.paused = false;
    self.recording = false;
    self.playing = true;
  }

  self.pausePlayback = function()
  {
    self.initializeMediaObject();
    self.media.pause();
    self.playing = false;
    self.paused = true;
    self.recording = false;
  }

  self.releaseResources = function()
  {
    if (self.playing || self.paused)
    {
      //self.stopPlayback();
    }
    if (self.recording)
    {
      self.stopRecording();
    }
    if (self.positionTimer > -1)
    {
      console.log ("MEDIA: RELEASE: Clearing position update timer...");
      clearInterval(self.positionTimer);
    }
    if (self.durationTimer > -1)
    {
      console.log ("MEDIA: RELEASE: Clearing duration update timer...");
      clearInterval(self.durationTimer);
    }
    self.durationTimer = -1;
    self.positionTimer = -1;
    self.media.release();
    self.media = null;
  }

  self.stopPlayback = function()
  {
    self.initializeMediaObject();
    self.media.stop();
    self.isPlaying = false;
    self.isPaused = false;
    self.isRecording = false;
  }

  self.startRecording = function()
  {
    self.initializeMediaObject();
    self.media.startRecord();
    self.isPlaying = false;
    self.isPaused = false;
    self.isRecording = true;
  }

  self.stopRecording = function()
  {
    self.initializeMediaObject();
    self.media.stopRecord();
    self.isPlaying = false;
    self.isPaused = false;
    self.isRecording = false;
  }

  self.dispatchFailure = function(e)
  {
    // some sort of failure :-(
    console.log("While " + self.State + ", encountered error: " + e.target.error.code);
    if (self.failure)
    {
      self.failure(e);
    }
  }

  self.dispatchSuccess = function()
  {
    if (self.completion)
    {
      self.completion();
    }
  }
}

