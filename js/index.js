const URL = 'https://api.covid19india.org/data.json';
var search = document.getElementById('searchfield');
var state = document.getElementById('statename');
const btn = document.getElementById('getit');

//stats
var updatedto = document.getElementById('lastUpdate');
var active = document.getElementById('span-active');
var confirmed = document.getElementById('span-confirmed');
var deaths = document.getElementById('span-deaths');
var recovered = document.getElementById('span-recovered');
var notes = document.getElementById('span-notes');

function getresult() {
	var query = search.value;
	searchState(query);
}

const searchState = async (searchText) => {
	const res = await fetch(URL);
	const data = await res.json();
	let matches = data.statewise.filter((item) => {
		const regex = new RegExp(`^${searchText}`, 'gi');
		return item.state.match(regex) || item.statecode.match(regex);
	});
	if (searchText.length === 0) {
		matches = [];
		state.innerHTML = 'state';
		updatedto.innerHTML = '';
		active.innerHTML = '';
		confirmed.innerHTML = '';
		deaths.innerHTML = '';
		recovered.innerHTML = '';
		notes.innerHTML = '';
	}
	outputHtml(matches);
};

const outputHtml = (matches) => {
	let result = matches[0];

	state.innerHTML = `${result.state}`;
	updatedto.innerHTML = `${result.lastupdatedtime}`;
	notes.innerHTML = `${result.statenotes}`;

	var activeCases = parseInt(result.active);
	var confirmedCases = parseInt(result.confirmed);
	var deathCases = parseInt(result.deaths);
	var recoveredCases = parseInt(result.recovered);

	animate('span-active', 0, activeCases, 1000);
	animate('span-confirmed', 0, confirmedCases, 1000);
	animate('span-deaths', 0, deathCases, 1000);
	animate('span-recovered', 0, recoveredCases, 1000);
};

function animate(id, start, end, duration) {
	var obj = document.getElementById(id);
	var range = end - start;
	var minTimer = 50;
	var stepTime = Math.abs(Math.floor(duration / range));
	steptime = Math.max(stepTime, minTimer);
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;
	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - remaining * range);
		obj.innerHTML = value;
		if (value == end) {
			clearInterval(timer);
		}
	}
	timer = setInterval(run, stepTime);
	run();
}
