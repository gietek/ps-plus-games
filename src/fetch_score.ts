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
      return isNaN(res) ? 0 : res;
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
