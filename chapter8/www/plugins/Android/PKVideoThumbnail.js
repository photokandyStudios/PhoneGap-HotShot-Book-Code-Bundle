/*
 * PKVideoThumbnail
 */
var PKVideoThumbnail = PKVideoThumbnail || {};

PKVideoThumbnail.createThumbnail = function ( source, target, success, failure )
{
  console.log ("Attempting to extract the thumbnail from " + source + " and save it to " + target );
  cordova.exec(success, failure,
              "PKVideoThumbnail",
              "createThumbnail",
              [source, target]);
}
