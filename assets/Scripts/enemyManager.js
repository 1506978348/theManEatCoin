
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.enemyRotation = null;
    },

    start() {
        let up = cc.tween().by(2.5, { position: cc.v2(0, 150) })
        let down = cc.tween().by(1.5, { position: cc.v2(0, -150) })
        let left = cc.tween().by(1.7, { position: cc.v2(-150, 0) })
        let right = cc.tween().by(2.3, { position: cc.v2(150, 0) })
        if (this.node.name == 'enemy1') {
            cc.tween(this.node)
                .repeatForever(
                    cc.tween(this.node).then(up).then(down).then(down).then(up).then(right).then(left)
                )
                .start();
        }else if(this.node.name == 'enemy2'){
            cc.tween(this.node)
                .repeatForever(
                    cc.tween(this.node).then(left).then(right).then(down).then(up).then(right).then(left)
                )
                .start();
        }else if(this.node.name == 'enemy3'){
            cc.tween(this.node)
                .repeatForever(
                    cc.tween(this.node).then(up).then(down).then(right).then(left).then(left).then(right)
                )
                .start();
        }else if(this.node.name == 'enemy4'){
            cc.tween(this.node)
                .repeatForever(
                    cc.tween(this.node).then(down).then(up).then(right).then(left).then(left).then(right)
                )
                .start();
        }else if(this.node.name == 'enemy5'){
            cc.tween(this.node)
                .repeatForever(
                    cc.tween(this.node).then(up).then(up).then(down).then(down).then(down).then(down).then(up).then(up)
                )
                .start();
        }

    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        let velocity = this.node.getComponent(cc.RigidBody).linearVelocity;
        if (otherCollider.node.group == 'wall') {
            // let a = Math.floor(Math.random() * 2);
        }
    },

    update(dt) {

    },
});
