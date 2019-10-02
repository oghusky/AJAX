// variables
const btn = document.querySelector("#submit-btn");
const zipInput = document.querySelector("#zip-input");

// boolean to see more info about city weather
let visibility = false;
let seeMoreOrLess;

// date object
const date = new Date();
document.querySelector("#month").textContent = date.getMonth() + 1;
document.querySelector("#day").textContent = date.getDate();
document.querySelector("#year").textContent = date.getFullYear();
// event listeners

btn.addEventListener("click", getWeather);
$(document).on("click", ".see-more-info-btn", showMoreCityInfo)
// document.addEventListener("keypress", submitCity);

// set state of text in "SEE MORE" button
// gets weather info on click
function getWeather(e) {
	e.preventDefault();
	// set city variable to input value
	const city = zipInput.value;
	// ajax call
	if (city !== "") {
		document.querySelector(".weather-container").textContent = "";
		try {
			$.ajax({
				method: "GET",
				url: `https://api.openweathermap.org/data/2.5/weather?zip=${city}
		&units=imperial&appid=5fd23d240fe6ff93cb60e9314a69f456`
			}).then(res => {
				console.log(res);
				const weatherInfoDiv = document.createElement("div");
				weatherInfoDiv.classList.add("card", "px-3", "py-3", "my-3");
				if (res.cod === 200) {
					// get icon
					const iconCode = res.weather[0].icon;
					const iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
					// div to show weather info
					weatherInfoDiv.innerHTML = `
			<h3 class="card-title mb-1">${res.name}, ${res.sys.country} ${city}<span class="text-right"><img src=${iconUrl} alt="${res.name}, ${res.sys.country}"/></span></h3>
			<div class="card-body mb-1">
			<p><strong>Temperature:</strong> ${res.main.temp} &#8457</p>
				<p><strong>Humidity:</strong> ${res.main.humidity}%</p>
				<p class="text-right">
				<button class="btn-primary see-more-info-btn">SEE <span class="show-more">MORE</span> <i class="fas fa-plus"></i></i> </button>
				</p>
				<div class="row see-more-info-div my-0">
				<p class="col-sm-6"> <strong>Max Temp:</strong> ${res.main.temp_max} &#8457</p>
					<p class="col-sm-6"> <strong>Min Temp:</strong> ${res.main.temp_min} &#8457</p>
					<p class="col-sm-6"> <strong>Forecast:</strong> ${res.weather[0].main}</p>
					<p class="col-sm-6"> <strong>Wind Speed</strong>: ${res.wind.speed} mph</p>
					</div>
					</div>
			`
					document.querySelector(".weather-container").append(weatherInfoDiv);
					zipInput.value = "";
					$(".see-more-info-div").hide();
				} else if (res.cod !== 200) {
					weatherInfoDiv.textContent = "Please Enter Valid Zip Code";
					document.querySelector(".weather-container").append(weatherInfoDiv);
				}
			})
		} catch (err) {
			console.log(err);
		}
	}
}


function showMoreCityInfo(e) {
	e.preventDefault();
	visibility = !visibility;
	e.target.value = visibility;
	if (e.target.value === "true") {
		$(".show-more").text("MORE");
		$(".see-more-info-div").slideUp(500);
	} else {
		$(".show-more").text("LESS");
		$(".see-more-info-div").slideDown(500);
	}
}



