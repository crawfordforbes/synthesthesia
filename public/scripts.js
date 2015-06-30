//numbers.indexOf(head[3]), convert text into an integer
var numbers = ["a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s","t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I","J", "K", "L", "M", "N", "O", "P", "Q","R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

//oscillator type placeholder 
var wave1 = "";
var wave2 = "";
var wave3 = "";
var wave4 = "";

var bass = {};
var 

var url = document.getElementById("url");
var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://127.0.0.1:4567/url")
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.addEventListener("load", function(){
		//remove line breaks etc
		var html = JSON.parse(xhr.response.replace(/\r?\n|\r/g, ""));
		var wholestring = html.html.body
		//create string of just the site's head
		var headOpen = html.html.body.indexOf("<head>") + 6;
		var headClose = html.html.body.indexOf("</head>")
		var head = html.html.body.slice(headOpen, headClose).replace(/[^a-zA-Z ]/g, "")
		//create string of just the site's body
		var bodyOpen = html.html.body.indexOf("<body>") + 6;
		var bodyClose = html.html.body.indexOf("</body>")
		var body = html.html.body.slice(bodyOpen, bodyClose).replace(/[^a-zA-Z ]/g, "")
		instrumentMaker(head)
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

var instrumentMaker = function(head) {
	wave1 = waveAssign(head);
	wave2 = waveAssign(head);
	wave3 = waveAssign(head);
	wave4 = waveAssign(head);
	var inst1 = new Wad({
		source: wave1,
		env: {
			attack: numbers.indexOf(head[4])/10,
			decay: numbers.indexOf(head[5])/10,
			sustain: numbers.indexOf(head[6])/52,
			hold: numbers.indexOf(head[7])/10,
			release: numbers.indexOf(head[8])/26
		}
	});
	var inst2 = new Wad({
		source: wave2,
		env: {
			attack: numbers.indexOf(head[9])/10,
			decay: numbers.indexOf(head[10])/10,
			sustain: numbers.indexOf(head[11])/52,
			hold: numbers.indexOf(head[12])/10,
			release: numbers.indexOf(head[13])/26
		}
	});
	var inst3 = new Wad({
		source: wave3,
		env: {
			attack: numbers.indexOf(head[14])/10,
			decay: numbers.indexOf(head[15])/10,
			sustain: numbers.indexOf(head[16])/52,
			hold: numbers.indexOf(head[17])/10,
			release: numbers.indexOf(head[18])/26
		}
	});
	var inst4 = new Wad({
		source: wave4,
		env: {
			attack: numbers.indexOf(head[19])/10,
			decay: numbers.indexOf(head[20])/10,
			sustain: numbers.indexOf(head[21])/52,
			hold: numbers.indexOf(head[22])/10,
			release: numbers.indexOf(head[23])/26
		}
	})



	inst1.play({pitch: "A4"})
	inst2.play({pitch: "C4"})
	inst3.play({pitch: "F#4"})
	inst4.play({pitch: "D3"})
};





