//playAll = plays all synths
//playLoop = plays all and loops, loopbutton has clearinterval
//synthSynth = create synthesizer based on html/user input
//synthUpdate = calls synthSynth on each synthesizer, activates on each synth click


var playAll = function(){
	//go through each note of each synth and pass it to .play()
	console.log("playAll")
	score.soprano.part.forEach(function(note){
		score.soprano.synth.play({pitch: note[0], wait: note[1], label: "label"})
	})
	score.alto.part.forEach(function(note){
		score.alto.synth.play({pitch: note[0], wait: note[1], label: "label"})
	})
	score.tenor.part.forEach(function(note){
		score.tenor.synth.play({pitch: note[0], wait: note[1], label: "label"})
	})
	score.bass.part.forEach(function(note){
		score.bass.synth.play({pitch: note[0], wait: note[1], label: "label"})
	})
}

var stopAll = function(){
	score.soprano.synth.stop("label");
	score.alto.synth.stop("label");
	score.tenor.synth.stop("label");
	score.bass.synth.stop("label");
	console.log("stop?")
}
var stopButton = document.getElementById("stop")
stopButton.addEventListener("click", function(){
	stopAll()
})

// trigger playAll() when the play button is clicked
var playButton = document.getElementById("play")
playButton.addEventListener("click", function(){
	playAll()
})

//when loop button is clicked, trigger playAll() repeatedly until loop button is clicked again
// var playLoop = function(){
// 	playAll()
// 	looper = setInterval(function(){
// 		playAll()
// 	}, score.length * 1000)
// }

// var loop = false;

// var loopButton = document.getElementById('loop')
// loopButton.addEventListener('click', function(){
// 	if (loop === false){
// 		loop = true
// 		playLoop()
// 	} else {
// 		loop = false
// 		clearInterval(looper)
// 	}
// })

//create synths from user input
var synthSynth = function(voice){
	var source = document.getElementsByName(voice + '_waveType')[0].value;
	var volume = parseFloat(document.getElementById(voice + '_vol').value);
	var panning = parseFloat(document.getElementById(voice + '_pan').value);
	
	var env_attack = parseFloat(document.getElementById(voice + '_envAtt').value);
	var env_decay = parseFloat(document.getElementById(voice + '_envDec').value);
	var env_sustain = parseFloat(document.getElementById(voice + '_envSus').value);
	var env_hold = parseFloat(document.getElementById(voice + '_envHol').value);
	var env_release = parseFloat(document.getElementById(voice + '_envRel').value);

	var fil_type = document.getElementsByName(voice + '_filterType')[0].value;
	var fil_frequency = parseFloat(document.getElementById(voice + '_filterFreq').value);
	var fil_q = parseFloat(document.getElementById(voice + '_filterQ').value);
	var fil_env_frequency = parseFloat(document.getElementById(voice + '_filterEnvFreq').value);
	var fil_env_attack = parseFloat(document.getElementById(voice + '_filterEnvAtt').value);

	var del_delayTime = parseFloat(document.getElementById(voice + '_delayTime').value);
	var del_wet = parseFloat(document.getElementById(voice + '_delayWet').value);
	var del_feedback = parseFloat(document.getElementById(voice + '_delayFeed').value);

	var vib_shape = document.getElementsByName(voice + '_vibType')[0].value;
	var vib_magnitude = parseFloat(document.getElementById(voice + '_vibMag').value);
	var vib_speed = parseFloat(document.getElementById(voice + '_vibSpe').value);
	var vib_attack = parseFloat(document.getElementById(voice + '_vibAtt').value);

	var tre_shape = document.getElementsByName(voice + '_treType')[0].value;
	var tre_magnitude = parseFloat(document.getElementById(voice + '_treMag').value);
	var tre_speed = parseFloat(document.getElementById(voice + '_treSpe').value);
	var tre_attack = parseFloat(document.getElementById(voice + '_treAtt').value);
	//create the actual wad from user input
	var newWad = new Wad({
		source: source,
		volume: volume,
		panning: panning,
		env: {
			attack: env_attack,
			decay: env_decay,
			sustain: env_sustain,
			hold: env_hold,
			release: env_release
		}
	})
	//check if filter/delay/vibrato/tremolo has power, if it does add it to wad
	if (document.getElementById(voice + '_filter_tog').checked){
		newWad.filter = {
			type: fil_type,
			frequency: fil_frequency,
			q: fil_q,
			env: {
				frequency: fil_env_frequency,
				attack: fil_env_attack
			}
		}
	} else {
		newWad.filter = null;

	}
	if (document.getElementById(voice + '_delay_tog').checked){
		newWad.delay = {
			delayTime: del_delayTime,
			wet: del_wet,
			feedback: del_feedback,
			maxDelayTime: 2
		}
	} else {
		newWad.delay = null;
	}
	if (document.getElementById(voice + '_vib_tog').checked){
		newWad.vibrato = {
			shape: vib_shape,
			magnitude: vib_magnitude,
			speed: vib_speed,
			attack: vib_attack
		}
	} else {
		newWad.vibrato = null;
	}
	if (document.getElementById(voice + '_tre_tog').checked){
		newWad.tremolo = {
			shape: tre_shape,
			magnitude: tre_magnitude,
			speed: tre_speed,
			attack: tre_attack
		}
	} else {
		newWad.tremolo = null;
	}
	return newWad
}

//update synths whenever they are changed
var synths = document.getElementsByClassName('synth')
for(var i = 0; i < synths.length; i++){
	synths[i].addEventListener("click", function(){synthUpdate()})
}
//actually update the synths
var synthUpdate = function(){
	score.soprano.synth = synthSynth("sop")
	score.alto.synth = synthSynth("alt")
	score.tenor.synth = synthSynth("ten")
	score.bass.synth = synthSynth("bas")
}
//create synths based on initial html
window.onload = function(){
	synthUpdate()
}