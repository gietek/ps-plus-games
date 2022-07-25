import axios from "axios";
import { parse } from "node-html-parser";

export const fetchScore = async (url: string): Promise<number> => {
  try {
    console.log(`... fetching ${url}`);
    const { data } = await axios.get(url);

    const rootNode = parse(data);

    const score = rootNode.querySelector("span[itemprop=ratingValue]");

    if (!score) {
      const userScore = rootNode.querySelector(".userscore_wrap a");

      if (userScore) {
        const res = parseFloat(userScore.textContent.trim()) * 10;

        if (isNaN(res)) {
          throw new Error();
        }

        return res;
      }

      throw new Error();
    }

    const res = parseFloat(score.textContent);

    if (isNaN(res)) {
      throw new Error();
    }

    return res;
  } catch (error) {
    if (url.includes("---")) {
      return fetchScore(url.replace("---", "-"));
    }

    return 0;
  }
};
