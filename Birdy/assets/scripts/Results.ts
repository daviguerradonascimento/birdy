import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    
    @property({
        type:Label
    })
    public scoreLabel: Label;

    @property({
        type:Label
    })
    public highScore: Label;

    @property({
        type:Label
    })
    public resultLabel: Label;

    maxScore: number = 0;
    currentScore: number = 0;

    updateScore(score:number){
        this.currentScore = score;

        this.scoreLabel.string = ('' + this.currentScore);

    }

    resetScore(){
        this.updateScore(0);

        this.showResults();
    }

    addScore(){

        this.updateScore(this.currentScore + 1);

    }

    showResults(){
        this.maxScore = Math.max(this.maxScore, this.currentScore)

        this.highScore.string = 'High Score: ' + this.maxScore

        this.resultLabel.node.active = true;
        this.highScore.node.active = true;

        
    }

    hideResults(){
        this.resultLabel.node.active = false;
        this.highScore.node.active = false;
    }

}


