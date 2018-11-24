const content =  document.querySelector("#content");
const btn = document.querySelector('.btn');


btn.addEventListener('click', getJoke);
function getJoke(){
	// access http request in a variable
	const xhr = new XMLHttpRequest();
	// url of API we are working with
	const url = "https://api.chucknorris.io/jokes/random";
	// cycles thru ready states and consoles them
	xhr.onreadystatechange = function(){
		// checks if ready state is a 4 and is status is 200
		if(xhr.readyState == 4){
			if(xhr.status == 200){
			// returns response back as a text
			const str = xhr.responseText;
			// takes responseText in and returns as usable text
			const obj = JSON.parse(str);
			// takes content and puts it in the content div
			content.innerHTML = obj.value + '<br/><img src = "'+obj.icon_url+'">';
			}else{
				output.innerHTML = "Error";
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

function callBackfn(e){
	console.log(e);
}