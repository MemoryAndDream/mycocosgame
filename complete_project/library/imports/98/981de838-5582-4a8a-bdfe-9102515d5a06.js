"use strict";
cc._RF.push(module, '981deg4VYJKir3+kQJRXVoG', 'music');
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