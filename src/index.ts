import { fetchGames } from "./fetch_games";
import { fetchScore } from "./fetch_score";

interface Score {
  title: string;
  score: number;
  url: string;
}

const start = async () => {
  const games = await fetchGames();

  let scores: Score[] = [];

  for (let game of games) {
    const { title, url } = game;
    const score = await fetchScore(url);
    scores.push({ title, score, url });
  }

  scores.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    }

    if (a.score < b.score) {
      return 1;
    }

    return 0;
  });

  console.table(scores);
};

start();
