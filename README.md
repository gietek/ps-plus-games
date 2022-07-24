Fetch scores for the games available in Playstation Plus Extra (PL region).

`yarn start`

`npm run start`

or just look into `scores.txt`

## How to create data/games.html

1. open https://www.pushsquare.com/guides/all-ps-plus-games
2. open dev tools
3. run `document.querySelector(".games-filtered .games-style-list").outerHTML` and save results as a data/games.html