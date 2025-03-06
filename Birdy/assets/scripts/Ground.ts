import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import { GameController } from './GameController';

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type:Node,
        tooltip:'Ground 1 is here'
    })

    public ground1: Node;

    @property({
        type:Node,
        tooltip:'Ground 2 is here'
    })

    public ground2: Node;

    @property({
        type:Node,
        tooltip:'Ground 3 is here'
    })

    public ground3: Node;

    public ground1Width:number;
    public ground2Width:number;
    public ground3Width:number;

    public tempGround1Location = new Vec3;
    public tempGround2Location = new Vec3;
    public tempGround3Location = new Vec3;

    public GameControl = new GameController;
    public gameSpeed: number;
    onLoad(){
        this.startUp();
    }

    startUp(){
        this.ground1Width = this.ground1.getComponent(UITransform).width
        this.ground2Width = this.ground2.getComponent(UITransform).width
        this.ground3Width = this.ground3.getComponent(UITransform).width
 
        this.tempGround1Location.x = 0;
        this.tempGround2Location.x = this.ground1Width;
        this.tempGround3Location.x = this.ground1Width + this.ground2Width;

        this.ground1.setPosition(this.tempGround1Location);
        this.ground2.setPosition(this.tempGround2Location);
        this.ground3.setPosition(this.tempGround3Location);
    }

    update(deltaTime: number) {

        this.gameSpeed  = this.GameControl.speed;

        this.tempGround1Location = this.ground1.position;
        this.tempGround2Location = this.ground2.position;
        this.tempGround3Location = this.ground3.position;


        this.tempGround1Location.x -= this.gameSpeed * deltaTime;
        this.tempGround2Location.x -= this.gameSpeed * deltaTime;
        this.tempGround3Location.x -= this.gameSpeed * deltaTime;
        

        // const scene = director.getScene();
        // const canvas = scene.getComponentInChildren(Canvas);
        // const canvasWidth = canvas.getComponent(UITransform).width;


        if (this.tempGround1Location.x <= -this.ground1Width) {
            this.tempGround1Location.x = this.tempGround3Location.x + this.ground3Width;
        }
    
        if (this.tempGround2Location.x <= -this.ground2Width) {
            this.tempGround2Location.x = this.tempGround1Location.x + this.ground1Width;
        }
    
        if (this.tempGround3Location.x <= -this.ground3Width) {
            this.tempGround3Location.x = this.tempGround2Location.x + this.ground2Width;
        }
        
        this.ground1.setPosition(this.tempGround1Location);
        this.ground2.setPosition(this.tempGround2Location);
        this.ground3.setPosition(this.tempGround3Location);
        
    }
}


