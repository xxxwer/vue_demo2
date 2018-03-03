'use strict';

import config from '@/config/config'

let wsUri = config.webSocket;
let websocket;
let init = function(MsgCallback) {
    let myws = new myWS(MsgCallback);
    initWebSocket(myws);
    return myws;
}

function myWS(MsgCallback)
{
    this.config = {};
    this.config.type = 'debug';
    this.coreMsgCallback = MsgCallback;
}

myWS.prototype.onOpen = function(evt) {
    let msg = {};
    msg.route = 'init';
    this.doSend(JSON.stringify(msg));
}
myWS.prototype.onClose = function(evt) {
    console.error(evt)
}
myWS.prototype.onMessage = function(evt) {
    this.coreMsgCallback(evt)
}
myWS.prototype.onError = function(evt) {
    console.error(evt)
}
myWS.prototype.doSend = function(message) {
    websocket.send(message);
}
myWS.prototype.doSendMsg = function(data, to){
    let msg = {};
    msg.route = 'send_msg';
    msg.data = data;
    msg.to = to;

    this.doSend(JSON.stringify(msg));
}

function initWebSocket(myws) {
    websocket = new WebSocket(wsUri);

    websocket.onopen = function(evt) {
        myws.onOpen(evt)
    };
    websocket.onclose = function(evt) {
        myws.onClose(evt)
    };
    websocket.onmessage = function(evt) {
        myws.onMessage(evt)
    };
    websocket.onerror = function(evt) {
        myws.onError(evt)
    };
}

export default init
