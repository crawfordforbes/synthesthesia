//setSynths = takes head (or string to create oscillators)
//waveMaker = selects wave (sine, sawtooth, etc) based on letter
//filterSelect = selects waveform for filter (highpass, band, etc)
//envMaker = sets envelope based on string, calls waveMaker
//filterMaker = sets filter based on string, calls filterSelect
//delayMaker = sets delay based on string
//vibratoMaker = sets vibrato based on string, calls waveMaker
//tremoloMaker = sets tremolo based on string, calls waveMaker
//stringSlicer = takes one string and scale, splits into four parts (one for each synth), passes newly created strings and scale choice to melodyMaker 
//melodyMaker = sets pitch and wait time for each note based on passed string
//scaleSelect = select scale based on radio buttons

//get ip/uri for ajax call
var ip = document.getElementById("ip").value
//get input from user 
var user_input = document.getElementById("user_option");
//submit button;
var submit_text = document.getElementById("submit_text");

submit_text.addEventListener("click", function(){
	score.bass.part = [];
	// score.bass.synth = {};
	score.tenor.part = [];
	// score.tenor.synth = {};
	score.alto.part = [];
	// score.alto.synth = {};
	score.soprano.part = [];
	// score.soprano.synth = {};
	if(user_input.value.slice(0,7)==="http://"){
		ajax_request()
	} else {
		text_to_sound()
	}
})

//turn submitted text into melodies
var text_to_sound = function(){
	console.log("text_to_sound")
	var input = user_input.value.replace(/[^a-zA-Z]/g, "");
	var input_adder = input;
	console.log("input length before while is " + input.length)
	while(input.length < 100){
		input += input_adder
	}
	if(input.length >= 100){
		console.log("input is " + input.length + " letters long")
		scaleSelect();
		setSynths(input);
		stringSlicer(input, scale);
		synthUpdate();
		playAll();
	} else {
		console.log("hmm")
	}
	

}
//post url to server, get head and body of requested url and use that to set synth settings and notes
var ajax_request = function(){
	console.log("making ajax request")
	var xhr = new XMLHttpRequest();
	xhr.open("POST", ip + "url")
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.addEventListener("load", function(){
		var response = JSON.parse(xhr.response)
		//choose a scale from dropdown
		scaleSelect();
		//create synths from head of response
		setSynths(response.head);
		//create notes from body of response
		stringSlicer(response.body, scale);
		synthUpdate();
		setTimeout(playAll, 1000);
	})
	var site = JSON.stringify({site: user_input.value})
	xhr.send(site)
}
var setSynths = function(string){
	//create one array of the entire string divided by 4
	var stringArr = [string.slice(0, Math.floor(string.length / 4)), string.slice(Math.floor(string.length / 4), Math.floor(string.length / 2)), string.slice(Math.floor(string.length / 2), Math.floor(string.length / 4 * 3)), string.slice(Math.floor(string.length / 4 * 3), string.length)]
	console.log(stringArr[0][0] + stringArr[0][1] + "/" + stringArr[1][0] + stringArr[1][1] + "/" + stringArr[2][0] + stringArr[2][1] + "/" + stringArr[3][0] + stringArr[3][1])

	//the length of the string determines which synth settings can be created, the longer the string the more settings used
	if(stringArr[3].length >= 8){
		console.log("Last string in stringArr is " + stringArr[3].length + " characters long")
		envMaker(stringArr[0], "sop")
		envMaker(stringArr[1], "alt")
		envMaker(stringArr[2], "ten")
		envMaker(stringArr[3], "bas")
	}
	if (stringArr[3].length >= 14){
		filterMaker(stringArr[0], "sop")
		filterMaker(stringArr[1], "alt")
		filterMaker(stringArr[2], "ten")
		filterMaker(stringArr[3], "bas")
	}
	if (stringArr[3].length >= 18){
		delayMaker(stringArr[0], "sop")
		delayMaker(stringArr[1], "alt")
		delayMaker(stringArr[2], "ten")
		delayMaker(stringArr[3], "bas")
	}
	if (stringArr[3].length >= 24){
		vibratoMaker(stringArr[0], "sop")
		vibratoMaker(stringArr[1], "alt")
		vibratoMaker(stringArr[2], "ten")
		vibratoMaker(stringArr[3], "bas")
	}
	if (stringArr[3].length >= 28){
		tremoloMaker(stringArr[0], "sop")
		tremoloMaker(stringArr[1], "alt")
		tremoloMaker(stringArr[2], "ten")
		tremoloMaker(stringArr[3], "bas")
	}
}

//select one of four waveforms based on passed letter
var waveMaker = function(letter) {
	if (numbers.indexOf(letter.toLowerCase()) < 6) {
		return "sawtooth"
	} else if (numbers.indexOf(letter.toLowerCase()) < 12) {
		return "square"
	} else if (numbers.indexOf(letter.toLowerCase()) < 18) {
		return "sine"
	} else {
		return "triangle"
	}
}

//select a filter based on letter passed
var filterSelect = function(letter) {
	if (numbers.indexOf(letter) < 6){
		return "highpass"
	} else if (numbers.indexOf(letter) < 12){
		return "bandpass"
	} else if (numbers.indexOf(letter) < 18){
		return "notch"
	} else if (numbers.indexOf(letter) < 24){
		return "lowshelf"
	} else if (numbers.indexOf(letter) < 30){
		return "highshelf"
	} else if (numbers.indexOf(letter) < 36){
		return "peaking"
	} else if (numbers.indexOf(letter) < 42){
		return "allpass"
	} else {
		return "lowpass"
	}
}

//create synth envelope based on passed string
var envMaker = function(string, voice){
	document.getElementsByName(voice + '_waveType')[0].value = waveMaker(string[0])
	document.getElementById(voice + '_vol').value = (numbers.indexOf(string[1].toUpperCase()))/52;
	document.getElementById(voice + '_pan').value = (numbers.indexOf(string[2])/26) - 1;
	document.getElementById(voice + '_envAtt').value = (numbers.indexOf(string[3])/208) + .05;
	document.getElementById(voice + '_envDec').value = numbers.indexOf(string[4])/26;
	document.getElementById(voice + '_envSus').value = numbers.indexOf(string[5])/52;
	document.getElementById(voice + '_envHol').value = numbers.indexOf(string[6])/10;
	document.getElementById(voice + '_envRel').value = numbers.indexOf(string[7])/15;
}

//create filter for synth based on passed string
var filterMaker = function(string, voice){
	if(numbers.indexOf(string[8]) % 4 === 0) {
		document.getElementById(voice + "_filter_tog").checked = true
	};
	document.getElementsByName(voice + '_filterType')[0].value = filterSelect(string[9]);
	document.getElementById(voice + '_filterFreq').value = numbers.indexOf(string[10]) * numbers.indexOf(string[10]) / 2;
	document.getElementById(voice + '_filterQ').value = numbers.indexOf(string[11]) / 5.2;
	document.getElementById(voice + '_filterEnvFreq').value = numbers.indexOf(string[12]) * numbers.indexOf(string[12]) / 2;
	document.getElementById(voice + '_filterEnvAtt').value = numbers.indexOf(string[13]) / 26;
}
//create delay for synth based on passed string
var delayMaker = function(string, voice){
	if(numbers.indexOf(string[14]) % 8 === 0){
		document.getElementById(voice + "_delay_tog").checked = true
	};
	document.getElementById(voice + '_delayTime').value = (numbers.indexOf(string[15]) / 13);
	document.getElementById(voice + '_delayWet').value = numbers.indexOf(string[16]) / 48;
	document.getElementById(voice + '_delayFeed').value = numbers.indexOf(string[17]) / 52;
}

//create vibrato settings for synth based on passed string
var vibratoMaker = function(string, voice){
	if(numbers.indexOf(string[18]) % 4 === 0){
		document.getElementById(voice + "_vib_tog").checked = true;
	}
	document.getElementsByName(voice + '_vibType')[0].value = waveMaker(string[19]);
	document.getElementById(voice + '_vibMag').value = numbers.indexOf(string[20]) / 5;
	document.getElementById(voice + '_vibSpe').value = numbers.indexOf(string[21]) / 5;
	document.getElementById(voice + '_vibAtt').value = numbers.indexOf(string[22]) / 18;
}

//create tremolo settings for synth based on passed string
var tremoloMaker = function(string, voice){
	if(numbers.indexOf(string[23]) % 6 === 0){
		document.getElementById(voice + '_tre_tog').checked = true;
	}
	document.getElementsByName(voice + '_treType')[0].value = waveMaker(string[24]);
	document.getElementById(voice + '_treMag').value = numbers.indexOf(string[25]) / 5;
	document.getElementById(voice + '_treSpe').value = numbers.indexOf(string[26]) / 5;
	document.getElementById(voice + '_treAtt').value = numbers.indexOf(string[27]) / 18;
}

//takes selected scale and string, cuts string into 4 even lengths, sends those to melodyMaker along with synth shortname and the actual synth
var stringSlicer = function(string, scaleChoice){

	var bassString = string.slice(0, string.length / 4)
	var tenorString = string.slice(string.length / 4, string.length / 2)
	var altoString = string.slice(string.length / 2, string.length / 4 * 3)
	var sopranoString = string.slice(string.length / 4 * 3, string.length)
	melodyMaker("sop", scaleChoice, sopranoString, score.soprano.part);
	melodyMaker("alt", scaleChoice, altoString, score.alto.part);
	melodyMaker("ten", scaleChoice, tenorString, score.tenor.part);
	melodyMaker("bas", scaleChoice, bassString, score.bass.part);
}

//get scale choice from radio buttons
var scaleSelect = function(){
	var scaleName = document.getElementById("tonality").value;
	if (scaleName === "dorian"){
		scale = dorian
	} else if (scaleName === "phrygian"){
		scale = phrygian
	} else if (scaleName === "ionian"){
		scale = ionian
	} else if (scaleName === "aeolian"){
		scale = aeolian
	} else if (scaleName === "harmonicMinor"){
		scale = harmonicMinor
	} else if (scaleName === "wholeTone"){
		scale = wholeTone
	} else if (scaleName === "chromatic"){
		scale = chromatic
	} else if (scaleName === "pentatonic"){
		scale = pentatonic
	} else {
		console.log("scale does not exist")
		scale = chromatic
	}
}

//chooses notes for each synth based on passed string
var melodyMaker = function(voice, scaleChoice, string, part){
	//choose sections of scale for each synth to use
	if (voice === "bas"){
		var voiceScale = scaleChoice.slice(0, Math.floor(scaleChoice.length * .4))
	} else if (voice === "ten"){
		var voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .2), Math.floor(scaleChoice.length * .6))
	} else if (voice === "alt"){
		var voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .4), Math.floor(scaleChoice.length * .8))
	} else if (voice === "sop"){
		var voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .4), scaleChoice.length)
	} else {
		console.log(voice + " does not exist yet in melodyMaker")
	}
	//set length of following loop
	var stringLength = 100;
	if(string.length < 100){
		stringLength = string.length
	}
	//loop through strings
	for(var i = 0; i<stringLength; i+=2){
		//letter amount (0 - 52) * scale.length / 52 gives each note an equal chance of being selected (assuming even distribution of letters)
		var thisNote = voiceScale[Math.floor(numbers.indexOf(string[i]) * (voiceScale.length / 52))];
		//set the wait time of the note to the value of the passed letter / 2
		var thisWait = numbers.indexOf(string[i+1]);
		//figure out the actual length of the song based on the longest wait time provided
		if(thisWait > score.totalTime){
			score.totalTime = thisWait;
		}
		console.log(voice + " is playing note " + thisNote + " after waiting " + thisWait + " seconds.");
		//add created note to score
		part.push([thisNote, thisWait]);
	}
}