import axios from "axios";
import { parse } from "node-html-parser";

const url = "https://www.playstation.com/pl-pl/ps-plus/games/";
const metacriticBaseUrl = "https://www.metacritic.com/game/playstation-4/";

export const fetchGames = async () => {
  const { data } = await axios.get(url);

  const rootNode = parse(data);
  const tabsContent = rootNode.querySelector(".tabs-content");

  if (!tabsContent) {
    return [];
  }

  const games = tabsContent.querySelectorAll(".txt-style-base");
  const titles = Array.from(games).map((node) => {
    const title = node.innerText.trim().replace(/\*/g, "");
    const path = title
      .toLowerCase()
      .replace(/:/g, "")
      .replace(/'/g, "")
      .replace(/;/g, "")
      .replace(/ /g, "-");
    const url = `${metacriticBaseUrl}${path}`;

    return {
      title,
      url,
    };
  });

  return titles;
};
