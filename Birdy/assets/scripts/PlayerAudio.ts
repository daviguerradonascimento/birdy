import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerAudio')
export class PlayerAudio extends Component {

    @property({
        type: [AudioClip]
    })
    public clip:AudioClip[] = [];

    @property({
        type: AudioSource
    })
    public audioSource:AudioSource = null!;

    onAudioQueue(index: number){
        let individualClip: AudioClip = this.clip[index]

        this.audioSource.playOneShot(individualClip);
    }

}


