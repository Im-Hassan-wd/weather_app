const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const body = document.querySelector('body');

const updateUi = (data) => {

  const { cityDetails, weather } = data;

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update night/day & icon images

  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSource);

  let timeSource = null;
  if(weather.IsDayTime){
    timeSource = 'img/day.svg';
    document.body.style.background = "url('img/day.svg')";
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  } else{
    timeSource = 'img/night.svg';
    document.body.style.background = "url('img/night.svg')";
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  }
  time.setAttribute('src', timeSource)
  //remove display none
  if(card.classList.contains("d-none")){
    card.classList.remove('d-none');
  }

}

const changeCity = async (city) => {

  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };

};
cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  //change the ui with new city
  changeCity(city)
    .then(data => updateUi(data))
    .catch(err => console.log(err));
});
