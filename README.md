# Three Day Weather Forecast App

This is a three day weather forecast app.

The app shows the weather in the four British capitals, the user can also see the weather in cities they search for. To not see the weather in the four UK capitals just press ‘refresh’.

---

## Getting started

Use the clone button to download the game source code. In the terminal enter the following commands:

To install all the packages listed in the package.json:

`$ npm i`

Run the app in your localhost:

`$ npm run serve`

Check the console for any issues and if there are check the package.json for any dependancies missing.

---

## Activating the API

The API used is Open Weather API https://openweathermap.org/

The API requires a token to run. Please sign in with Open Weather API and request a token. Then create .env file and paste in
`REACT_APP_WEATHER_ACCESS_KEY={your-token}`

## Additional notes about the API

When more than one city has the same name the API chooses the larger of the two. So if you search for ‘Perth’ it will give the weather in Perth Australia, if you are searching for Perth in Scotland you should search for ‘Perth, UK’

---

## Built with

1. HTML5
2. SCSS
3. JavaScript
   1. ECMAScript6
   2. React.js
   3. axios
4. Github

Linter - AirBnb linter with Prettier

---

_## Design inspiration_

To help with the layout and the decisions of which information to explain I used the following Wether apps for guidance:

- https://darksky.net/forecast/40.7127,-74.0059/us12/en
- https://www.yahoo.com/news/weather/
- https://codepen.io/tiffanyadu/pen/qryXBo

---

## Challenges

The Five Day Open Weather API returns an array of 40 objects meaning each day is broken up into eight 3 hour intervals. As the weather can change greatly over 24 hours the first challenge was deciding if weather for each day should be displayed in 3 hour intervals, or if just one of the 8 possibilities should be chosen.

I decided to show only the information in the object that has a unix time stamp that is 24 hours away from the Get request . So if you are looking at the APP at 3pm on Friday, the Saturday forecast is showing you the weather at 3pm on Saturday.

---

## Future improvements

- Building on the challenges I would like to expand the app to show a more detailed 3-hour forecast breakdown for each day.
- Currently the two components have some repetitive code, so another future improvement will be refactoring the current code.
- Making the current web app mobile friendly. Currently the app can be viewed on a phone however because it was built as a web app it is not the most user friendly experience.

---

## Author

Jenny Judova
