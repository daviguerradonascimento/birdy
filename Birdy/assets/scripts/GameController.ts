import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, director, CCFloat, Collider2D, IPhysics2DContact, Contact2DType} from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Player } from './Player';
import { PipePool } from './PipePool';
import { PlayerAudio } from './PlayerAudio';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    
    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: CCFloat,
    })
    public speed: CCFloat = 300;

    @property({
        type: Player,
    })
    public player: Player;

    @property({
        type: PipePool,
    })
    public pipePool: PipePool;

    @property({
        type: PlayerAudio,
    })
    public playerAudio: PlayerAudio;

    @property({
        type: Results,
        tooltip: 'this is results'
    })
    public results: Results;

    @property({
        type: CCFloat,
    })
    public pipeSpeed: CCFloat = 200;

    onLoad(){
        this.initListener();
        this.pipePool.reset();
        this.results.resetScore;
        this.isOver = true;
        director.pause();
    }

    public isOver:boolean;

    initListener(){
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        
        this.node.on(Node.EventType.TOUCH_START, () => {

            if(this.isOver == true){
                this.resetGame();
                this.player.resetPlayer();
                this.resetGame();
            }else{
                this.player.fly();
                this.playerAudio.onAudioQueue(0);
            }
            
        })
    }
    
    startGame(){
        this.results.hideResults();
        director.resume();
    }

    gameOver(){
        this.results.showResults();
        this.isOver = true;
        this.playerAudio.onAudioQueue(3);
        director.pause();
    }

    resetGame(){
        this.results.resetScore();
        this.pipePool.reset();
        this.isOver = false;
        this.startGame();
    }

    passPipe(){
        this.results.addScore();
        this.playerAudio.onAudioQueue(1);
    }
    
    createPipe(){
        this.pipePool.addPool();
    }

    contactGroudPipe(){
        let collider = this.player.getComponent(Collider2D)

        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact){
        this.player.hit = true;
        this.playerAudio.onAudioQueue(2);
    }

    playerStruck(){
        this.contactGroudPipe()

        if(this.player.hit == true){
            this.gameOver();
        }
    }

    update(){
        if(!this.isOver){
            this.playerStruck();
        }
    }

}


