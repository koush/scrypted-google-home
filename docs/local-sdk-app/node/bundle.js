!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";const r=new smarthome.App("1.0.0");r.onIdentify(async e=>{var t;console.debug("IDENTIFY request:",e);if("scrypted-gh"!==(null===(t=e.inputs[0].payload.device.mdnsScanData)||void 0===t?void 0:t.type))throw console.error("mdns type not 'scrypted-gh'"),Error("mdns type not 'scrypted-gh'");return{intent:smarthome.Intents.IDENTIFY,requestId:e.requestId,payload:{device:{id:"local-hub-id",isProxy:!0,isLocalOnly:!0}}}}).onReachableDevices(e=>{console.debug("REACHABLE_DEVICES request:",e);const t=e.devices.map(e=>({verificationId:e.id})).filter(e=>"local-hub-id"!==e.verificationId);return{intent:smarthome.Intents.REACHABLE_DEVICES,requestId:e.requestId,payload:{devices:t}}}).onQuery(async e=>{try{console.debug("QUERY request",e);const t=new smarthome.DataFlow.HttpRequestData;t.requestId=e.requestId,t.deviceId=e.inputs[0].payload.devices[0].id,t.method=smarthome.Constants.HttpOperation.POST,t.port=10080,t.path="/endpoint/@scrypted/google-home/public",t.dataType="application/json",delete e.devices,t.data=JSON.stringify(e);try{const e=await r.getDeviceManager().send(t);console.log("COMMAND result",e);const o=e.httpResponse.body,n=JSON.parse(o);return console.log("QUERY result",n),n}catch(e){throw console.error("QUERY error",e),e}}catch(e){throw console.error("QUERY failure",e),e}}).onExecute(async e=>{try{console.debug("EXECUTE request",e);const t=new smarthome.DataFlow.HttpRequestData;t.requestId=e.requestId,t.deviceId=e.inputs[0].payload.commands[0].devices[0].id,t.method=smarthome.Constants.HttpOperation.POST,t.port=10080,t.path="/endpoint/@scrypted/google-home/public",t.dataType="application/json",delete e.devices,t.data=JSON.stringify(e);try{const e=await r.getDeviceManager().send(t);console.log("COMMAND result",e);const o=e.httpResponse.body,n=JSON.parse(o);return console.log("EXECUTE result",n),n}catch(e){throw console.error("EXECUTE error",e),e}}catch(e){throw console.error("EXECUTE failure",e),e}}).listen().then(()=>{console.log("Ready")})}]);