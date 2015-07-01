
var ip = document.getElementById("ip").value//numbers.indexOf(head[3]), convert text into an integer
var numbers = ["a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s","t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I","J", "K", "L", "M", "N", "O", "P", "Q","R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

//oscillator type placeholder 
var wave1 = "";
var wave2 = "";
var wave3 = "";
var wave4 = "";

//voice placeholder
var bass = {};
var tenor = {};
var alto = {};
var soprano = {};
 //notes placeholder
 var bassNotes = [];
 var tenorNotes = [];
 var altoNotes = [];
 var sopranoNotes = [];

//scale placeholder
var scale = ""

var chromatic = ['C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2','C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3','C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6','C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7','C8'];
var ionian = ['C2','C2','D2','E2','F2','F2','G2','G2','A2', 'B2','C3','C3','D3','E3','F3','F3','G3','G3','A3','B3','C4','C4','D4','E4','F4','F4','G4','G4','A4','B4','C5','C5','D5','E5','F5','F5','G5','G5','A5','B5','C6','C6','D6','E6','F6','F6','G6','G6','A6','B6','C7','C7','D7','E7','F7','F7','G7','G7','A7','B7','C8']
var dorian = ['C2','C2','D2','D#2','F2','F2','G2','G2','A2','A#2','C3','C3','D3','D#3','F3','F3','G3','G3','A3','A#3','C4','C4','D4','D#4','F4','F4','G4','G4','A4','A#4','C5','C5','D5','D#5','F5','F5','G5','G5','A5','A#5','C6','C6','D6','D#6','F6','F6','G6','G6','A6','A#6','C7','C7','D7','D#7','F7','F7','G7','G7','A7','A#7','C8']
var phrygian = ['C2','C#2','E2','F2','F2','G2','G2','Ab2','A#2','C3','C#3','E3','F3','F3','G3','G3','Ab3','A#3','C4','C#4','E4','F4','F4','G4','G4','Ab4','A#4','C5','C#5','E5','F5','F5','G5','G5','Ab5','A#5','C6','C#6','E6','F6','F6','G6','G6','Ab6','A#6','C7','C#7','E7','F7','F7','G7','G7','Ab7','A#7','C8']
var aeolian = ['C2','C2','D2','D#2','F2','F2','G2','G2','Ab2','Bb2','C3','C3','D3','D#3','F3','F3','G3','G3','Ab3','Bb3','C4','C4','D4','D#4','F4','F4','G4','G4','Ab4','Bb4','C5','C5','D5','D#5','F5','F5','G5','G5','Ab5','Bb5','C6','C6','D6','D#6','F6','F6','G6','G6','Ab6','Bb6','C7','C7','D7','D#7','F7','F7','G7','G7','Ab7','Bb7','C8']
var harmonicMinor = ['C2','C2','D2','D#2','F2','F2','G2','G2','Ab2','B2','C3','C3','D3','D#3','F3','F3','G3','G3','Ab3','B3','C4','C4','D4','D#4','F4','F4','G4','G4','Ab4','B4','C5','C5','D5','D#5','F5','F5','G5','G5','Ab5','B5','C6','C6','D6','D#6','F6','F6','G6','G6','Ab6','B6','C7','C7','D7','D#7','F7','F7','G7','G7','Ab7','B7','C8']
var wholeTone = ['C2','D2','E2','F#2','G#2','A#2','C3','D3','E3','F#3','G#3','A#3','C4','D4','E4','F#4','G#4','A#4','C5','D5','E5','F#5','G#5','A#5','C6','D6','E6','F#6','G#6','A#6','C7','D7','E7','F#7','G#7','A#7','C8']
var pentatonic = ['C2','Eb2','F2','G2','Bb2','C3','Eb3','F3','G3','Bb3','C4','Eb4','F4','G4','Bb4','C5','Eb5','F5','G5','Bb5','C6','Eb6','F6','G6','Bb6','C7','Eb7','F7','G7','Bb7','C8']

var counter = 0;
var body = document.body
var gui = document.getElementById("gui");
var url = document.getElementById("url");
var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", ip + "url")
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.addEventListener("load", function(){
		//remove line breaks etc
		var html = JSON.parse(xhr.response.replace(/\r?\n|\r/g, ""));
		var wholestring = html.html.body
		//create string of just the site's head
		var headOpen = html.html.body.indexOf("<head>") + 6;
		var headClose = html.html.body.indexOf("</head>")
		var head = html.html.body.slice(headOpen, headClose).replace(/[^a-zA-Z]/g, "")
		//create string of just the site's body
		var bodyOpen = html.html.body.indexOf("<body>") + 6;
		var bodyClose = html.html.body.indexOf("</body>")
		var body = html.html.body.slice(bodyOpen, bodyClose).replace(/[^a-zA-Z]/g, "")
		console.log("body is " + body.length + " characters long")
		var scaleButtons = document.getElementsByName("tonality")

		for(var i = 0; i < scaleButtons.length; i++){
			if (scaleButtons[i].checked){
				scaleName = scaleButtons[i].value
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
				console.log(scaleName);
				gui.setAttribute("style", "display: none")
				instrumentMaker(head, body, scale)
			}
		}
	})
var site = JSON.stringify({site: url.value})
xhr.send(site)
})

var waveAssign = function(head) {
	if (numbers.indexOf(head[0].toLowerCase()) < 6) {
		return "sawtooth"
	} else if (numbers.indexOf(head[0].toLowerCase()) < 12) {
		return "square"
	} else if (numbers.indexOf(head[0].toLowerCase()) < 18) {
		return "sine"
	} else {
		return "triangle"
	}
}

var instrumentMaker = function(head, body, scale) {
	wave1 = waveAssign(head);
	wave2 = waveAssign(head);
	wave3 = waveAssign(head);
	wave4 = waveAssign(head);
	bass = new Wad({
		source: wave1,
		env: {
			attack: numbers.indexOf(head[4])/10,
			decay: numbers.indexOf(head[5])/26,
			sustain: numbers.indexOf(head[6])/52,
			hold: numbers.indexOf(head[7])/10,
			release: numbers.indexOf(head[8])/26
		}
	});
	tenor = new Wad({
		source: wave2,
		env: {
			attack: numbers.indexOf(head[9])/10,
			decay: numbers.indexOf(head[10])/26,
			sustain: numbers.indexOf(head[11])/52,
			hold: numbers.indexOf(head[12])/10,
			release: numbers.indexOf(head[13])/26
		}
	});
	alto = new Wad({
		source: wave3,
		env: {
			attack: numbers.indexOf(head[14])/10,
			decay: numbers.indexOf(head[15])/26,
			sustain: numbers.indexOf(head[16])/52,
			hold: numbers.indexOf(head[17])/10,
			release: numbers.indexOf(head[18])/26
		}
	});
	soprano = new Wad({
		source: wave4,
		env: {
			attack: numbers.indexOf(head[19])/10,
			decay: numbers.indexOf(head[20])/26,
			sustain: numbers.indexOf(head[21])/52,
			hold: numbers.indexOf(head[22])/10,
			release: numbers.indexOf(head[23])/26
		}
	})

	musicPlayer(soprano, alto, tenor, bass, body, scale)
};

var musicPlayer = function(soprano, alto, tenor, bass, body, scale) {
	var bassString = body.slice(0, body.length / 4)
	var tenorString = body.slice(body.length / 4, body.length / 2)
	var altoString = body.slice(body.length / 2, body.length / 4 * 3)
	var sopranoString = body.slice(body.length / 4 * 3, body.length)
	melodyMaker("bass", scale, bass, bassString);
	melodyMaker("tenor", scale, tenor, tenorString);
	melodyMaker("alto", scale, alto, altoString);
	melodyMaker("soprano", scale, soprano, sopranoString);
}

var melodyMaker = function(name, scaleChoice, voice, string){
	if (name === "bass"){
		voiceScale = scaleChoice.slice(0, Math.floor(scaleChoice.length * .4))
		console.log(voiceScale)
	} else if (name === "tenor"){
		voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .2), Math.floor(scaleChoice.length * .6))
	} else if (name === "alto"){
		voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .4), Math.floor(scaleChoice.length * .8))
	} else if (name === "soprano"){
		voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .4), scaleChoice.length)
	} else {
		console.log(name + " does not exist yet in melodyMaker")
	}
	for(var i = 0; i<100; i+=6){
		var thisNote = voiceScale[numbers.indexOf(string[i]) % voiceScale.length];
		var thisWait = numbers.indexOf(string[i+1]) + (i * .25);
		console.log(name + " is playing note " + thisNote + " after waiting " + thisWait + " seconds.");
		voice.play({pitch: thisNote, wait: thisWait, panning: numbers.indexOf(string[i+2])/26 - 1});
		var color1 = (numbers.indexOf(string[i+3]) * 5) + 5;
		var color2 = (numbers.indexOf(string[i+4]) * 5) + 5;
		var color3 = (numbers.indexOf(string[i+5]) * 5) + 5;
		
		setTimeout(function(){
			counter++;
			var div = document.createElement("div");
			div.setAttribute("class", "colorDiv");
			div.setAttribute("style","height: 1000px; background-color: rgb(" + color1 + ", " + color2 + ", " + color3 + "); display: inline-block; ");
			body.appendChild(div);

			var colorDivs = document.getElementsByClassName("colorDiv");
			for(var d = 0; d < colorDivs.length; d++){
				colorDivs[d].style.width = 100/counter + "%" 
			}
		}, thisWait*1000)

	}
}





