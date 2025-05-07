import * as Tone from 'tone';
let bgPlayer: Tone.Player;
let lowPass : Tone.Filter;

export async function playBackgroundMusic(distort:boolean) {
    if (!bgPlayer){

    bgPlayer = new Tone.Player({
        url : '/8bit.mp3',
        loop : true,
        
    }).toDestination();
    lowPass = new Tone.Filter(200, 'lowpass').toDestination();
    await Tone.loaded();
    bgPlayer.start();
    }

    if (distort){
        bgPlayer.disconnect().chain(lowPass);
    }else {
        bgPlayer.disconnect(lowPass).toDestination();
    }
}

export async function playFX(){
    const effectsPlayer = new Tone.Player({
        url : '/rock.mp3',
        loop : false,
    }).toDestination();

    await Tone.loaded();
    effectsPlayer.start();
}