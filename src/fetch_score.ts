import axios from "axios";
import { parse } from "node-html-parser";

export const fetchScore = async (url: string) => {
  try {
    const { data } = await axios.get(url);

    const rootNode = parse(data);

    const score = rootNode.querySelector(".score_summary a div");

    if (score) {
      return parseFloat(score.textContent);
    }
  } catch (error) {}

  return 0;
};
