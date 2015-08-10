//showDiv = hides all synths, reveals whichever synth name was clicked
var nav_main = document.getElementById('main_nav')
var nav_sop = document.getElementById('nav_sop')
var nav_alt = document.getElementById('nav_alt')
var nav_ten = document.getElementById('nav_ten')
var nav_bas = document.getElementById('nav_bas')
var nav_all = document.getElementById('nav_all')

var showDiv = function(voice){
document.getElementById("sop_div").className = "hidden synth"
document.getElementById("alt_div").className = "hidden synth"
document.getElementById("ten_div").className = "hidden synth"
document.getElementById("bas_div").className = "hidden synth"

document.getElementById(voice + "_div").className = "visible synth"
}


nav_sop.addEventListener('click', function(){showDiv('sop')})
nav_alt.addEventListener('click', function(){showDiv('alt')})
nav_ten.addEventListener('click', function(){showDiv('ten')})
nav_bas.addEventListener('click', function(){showDiv('bas')})
nav_all.addEventListener('click', function(){
	document.getElementById("sop_div").className = "visible synth"
document.getElementById("alt_div").className = "visible synth"
document.getElementById("ten_div").className = "visible synth"
document.getElementById("bas_div").className = "visible synth"
document.getElementById("mel_div").className = "visible synth"
})
window.onload = function(){
	document.getElementById("sop_div").className = "visible synth"
document.getElementById("alt_div").className = "visible synth"
document.getElementById("ten_div").className = "visible synth"
document.getElementById("bas_div").className = "visible synth"
}