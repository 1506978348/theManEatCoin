
cc.Class({
    extends: cc.Component,

    properties: {
        playTime:cc.Label,
        popScore:cc.Label,
        thisScore:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playTime.string = time;
        this.popScore.string = cc.sys.localStorage.getItem('score');
        this.thisScore.string = score;
    },

    restartBtn(){
        cc.director.loadScene('log');
    },  
    start () {

    },

    // update (dt) {},
});
