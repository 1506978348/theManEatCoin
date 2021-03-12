
const MIN_LENGTH = 50;
cc.Class({
    extends: cc.Component,

    properties: {
        tiledMap: cc.TiledMap,
        player: cc.Prefab,
        coin: cc.Prefab,
        enemy: cc.Prefab,
        skill: cc.Prefab,
        enemyNum: 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.sys.localStorage.removeItem('score');//删除本地存储
        gameState = 1;
        this.position = [];
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = true;
        this.addCollider("wall", "wall");
        this.popPosition();
        this.playerNode = null;
        this.playerSetPos();
        // this.enemySetPos();//取消生成enemy
        this.coinArr = [];
        this.coinSetPos();
        this.rotation = null;
        this.addEventHandler();
    },
    addCollider(oldObj, newObj) {
        let tiledSize = this.tiledMap.getTileSize();
        let layer = this.tiledMap.getLayer(oldObj);
        let layerSize = layer.getLayerSize();

        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {
                    tiled.node.group = newObj;
                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.friction = 0;
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    collider.apply();
                }
            }
        }
    },
    popPosition() {
        let tiledSize = this.tiledMap.getTileSize();
        let layer = this.tiledMap.getLayer("ground");
        let layerSize = layer.getLayerSize();
        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {
                    this.position.push(this.openglToScreen(this.tileToScreen(cc.v2(tiled.x, tiled.y))))
                    gird.push({ x: i, y: j });
                    positions = this.position;
                }
            }
        }
    },
    tileToScreen(pos) {
        let mapSize = this.tiledMap.getMapSize();
        let tiledSize = this.tiledMap.getTileSize();
        let x = pos.x * tiledSize.width + tiledSize.width / 2;
        let y = (mapSize.height - pos.y) * tiledSize.height - tiledSize.height / 2;
        return cc.v2(x, y)
    },
    openglToScreen(pos) {
        let mapSize = this.tiledMap.getMapSize();
        let tiledSize = this.tiledMap.getTileSize();
        let x = pos.x - mapSize.width * tiledSize.width / 2;
        let y = pos.y - mapSize.height * tiledSize.height / 2;
        return cc.v2(x, y);
    },
    playerSetPos() {
        this.playerNode = cc.instantiate(this.player);
        let pos = Math.floor(Math.random() * this.position.length)
        this.playerNode.setPosition(this.position[pos]);
        this.position = this.removeItemFromArray(this.position[pos], this.position);
        this.node.getChildByName('playerNode').addChild(this.playerNode);
        let body = this.playerNode.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Dynamic;
        body.enabledContactListener = true;
        body.gravityScale = 0;
        body.fixedRotation = true;
        let collider = this.playerNode.addComponent(cc.PhysicsCircleCollider);
        collider.friction = 0;
        collider.offset = cc.v2(0, 0);
        collider.radius = this.playerNode.width / 2;
        collider.apply();
    },
    // enemySetPos() {
    //     for (let i = 0; i < this.enemyNum; i++) {
    //         this.enemyNode = cc.instantiate(this.enemy);
    //         let pos = Math.floor(Math.random() * this.position.length)
    //         this.enemyNode.setPosition(this.position[pos]);
    //         this.position = this.removeItemFromArray(this.position[pos], this.position);
    //         this.node.getChildByName('enemyNode').addChild(this.enemyNode);
    //     }
    // },
    coinSetPos() {
        for (let i = 0; i < this.position.length; i++) {
            let coinNode = cc.instantiate(this.coin);
            coinNode.setPosition(this.position[i])
            // this.position = this.removeItemFromArray(this.position[i], this.position);
            this.node.getChildByName('coinNode').addChild(coinNode);
            this.coinArr.push(coinNode);
        }
        // this.coinAddCollider();
    },
    removeItemFromArray(item, itemArr) {
        return itemArr.filter(value => {
            return value !== item;
        })
    },
    addEventHandler() {
        this.node.on('touchstart', (event) => {
            this.startPoint = event.getLocation();
        });
        this.node.on('touchend', (event) => {
            this.endPoint = event.getLocation();
            let vec = this.endPoint.sub(this.startPoint);
            if (vec.mag() > MIN_LENGTH) {
                if (Math.abs(vec.x) > Math.abs(vec.y)) {
                    //x
                    if (vec.x > 0) {
                        this.rotation = 'right';
                    } else {
                        this.rotation = 'left';
                    }
                } else {
                    //y
                    if (vec.y > 0) {
                        this.rotation = 'up';
                    } else {
                        this.rotation = 'down';
                    }
                }
            }
        })
    },
    start() {
        let a = 0;
        setInterval(() => {
            if (gameState) {
                let skillNode = cc.instantiate(this.skill);
                let pos = Math.floor(Math.random() * positions.length)
                skillNode.setPosition(positions[pos]);
                this.node.getChildByName('skill').addChild(skillNode);
            }
        }, 15000);
        setInterval(() => {
            if (gameState) {
                a++;
                cc.find('Canvas/gameNode/Time/timeLabel').getComponent(cc.Label).string = a + ' s';
            }
        }, 1000);
        setInterval(() => {
            if(gameState){
                this.addCoin();
            }
        }, 5000);
    },
    addCoin(){
        cc.log('-----position',empty)
        // for(let i = 0;i<positions.length;i++){
        //     let a = Math.random()
        //     if(positions[i].x==null && positions[i].y ==null){
        //         positions[i] = this.position[i];
        //         let coinNode = cc.instantiate(this.coin);
        //         coinNode.setPosition(this.position[i]);
        //         this.node.getChildByName('coinNode').addChild(coinNode);
        //         this.coinArr.push(coinNode);
        //     }
        // }
        for(let i=0;i<empty.length;i++){
            let coinNode = cc.instantiate(this.coin);
            coinNode.setPosition(cc.v2(empty[i].x,empty[i].y));
            this.node.getChildByName('coinNode').addChild(coinNode);
        }
        empty = [];

    },

    update(dt) {
        if (this.rotation !== null) {
            if (this.rotation == 'up') {
                this.playerNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 200)
            } else if (this.rotation == 'down') {
                this.playerNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200)
            } else if (this.rotation == 'left') {
                this.playerNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200, 0)
            } else if (this.rotation == 'right') {
                this.playerNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(200, 0)
            }
        }
    },
});
