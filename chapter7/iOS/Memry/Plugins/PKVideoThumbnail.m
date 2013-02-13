//
//  PKVideoThumbnail.m
//  Memry
//
//  Created by Kerri Shotts on 8/24/12.
//
//

#import "PKVideoThumbnail.h"
#import <Cordova/CDVPluginResult.h>
#import <AVFoundation/AVFoundation.h>
#import <AVFoundation/AVAsset.h>

#import <MediaPlayer/MediaPlayer.h>

@implementation PKVideoThumbnail

BOOL extractVideoThumbnail ( NSString *theSourceVideoName,
                             NSString *theTargetImageName )
{

    UIImage *thumbnail;
    
    // BASED ON http://stackoverflow.com/a/6432050 //
    MPMoviePlayerController *mp = [[MPMoviePlayerController alloc]
      initWithContentURL: [NSURL URLWithString:theSourceVideoName] ];
    mp.shouldAutoplay = NO;
    mp.initialPlaybackTime = 1;
    mp.currentPlaybackTime = 1;
    // get the thumbnail
    thumbnail = [mp thumbnailImageAtTime:1
                             timeOption:MPMovieTimeOptionNearestKeyFrame];
    [mp stop];
    [mp release];
    
/*
    // BASED ON http://stackoverflow.com/a/11804061 //
    AVAsset *asset = [AVAsset assetWithURL:theSourceVideoName];
    AVAssetImageGenerator *imageGenerator = [[AVAssetImageGenerator alloc]initWithAsset:asset];
    CMTime time = CMTimeMake(1, 1);
    thumbnail = [UIImage imageWithCGImage:[imageGenerator copyCGImageAtTime:time actualTime:NULL error:NULL]];
 */

    // write out the thumbnail; a return of NO will be a failure.
    return [UIImageJPEGRepresentation ( thumbnail, 1.0) writeToFile:theTargetImageName atomically:YES];
}


 #if CORDOVA_VERSION_MIN_REQUIRED <= __CORDOVA_2_0_0
- (void) createThumbnail:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    NSString* callbackId = [arguments objectAtIndex:0];

    CDVPluginResult* pluginResult = nil;
    NSString* javaScript = nil;

    @try {
        NSString* theSourceVideoName = [arguments objectAtIndex:1];
        NSString* theTargetImageName = [arguments objectAtIndex:2];
        
        if ( extractVideoThumbnail(theSourceVideoName, theTargetImageName) )
        {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theTargetImageName];
            javaScript = [pluginResult toSuccessCallbackString:callbackId];
        }
        else
        {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:theTargetImageName];
            javaScript = [pluginResult toErrorCallbackString:callbackId];
        }
    } @catch (NSException* exception) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_JSON_EXCEPTION messageAsString:[exception reason]];
        javaScript = [pluginResult toErrorCallbackString:callbackId];
    }

    [self writeJavascript:javaScript];
}
 #else
- (void) createThumbnail:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* javaScript = nil;

    @try {
        NSString* theSourceVideoName = [command.arguments objectAtIndex:0];
        NSString* theTargetImageName = [command.arguments objectAtIndex:1];
        
        if ( extractVideoThumbnail(theSourceVideoName, theTargetImageName) )
        {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theTargetImageName];
            javaScript = [pluginResult toSuccessCallbackString:command.callbackId];
        }
        else
        {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:theTargetImageName];
            javaScript = [pluginResult toErrorCallbackString:command.callbackId];
        }
    } @catch (NSException* exception) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_JSON_EXCEPTION messageAsString:[exception reason]];
        javaScript = [pluginResult toErrorCallbackString:command.callbackId];
    }

    [self writeJavascript:javaScript];
}
 #endif




@end
