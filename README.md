# What is this?

This is a barebones starter project for the game [Screeps](https://screeps.com). It utilizes [Rollup](https://github.com/rollup/rollup) to allow you to import dependencies via NPM
and organize your code using ES6 conventions. When you run `make build`, Rollup packages all your code and dependencies into one file (`dist/main.js`). This is the file you 
upload to Screeps. 


## Okay how do I use it?


Put your code in `src/`. The main loop is already defined for you - this function is called once each tick by the Screeps game engine. Use this function to drive your AI's logic. 


When you are ready to upload your code, run `make build` or `npm run build` to compile your code into a single file. You can either drag & drop that file into your local folder, 
or if you configre `.screeps.yaml`, you can use the included script to upload your code automatically. 


## How do I configure .screeps.yaml?

For the main server, get your auth key from screeps.com. 


For private servers, put the hostname, and be sure to include a username and password. The server will need to be running [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) for this to work. 
 
