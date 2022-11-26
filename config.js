/** 
 * Config file for nonsensitive data
 */

const fetchDataFromSave = require('./function/fetchDataFromSave.js');

module.exports.christmasShit = ["christmas", "Weihnachten"];
module.exports.prefix = "&";
module.exports.welcomeMessages = ["just joined the server", "sneaked on to the server", "is now roaming the server", "got lost and ended up here", "traveled here", "finally arrived", "doesn't really want to be here", "resides among us now", "has entered the chat",];
module.exports.goodbyeMessages = ["left the server", "was banished", "got lost and left", "got tired and left", "is no longer among us", "has left the chat", "has left the server", "has been banished", "is no longer roaming the server", "is no longer here", "is no longer in the server", "is no longer in the chat", "is no longer roaming the chat"];
module.exports.allowedChannelsIDs = fetchDataFromSave.get("allowedChannels");
module.exports.counterChannelID = fetchDataFromSave.get("counterChannel");
module.exports.welcomeChannelID = fetchDataFromSave.get("welcomeChannel");
module.exports.goodbyeChannel = fetchDataFromSave.get("goodbyeChannel");
