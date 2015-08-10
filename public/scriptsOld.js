
var ip = document.getElementById("ip").value

//numbers.indexOf(head[3]), convert text into an integer
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
//color placeholder
var color1 = 0;
var color2 = 0;
var color3 = 0;

//song placeholder
var song = {
	bass: [],
	tenor: [],
	alto: [],
	soprano: []
};
//counter only needed for adding divs of changing sizes
var counter = 0;
//body 
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
		//get scale choice from user
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
//choose oscillator for voices
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

//create voices
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

//cut body into four parts, one for each voice
var musicPlayer = function(soprano, alto, tenor, bass, body, scale) {
	var bassString = body.slice(0, body.length / 4)
	var tenorString = body.slice(body.length / 4, body.length / 2)
	var altoString = body.slice(body.length / 2, body.length / 4 * 3)
	var sopranoString = body.slice(body.length / 4 * 3, body.length)
	//feed bodies into melody maker
	melodyMaker("bass", scale, bass, bassString);
	melodyMaker("tenor", scale, tenor, tenorString);
	melodyMaker("alto", scale, alto, altoString);
	melodyMaker("soprano", scale, soprano, sopranoString);
}

//choose notes and wait times
var melodyMaker = function(name, scaleChoice, voice, string){
	//assign section of scale to voice part
	if (name === "bass"){
		voiceScale = scaleChoice.slice(0, Math.floor(scaleChoice.length * .4))
		var score = song.bass;
	} else if (name === "tenor"){
		voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .2), Math.floor(scaleChoice.length * .6))
		var score = song.tenor;
	} else if (name === "alto"){
		voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .4), Math.floor(scaleChoice.length * .8))
		var score = song.alto;
	} else if (name === "soprano"){
		voiceScale = scaleChoice.slice(Math.floor(scaleChoice.length * .4), scaleChoice.length)
		var score = song.soprano
	} else {
		console.log(name + " does not exist yet in melodyMaker")
	}
	//create each instant (pitch, panning, wait, colorCell)
	for(var i = 0; i<string.length; i+=2){
		var thisNote = voiceScale[numbers.indexOf(string[i]) % voiceScale.length];
		var thisWait = numbers.indexOf(string[i+1]) + (i * 1);
		console.log(name + " is playing note " + thisNote + " after waiting " + thisWait + " seconds.");
		voice.play({pitch: thisNote, wait: thisWait, panning: numbers.indexOf(string[i+2])/26 - 1});
		//create object of songs notes
		score.push()
		//create colorCell, choose color for each voice
		if (name === "bass"){
			color1 = (numbers.indexOf(string[i]) * 5) + 5;
			color2 = (numbers.indexOf(string[i]) * 2.5) + 5;
			color3 = (numbers.indexOf(string[i]) * 1) + 5;
			divMaker(color1, color2, color3, thisWait)
		} else if (name === "tenor"){
			color1 = (numbers.indexOf(string[i]) * 1) + 5;
			color2 = (numbers.indexOf(string[i]) * 5) + 5;
			color3 = (numbers.indexOf(string[i]) * 2.5) + 5;
			divMaker(color1, color2, color3, thisWait)
		} else if (name === "alto"){
			color1 = (numbers.indexOf(string[i]) * 2.5) + 5;
			color2 = (numbers.indexOf(string[i]) * 1) + 5;
			color3 = (numbers.indexOf(string[i]) * 5) + 5;
			divMaker(color1, color2, color3, thisWait)
		} else if (name === "soprano"){
			color1 = (numbers.indexOf(string[i]) * 5) + 5;
			color2 = (numbers.indexOf(string[i]) * 1) + 5;
			color3 = (numbers.indexOf(string[i]) * 2.5) + 5;
			divMaker(color1, color2, color3, thisWait)
		} else {
			console.log("color error")
		}
	}
}

var divMaker = function(color1, color2, color3, thisWait, voice){
	setTimeout(function(){
		counter++;

		var colorCell = document.createElement("div");
		colorCell.setAttribute("class", "colorDiv");
		colorCell.setAttribute("style","height: 1000px; background-color: rgb(" + Math.floor(color1) + ", " + Math.floor(color2) + ", " + Math.floor(color3) + "); display: inline-block; ");
		body.appendChild(colorCell);
		//want continually shrinking divs?
		// var colorDivs = document.getElementsByClassName("colorDiv");
		// for(var d = 0; d < colorDivs.length; d++){
		// 	//colorDivs[d].style.width = 100/counter + "%"
		// }
	}, thisWait * 1000) 
}



