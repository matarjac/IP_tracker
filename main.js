// API Key(for IP API): at_qfgnrCrTlhWCNcHxl3OLypvCOdvmz
// get https://geo.ipify.org/api/v2/country,city?apiKey=at_qfgnrCrTlhWCNcHxl3OLypvCOdvmz&ipAddress=8.8.8.8
// API Key for google: AIzaSyCeirQB4tU8esHoqBR3z4iLDcmnreJ_WbQ)
const searchBtn = document.querySelector('button');
let searchInput = document.querySelector('input');
const ipSpan = document.getElementById('ip-span');
const locationSpan = document.getElementById('location-span');
const ispSpan = document.getElementById('isp-span');
const timeZoneSpan = document.getElementById('timezone-span');
// const map = document.querySelector('iframe');
let ipAddressSearch = '';
let map;

searchBtn.addEventListener('click', ()=>{
    console.log(searchInput.value);
    ipAddressSearch = searchInput.value;
    searchInput.value = '';
    getAPI(ipAddressSearch);
});

async function getAPI(ip){
    try{
        const data = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qfgnrCrTlhWCNcHxl3OLypvCOdvmz&ipAddress=${ip}`);
        console.log(data);
        ipSpan.innerHTML=data.data.ip;
        locationSpan.innerHTML=`${data.data.location.city}, ${data.data.location.country}`
        ispSpan.innerHTML=`${data.data.isp}`;
        timeZoneSpan.innerHTML= `UTC${data.data.location.timezone}`;
        console.log(data.data.location.lat, data.data.location.lng)
        getMap(data.data.location.lat, data.data.location.lng);
    }catch{
        console.error(error);
    }
};


const generateMapCurrentLocation = ()=>{
    getMap(32.069172, 34.776041);
}

// ######## Map ##########//

function getMap(lat, lng) {
    if (map) {
        map.remove();
    }
    const mapDiv = document.getElementById("map");
    map = L.map(mapDiv).setView([lat + 0.002, lng], 15);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
    }).addTo(map);
  
    L.marker([lat, lng]).addTo(map);
  }


