//
//  PKVideoThumbnail.h
//  Memry
//
//  Created by Kerri Shotts on 8/24/12.
//
//

#import <Cordova/CDVPlugin.h>

@interface PKVideoThumbnail : CDVPlugin

 #if CORDOVA_VERSION_MIN_REQUIRED <= __CORDOVA_2_0_0
- (void) createThumbnail:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
 #else
- (void) createThumbnail:(CDVInvokedUrlCommand*)command;
 #endif


@end
