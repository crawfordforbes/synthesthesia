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

var notes = ['C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2','C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3','C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6','C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7','C8'];
var bassNotes = ['C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2','C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3','C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5']
var tenorNotes = ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6']
var altoNotes = ['C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6','C7']
var sopranoNotes = ['C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6','C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7','C8']

var url = document.getElementById("url");
var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://127.0.0.1/url")
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
		instrumentMaker(head, body)
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

var instrumentMaker = function(head, body) {
	wave1 = waveAssign(head);
	wave2 = waveAssign(head);
	wave3 = waveAssign(head);
	wave4 = waveAssign(head);
	bass = new Wad({
		source: wave1,
		env: {
			attack: numbers.indexOf(head[4])/10,
			decay: numbers.indexOf(head[5])/10,
			sustain: numbers.indexOf(head[6])/52,
			hold: numbers.indexOf(head[7])/10,
			release: numbers.indexOf(head[8])/26
		}
	});
	tenor = new Wad({
		source: wave2,
		env: {
			attack: numbers.indexOf(head[9])/10,
			decay: numbers.indexOf(head[10])/10,
			sustain: numbers.indexOf(head[11])/52,
			hold: numbers.indexOf(head[12])/10,
			release: numbers.indexOf(head[13])/26
		}
	});
	alto = new Wad({
		source: wave3,
		env: {
			attack: numbers.indexOf(head[14])/10,
			decay: numbers.indexOf(head[15])/10,
			sustain: numbers.indexOf(head[16])/52,
			hold: numbers.indexOf(head[17])/10,
			release: numbers.indexOf(head[18])/26
		}
	});
	soprano = new Wad({
		source: wave4,
		env: {
			attack: numbers.indexOf(head[19])/10,
			decay: numbers.indexOf(head[20])/10,
			sustain: numbers.indexOf(head[21])/52,
			hold: numbers.indexOf(head[22])/10,
			release: numbers.indexOf(head[23])/26
		}
	})
	// soprano.play({pitch: notes[numbers.indexOf(head[24])]})
	// alto.play({pitch: "C4"})
	// tenor.play({pitch: "F#4"})
	// bass.play({pitch: "D3"})
	musicPlayer(soprano, alto, tenor, bass, body)
};

var musicPlayer = function(soprano, alto, tenor, bass, body) {
	var bassString = body.slice(0, body.length / 4)
	var tenorString = body.slice(body.length / 4, body.length / 2)
	var altoString = body.slice(body.length / 2, body.length / 4 * 3)
	var sopranoString = body.slice(body.length / 4 * 3, body.length)
	melodyMaker("bass", bassNotes, bass, bassString);
	melodyMaker("tenor", tenorNotes, tenor, tenorString);
	melodyMaker("alto", altoNotes, alto, altoString);
	melodyMaker("soprano", sopranoNotes, soprano, sopranoString);
	// for(var b = 0; b <= bassString.length; b+=2){
	// 	console.log("bass is playing " + notes[numbers.indexOf(bassString[b])] + " after waiting " + numbers.indexOf(bassString[b+1]) + " seconds");
	// 	bass.play({pitch: notes[numbers.indexOf(bassString[b])], wait: numbers.indexOf(bassString[b+1])})
	// }
	// 	for(var t = 0; t <= tenorString.length; t+=2){
	// 	console.log("tenor is playing note " + notes[numbers.indexOf(tenorString[t])] + " after waiting " + numbers.indexOf(tenorString[t+1]) + " seconds");
	// 	tenor.play({pitch: notes[numbers.indexOf(tenorString[t])], wait: numbers.indexOf(tenorString[t+1])})
	// }
	// 		for(var a = 0; a <= altoString.length; a+=2){
	// 	console.log("alto is playing note " + notes[numbers.indexOf(altoString[a])] + " after waiting " + numbers.indexOf(altoString[a+1]) + " seconds");
	// 	alto.play({pitch: notes[numbers.indexOf(altoString[a])], wait: numbers.indexOf(altoString[a+1])})
	// }
	// 	for(var s = 0; s <= sopranoString.length; s+=2){
	
	// 	console.log("soprano is playing note " + notes[Math.floor(numbers.indexOf(sopranoString[s]/2)) + 38] + " after waiting " + numbers.indexOf(sopranoString[s+1]) + " seconds");
	// 	soprano.play({pitch: notes[Math.floor(numbers.indexOf(sopranoString[s]/2)) + 38], wait: numbers.indexOf(sopranoString[s+1])})
	// }

}

var melodyMaker = function(name, notes, voice, string){
	for(var i = 0; i<100; i += 2){
		var thisNote = notes[numbers.indexOf(string[i]) % notes.length];
		var thisWait = numbers.indexOf(string[i+1]) + (i * 1.5);
		console.log(name + " is playing note " + thisNote + " after waiting " + thisWait + " seconds.");
		voice.play({pitch: thisNote, wait: thisWait})
	}
}





