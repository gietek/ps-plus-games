import fs from "fs/promises";
import { parse } from "node-html-parser";
import { Game, Platform, PlatformUrl } from "./types";

const gamesFileName = "./data/games.html";

const platformUrl: PlatformUrl = {
  PS4: "playstation-4",
  PS5: "playstation-5",
};

const generateUrl = (title: string, platform: Platform) => {
  const metacriticBaseUrl = "https://www.metacritic.com/game/";

  let plainTitle = title;

  if (plainTitle.includes(":") && plainTitle.includes("Edition")) {
    plainTitle = plainTitle.split(":")[0];
  }

  if (plainTitle.includes(":") && plainTitle.includes("Season")) {
    plainTitle = plainTitle.split(":")[0];
  }

  const path = plainTitle
    .toLowerCase()
    .replace(/:/g, "")
    .replace(/'/g, "")
    .replace(/;/g, "")
    .replace(/û/g, "u")
    .replace("|", "-")
    .replace(",", "")
    .replace(/\./g, "")
    .replace(/-&amp;/g, "")
    .replace(/ /g, "-")
    .replace("/", "");

  return `${metacriticBaseUrl}${platformUrl[platform]}/${path}`;
};

export const fetchGames = async () => {
  const content = await fs.readFile(gamesFileName, "utf-8");
  const rootNode = parse(content);
  const list = Array.from(rootNode.querySelectorAll("li"));

  const games = list.reduce<Game[]>((acc, node) => {
    const platformPills = node.querySelectorAll(".pill");
    const platform = platformPills[platformPills.length - 1]
      .textContent as Platform;
    const link = node.querySelector("a")!;
    let title = link.textContent.replace("\n", "");

    while (title.includes("  ")) {
      title = title.replace(/  /g, " ");
    }

    const url = generateUrl(title, platform);

    acc.push({ url, title, platform });

    return acc;
  }, []);

  return games;
};
