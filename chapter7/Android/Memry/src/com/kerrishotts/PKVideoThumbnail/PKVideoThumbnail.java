package com.kerrishotts.PKVideoThumbnail;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.media.*;
import android.provider.MediaStore;

import java.io.*;

/**
 * This class echoes a string called from JavaScript.
 */
public class PKVideoThumbnail extends Plugin {

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action        The action to execute.
     * @param args          JSONArry of arguments for the plugin.
     * @param callbackId    The callback id used when calling back into JavaScript.
     * @return              A PluginResult object with a status and message.
     */
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        try {
            if (action.equals("createThumbnail")) {
                String sourceVideo = args.getString(0);
                String targetImage = args.getString(1);
                
                Bitmap thumbnail = ThumbnailUtils.createVideoThumbnail ( sourceVideo.substring(7), MediaStore.Images.Thumbnails.MINI_KIND);
                
                FileOutputStream theOutputStream;
                try
                {
                	File theOutputFile = new File (targetImage.substring(7));
                	if (!theOutputFile.exists())
                	{
                		if (!theOutputFile.createNewFile())
                		{
                			return new PluginResult(PluginResult.Status.ERROR, "Could not save thumbnail.");
                		}
                	}
                	if (theOutputFile.canWrite())
                	{
                		theOutputStream = new FileOutputStream (theOutputFile);
                		if (theOutputStream != null)
                		{
                			thumbnail.compress(CompressFormat.JPEG, 75, theOutputStream);
                		}
                		else
                		{
                			return new PluginResult(PluginResult.Status.ERROR, "Could not save thumbnail; target not writeable.");
                		}
                	}
                }
                catch (IOException e)
                {
                	e.printStackTrace();
                	return new PluginResult(PluginResult.Status.IO_EXCEPTION, "I/O exception saving thumbnail.");
                }
                
                return new PluginResult (PluginResult.Status.OK, targetImage );
                
            } else {
                return new PluginResult(PluginResult.Status.INVALID_ACTION);
            }
        } catch (JSONException e) {
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        }
    }
}
