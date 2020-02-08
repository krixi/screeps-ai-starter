# What is this?

This is a barebones starter project for the game [Screeps](https://screeps.com).
It utilizes [Rollup](https://github.com/rollup/rollup) to allow you to import dependencies via NPM and organize your code using ES6 conventions.

## Okay how do I use it?

Put your code in `src/`. The main loop is already defined for you - this function is called once each tick by the Screeps game engine.
Use this function to drive your AI's logic.

To bundle your code and check for errors, run `npm run build`. This will bundle your code, and output two files:

```
/dist/main.js
/dist/main.js.map.js
```

You can either drag & drop these files into your local folder, or if you configre `.screeps.yaml`,
you can use the included rollup plugin to upload your code automatically.

## Go on.

You can also use `npm run watch` to have rollup.js perform a build whenever your code is updated.

## How do I configure .screeps.yaml?

First off, copy the existing template, then update it with your own personal configuration. 
```
cp .template.screeps.yaml .screeps.yaml
```

For the main server, get your auth key from screeps.com.

For private servers, put the hostname, and be sure to include a username and password. 
The server will need to be running [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) for this to work.
You can use whatever name you want for the private server, just remember to update the [rollup config](rollup.config.js)
to automatically upload to that server. 

## Other features

-   VS Code configuration (ESLint, TSD for IntelliSense, search paths)
-   ESLint
-   Prettier

Don't forget to `npm install`.
