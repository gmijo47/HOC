const api = {
    key: "91319eabf83d629d34cd7380e5048afd",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress', setQuery);
function setQuery(event){
    if (event.keyCode==13){
        getPrognoza(searchbox.value);
    }

}

window.onload = function() {
    getPrognoza("Sarajevo");
};


function getPrognoza(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(prognoza=> {
        
        return prognoza.json();
    }).then(prikaziPrognozu);
}


function prikaziPrognozu(prognoza){
    let grad=document.querySelector('.lokacija .grad');
    grad.innerText=`${prognoza.name}, ${prognoza.sys.country}`;

    let sada = new Date();
    let datum=document.querySelector('.lokacija .datum');
    datum.innerText = dateBuilder(sada);

    let temp= document.querySelector('.trenutno .temp');
    temp.innerHTML=`${Math.round(prognoza.main.temp)}<span>°C</span>`;
    if(prognoza.main.temp<16)
    {
       document.body.style.backgroundImage = "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
    }
  else
    {
        document.body.style.backgroundImage = "linear-gradient(to top, orange 0%, #e73827 100%)";
    }

    let vrijeme=document.querySelector('.trenutno .vrijeme');
    vrijeme.innerText=prognoza.weather[0].main;

    
    let ikona=`http://openweathermap.org/img/wn/${prognoza.weather[0].icon}@4x.png`
    document.getElementById("ikonica").src = ikona;


    let visnis = document.querySelector('.vis-nis');
    visnis.innerText=`${Math.round(prognoza.main.temp_min)}°c / ${Math.round(prognoza.main.temp_max)}°c`;

}



function dateBuilder (d){
    let mjeseci = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
    let dani = ["Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"];

    let dan = dani[d.getDay()];
    let datum = d.getDate();
    let mjesec = mjeseci[d.getMonth()];
    let godina = d.getFullYear();

    return `${dan} ${datum} ${mjesec} ${godina}`
}