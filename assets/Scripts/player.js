
// require('./gameManager.js');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.hp_label = cc.find('Canvas/gameNode/Hp/hp_').getComponent(cc.Sprite);
        this.score = cc.find("Canvas/gameNode/Score/scoreLabel").getComponent(cc.Label)
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == 'skill') {
            if (otherCollider.node.name == 'skill') {
                //技能
                if (this.hp_label.fillRange >= 1) {//do nothing
                } else {
                    this.hp_label.fillRange += 0.2
                }
            } else {
                // this.removeItemFromArray(otherCollider.node,this.coinArr)
                let pos  = cc.v2(otherCollider.node.x,otherCollider.node.y);
                empty.push(pos);
                //加分数
                this.score.string = Number(this.score.string) + 10;

            }
            otherCollider.node.removeFromParent(false);
            //从数组中删除元素
        };
        if (otherCollider.node.group == 'enemy') {
            //减少生命
            if (this.hp_label.fillRange <= 0.2) {
                cc.log('gameOver')
                gameState = 0;
                time = cc.find('Canvas/gameNode/Time/timeLabel').getComponent(cc.Label).string
                score = this.score.string;
                if (!cc.sys.localStorage.getItem('score') || cc.sys.localStorage.getItem('score') < this.score.string) {
                    cc.sys.localStorage.setItem('score', this.score.string);
                }

                setTimeout(() => {
                    cc.director.loadScene('gameOver');
                }, 100);
            }
            cc.log(this.hp_label);
            this.hp_label.fillRange -= 0.2;
        }
    },
    onEndContact: function (contact, selfCollider, otherCollider) {

    },
    
    start() {

    },

    update(dt) {
        // if(this.hp_label.fillRange <= 0){
        //     cc.log('gameOver')
        // }
    },
});
