const btn = document.querySelector('button');
const content = document.querySelector('#content');
const intake = document.querySelector('input');
const objText = document.querySelector(".obj-text");
const tempIcon = document.querySelector(".temp-icon");
const tempImg = document.querySelector('.temp-img');
const date = new Date();
document.querySelector('#month').textContent = date.getMonth()+1;
document.querySelector('#day').textContent = date.getDate();
document.querySelector('#year').textContent = date.getFullYear();
btn.addEventListener('click', getWeather);
document.addEventListener('keypress', enterSubmit);


function getWeather(){
	const city = intake.value;
	// access http request in a variable
	const xhr = new XMLHttpRequest();
	// url of API we are working with
	const url = 'https://api.openweathermap.org/data/2.5/weather?zip='+ city +'&units=imperial&appid=5fd23d240fe6ff93cb60e9314a69f456';
	// cycles thru ready states and consoles them
	xhr.onreadystatechange = function(){
		// makes sure input value is not empty
		if(intake.value !== ''){
			// checks if ready state is a 4 and is status is 200
			if(xhr.readyState == 4){
				if(xhr.status == 200){
				// returns response back as a text
				const str = xhr.responseText;
				// takes responseText in and returns as usable text
				const obj = JSON.parse(str);
				console.log(obj.main.temp);
				objText.textContent = obj.main.temp;
				console.log(obj.name);
				tempIcon.textContent = obj.name + ", " + obj.sys.country;
				iconCode = obj.weather[0].icon;
				iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
				tempImg.innerHTML = '<img src = "'+iconUrl+'" class="img-icon">';
				setTimeout(clearInput, 10);
				}else{
					content.innerHTML = "Error";
				}
			}
		}
	}
		
	// have to specify the method of request in "Open"
	xhr.open("GET", url);
	// sends the http request back to page. ready state show up 
	// as a 4
	xhr.send();
	// progress info
	xhr.addEventListener("progress", callBackfn);
	// time stamp info
	xhr.addEventListener("load", callBackfn);
	// if we return an error
	xhr.addEventListener("error", callBackfn);
}
function enterSubmit(e){
	if(e.which == 13 || e.keycode == 13){
		getWeather();
	}
}
function callBackfn(e){
	console.log(e);
}
function clearInput(){
	intake.value = " ";
}
