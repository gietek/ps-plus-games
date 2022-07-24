import axios from "axios";
import { parse } from "node-html-parser";

export const fetchScore = async (url: string): Promise<number> => {
  try {
    console.log(`... fetching ${url}`);
    const { data } = await axios.get(url);

    const rootNode = parse(data);

    const score = rootNode.querySelector(".score_summary a div");

    if (score) {
      const res = parseFloat(score.textContent);

      if (isNaN(res)) {
        return 0;
      }

      if (res < 10) {
        return 10 * res; // user score is 0-10
      }

      return res;
    } else {
      throw new Error();
    }
  } catch (error) {
    if (url.includes("---")) {
      return fetchScore(url.replace("---", "-"));
    }

    return 0;
  }
};
