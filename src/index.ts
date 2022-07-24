import axios from "axios";
import { fetchGames } from "./fetch_games";
import { fetchScore } from "./fetch_score";
import { Score } from "./types";

const start = async () => {
  const games = await fetchGames();

  let scores: Score[] = [];

  for (let game of games) {
    const { title, url, platform } = game;
    const score = await fetchScore(url);
    scores.push({ platform, title, score, url });
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
