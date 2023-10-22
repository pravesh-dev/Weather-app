let apiKey = "6f4cc0b3279b84e2b8ba76e0a8909a18";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let arrowIcon = document.querySelector("#arrowIcon");
let backHome = document.querySelector("#backToHome");
let container1 = document.querySelector("#container1");
let container2 = document.querySelector("#container2");
let inputBox = document.querySelector("#input_box");
let searchBtn = document.querySelector("#search_btn");
let errorMsg = document.querySelector("#error");
let resultBox = document.querySelector("#result");
beforeResult = document.querySelector("#before_result");

let cityName = document.querySelector("#city_name");
let Description = document.querySelector("#description");
let temp = document.querySelector("#temp");
let windSpeed = document.querySelector("#wind_speed");
let humidity = document.querySelector("#humidity");
let descriptionImg = document.querySelector("#description_img");

let checkWeather = async (city) => {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    errorMsg.style.display = "block";
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 1400);
  } else {
    var data = await response.json();

    cityName.innerHTML = data.name;
    Description.innerHTML = data.weather[0].main;
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    windSpeed.innerHTML = data.wind.speed + " km/h";
    humidity.innerHTML = data.main.humidity + "%";

    switch (data.weather[0].main) {
      case "Clear":
        descriptionImg.src = "clear.png";
        break;
      case "Clouds":
        descriptionImg.src = "clouds.png";
        break;
      case "Drizzle":
        descriptionImg.src = "drizzle.png";
        break;
      case "Mist":
        descriptionImg.src = "mist.png";
        break;
      case "Rain":
        descriptionImg.src = "rain.png";
        break;
      case "Snow":
        descriptionImg.src = "snow.png";
        break;

      default:
        console.log("There has been some error in loading image");
        break;
    }

    beforeResult.style.display = "none";
    resultBox.style.display = "flex";
    console.log(data);
  }
};


function searchWeather(){
    if (inputBox.value === "") {
      errorMsg.style.display = "block";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 1400);
    } else {
      checkWeather(inputBox.value);
    }
}
searchBtn.addEventListener("click",searchWeather);
inputBox.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        searchWeather();
    }
})

let tl = gsap.timeline();
let tl2 = gsap.timeline();
function showContainer1Animation() {
  tl.from("#umbrella_img", {
    x: -300,
    y: -200,
    duration: 0.7,
    delay: 0.4,
  });
  tl.from("#appNameContainer span", {
    opacity: 0,
    duration: 1,
  });
  tl.from("#arrowIcon", {
    scale: 0,
    duration: 0.3,
  });
}
showContainer1Animation();
function showContainer2Animation() {
  tl2.from("#input_container button", {
    opacity: 0,
    scale: 0,
    duration: 0.7,
  });
  tl2.from("#before_result", {
    display: "none",
  });
}

// changing between home page and the result page

arrowIcon.addEventListener("click", () => {
  container1.style.display = "none";
  container2.style.display = "block";
  setTimeout(() => {
    inputBox.style.scale = "1";
  }, 100);
  beforeResult.style.display = "block";
  resultBox.style.display = "none";
  showContainer2Animation();
});
backHome.addEventListener("click", () => {
  container2.style.display = "none";
  container1.style.display = "flex";
  inputBox.style.scale = "0";
  inputBox.value = "";
  showContainer1Animation();
});
