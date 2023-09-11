# Phasmophobia Photo displayer
 This takes the most recent photo taken from any player in Phasmophobia and displays it on a web page that can be imported into your streaming software
## How to setup?
1. Open up the config.json file
    1. Change the Phasmophobia install directory if you have it installed on a different drive (if you dont know what that means then dont worry, you can leave it)
    2. Change the port if needed
2. Open up the index.html file and change the animDuration on line 42 to how many seconds you want the photo to be visible
3. Add the browser element to your streaming software and point it to http://localhost:PORT
4. Open a terminal and run `npm i`
5. Run `node .` in the same terminal and your done!
## Dependencies
- [Node.js](https://nodejs.org/)