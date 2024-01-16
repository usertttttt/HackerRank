const axios = require("axios");
const competitionName = "UEFA Champions League";
const year = '2011';

async function getWinnerTotalGoals(competition, year) {
    const api = "https://jsonmock.hackerrank.com/api/";
    let count = 0;

    let res = await axios.get(`${api}football_competitions?name=${competition}&year=${year}`);
    let winner = res.data.data[0].winner;

    // For team1 total
    let team1Res = await axios.get(`${api}football_matches?competition=${competition}&year=${year}&team1=${winner}&page=1`);
    let team1TotalPages = team1Res.data.total_pages;
    for (let i = 1; i <= team1TotalPages; i++) {
        const response = await axios.get(`${api}football_matches?competition=${competition}&year=${year}&team1=${winner}&page=${i}`);
        response.data.data.forEach(match => {
            count += Number(match.team1goals);
        });
    }

    // For team2 total
    let team2Res = await axios.get(`${api}football_matches?competition=${competition}&year=${year}&team2=${winner}&page=1`);
    let team2TotalPages = team2Res.data.total_pages;
    for (let i = 1; i <= team2TotalPages; i++) {
        const response = await axios.get(`${api}football_matches?competition=${competition}&year=${year}&team2=${winner}&page=${i}`);
        response.data.data.forEach(match => {
            count += Number(match.team2goals);
        });
    }

    return count;
}
