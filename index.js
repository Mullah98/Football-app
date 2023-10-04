// const axios = require('axios');

//Here we are defining the api url and my own api key
const API_URL = 'https://v3.football.api-sports.io/fixtures?live=all';
const API_KEY = '740a381027mshc921880ad370d94p1cae66jsn71d5e91d06f5'

//configurating for the axios request
const config = {
    headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY,
    },
};

//Getting the DOM elements for displaying the match data
const elapsedTime = document.querySelector("#elapsed");
const homeTeamImage = document.querySelector("#homeLogo");
const homeTeamName = document.querySelector("#homeName");
const awayTeamImage = document.querySelector("#awayLogo");
const awayTeamName = document.querySelector("#awayName");
const lastMatchGoal = document.querySelector("#goals");
const matchTable = document.querySelector("#matchTable")

//Creating the function for the match tiles
function addMatchTile(data) {
    //Creating the tile div
    const matchTile = document.createElement('div');
    matchTile.classList.add("team")


//Creating the home match box
const homeTeam = document.createElement('div');
homeTeam.classList.add("team");

//Creating the image and text for home team
const homeTileTeamName = document.createElement('p');
homeTileTeamName.innerHTML = data.teams.home.name;

const homeTileTeamLogo = document.createElement('img');
homeTileTeamLogo.src = data.teams.home.logo;

homeTeam.appendChild(homeTileTeamLogo);
homeTeam.appendChild(homeTileTeamName);

//Now for the away team
const awayTeam = document.createElement('div');
awayTeam.classList.add("team");

const awayTileTeamName = document.createElement('p');
awayTileTeamName.innerHTML = data.teams.away.name;

const awayTileTeamLogo = document.createElement('img');
awayTileTeamLogo.src = data.teams.away.logo;

awayTeam.appendChild(awayTileTeamLogo);
awayTeam.appendChild(awayTileTeamName);

//Creating the score
const score = document.createElement('p');
score.innerHTML = data.goals.home + " " + data.goals.away;

//Appending all the elements to the parent elements
matchTile.appendChild(homeTeam);
matchTile.appendChild(score);
matchTile.appendChild(awayTeam);
matchTable.appendChild(matchTile);

}

//Making the axios get request to fetch the match data
axios.get(API_URL, config).then((response) => {
    const data = response.data.response;
    console.log(data.length);

//Displaying the details of the first match
elapsedTime.innerHTML = data[0].fixture.status.elapsed + "'";
homeTeamImage.src = data[0].teams.home.logo;
homeTeamName.innerHTML = data[0].teams.home.name;
awayTeamImage.src = data[0].teams.away.logo;
awayTeamName.innerHTML = data[0].teams.away.name;
lastMatchGoal.innerHTML = data[0].goals.home + ' - ' + data[0].goals.away;

for (let i = 1; i < data.length; i++) {
    addMatchTile(data[i]);
}
})

.catch((err) => {
    console.error(err);
});
