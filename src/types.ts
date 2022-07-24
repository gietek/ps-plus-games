export type Platform = "PS4" | "PS5";

export interface Game {
  title: string;
  url: string;
  platform: Platform;
}

export interface Score extends Game {
  score: number;
}

export type PlatformUrl = {
  [platform in Platform]: string;
};
