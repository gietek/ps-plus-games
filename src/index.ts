import { fetchGames } from "./fetch_games";
import { fetchScore } from "./fetch_score";

interface Score {
  title: string;
  score: number;
}

const start = async () => {
  const games = await fetchGames();

  let scores: Score[] = [];

  const gamesCount = games.length;

  for (let game of games) {
    const { title, url } = game;
    console.log(`... processing ${title}`);
    const score = await fetchScore(url);
    scores.push({ title, score });
  }

  console.table(scores);
};

start();
