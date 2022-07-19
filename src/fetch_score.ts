import axios from "axios";
import { parse } from "node-html-parser";

export const fetchScore = async (
  url: string,
  tryNo: number = 1
): Promise<number> => {
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
    } else if (tryNo === 1) {
      return fetchScore(url.replace("playstation-4", "playstation-5"), 2);
    }

    return 0;
  }
};
