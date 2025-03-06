import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    
    @property({
        type:CCFloat,
        tooltip: 'max fly height'
    })
    public jumpHeight:number = 3.5;

    @property({
        type:CCFloat,
        tooltip: 'max fly time'
    })
    public jumpDuration:number = 3.5;

    public playerAnimation: Animation;
    public playerLocation: Vec3;
    public hit:boolean;

    onLoad(){
        this.resetPlayer();

        this.playerAnimation = this.node.getComponent(Animation);
    }

    resetPlayer(){
        this.playerLocation = new Vec3(0,0,0)

        this.node.setPosition(this.playerLocation)
        this.hit = false;
    }

    fly(){
        this.playerAnimation.stop();

        tween(this.node.position).to(this.jumpDuration, new Vec3(this.node.position.x,this.node.position.y + this.jumpHeight,0), {easing: "smooth", onUpdate:(target: Vec3, ratio:number) => {this.node.position = target;}}).start();

        this.playerAnimation.play();

    }
}


