(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/music.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '981deg4VYJKir3+kQJRXVoG', 'music', __filename);
// scripts/music.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        }
    },
    play: function play() {
        this.audioSource.play();
    },
    pause: function pause() {
        this.audioSource.pause();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=music.js.map
        