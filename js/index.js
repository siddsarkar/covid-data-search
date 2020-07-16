const URL = "https://api.covid19india.org/data.json";
// const URL = "/data/Information.json";
var search = document.getElementById("searchfield");
var state = document.getElementById("statename");
const btn = document.getElementById("getit");

//stats
var updatedto = document.getElementById("lastUpdate");
var active = document.getElementById("span-active");
var confirmed = document.getElementById("span-confirmed");
var deaths = document.getElementById("span-deaths");
var recovered = document.getElementById("span-recovered");
var notes = document.getElementById("span-notes");

// const element = document.getElementById("root");
// const button = document.getElementById("btn");
// const search = document.getElementById("search");

function getresult() {
  var query = search.value;
  searchState(query);
}

const searchState = async (searchText) => {
  const res = await fetch(URL);
  const data = await res.json();
  let matches = data.statewise.filter((item) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return item.state.match(regex) || item.statecode.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    state.innerHTML = "state";
    updatedto.innerHTML = "";
    active.innerHTML = "";
    confirmed.innerHTML = "";
    deaths.innerHTML = "";
    recovered.innerHTML = "";
    notes.innerHTML = "";
  }
  outputHtml(matches);
};

const outputHtml = (matches) => {
  let result = matches[0];
  console.log(result.active);

  state.innerHTML = `${result.state}`;
  updatedto.innerHTML = `${result.lastupdatedtime}`;
  notes.innerHTML = `${result.statenotes}`;

  var activeCases = parseInt(result.active);
  var confirmedCases = parseInt(result.confirmed);
  var deathCases = parseInt(result.deaths);
  var recoveredCases = parseInt(result.recovered);

  animate("span-active", 0, activeCases, 1000);
  animate("span-confirmed", 0, confirmedCases, 1000);
  animate("span-deaths", 0, deathCases, 1000);
  animate("span-recovered", 0, recoveredCases, 1000);
};
// // animate();
// document.addEventListener(
//   "DOMContentLoaded",
//   async () => {
//     const res = await fetch(URL);
//     const data = await res.json();

//     //all-list
//     for (let i = 0; i < data.statewise.length; i++) {
//       const html = `
//       <h4>${data.statewise[i].state}</h4>
//         <h4>${data.statewise[i].active}</h4>
//         `;
//       element.innerHTML += html;
//     }

//     console.log(data.statewise);
//   },
//   false
// );
