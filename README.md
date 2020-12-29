# phaser-template
This project serves as a template and explainer for using PhaserV3 with ES6 syntax, React for UI, CastleDB for data, and Parcel for local development and builds, with continuous integration for Github Pages through Github Actions.

The "game" can be played at https://bloodyaugust.github.io/phaser-template/

## Developing
`yarn install`

then

`yarn start`

## Build
`yarn build`

## Github Action
Changes on `master` will trigger a build and push to the `gh-pages` branch.

## About
### ES6
By using ES6 imports/modules/syntax, we can keep the codebase clean and organized. Features like class-based OOP, lambda functions, keywords like `async/await`, `const`, and syntactic sugar like `...`(spread operator) make code much more fun to write, and easier to maintain/read.

For an example of how to use class extension with Phaser classes, see [the enemy class](actors/enemy.js). Important to note are the calling of `super` in the constructor, the usage of `super.methodName()` for method overrides, and usage of `scene.add.existing` for scene adding.

We also get some excellent usage of `import`, exemplified in [the main scene](scenes/main.js). We can import images, sounds, and JSON files with this syntax, and use the `scene.load.assetType` methods how we expect, no changes or hacks required. This is especially handy for importing many assets with a `src/asset/path/folder/*.png`(globbing) pattern.

### React
React is amazing for writing UI code. We can take advantage of functional components, local state, `Context`, and all the other tools React provides that make it such a great tool, and just layer it on top of our game.

The [game-interop component](react/game-interop.jsx) allows us to store a reference to the game, main scene, and a copy of the global(registry)/scene datamanager state, which is incredibly handy for building reactive UI. See also [index.js](index.js) for how the events that drive the state-sync work: a native JS `CustomEvent` is emitted/listened on the page root. This is hooked up already for the game registry, and the main scene. It can easily be extended for more scenes/remote data sources.

### Electron
Electron (and `electron-builder`) allow us to package our game as a native executable for desktop platforms. Currently, builds for Windows can be built/packaged by running:
`yarn build:electron && yarn:dist`

With some minor tweaks to `package.json` and the right machine, you can also build for Linux and MacOS.

### Parcel
The "no config" nature of Parcel is really attractive, and _almost_ true. Some configuration is necessary to support ES6 syntax/modules, mainly in [babelrc](.babelrc) and [package.json](package.json). It works as a local development bundler and server, and a production bundler for both web and desktop platforms(the latter by also using electron).

### CastleDB
[CastleDB](http://castledb.org/) is a flat-file "database" builder that exports JSON files. It is a lightweight, easy to use tool for organizing game data that in other engines might be managed through "ScriptableObjects" or "ResourceScripts" *ahem*. Because it uses JSON natively, integrating it with your use-case in JS is very straightforward to do. See [DataController](controllers/data-controller.js) for an example of how this can work.

### Github Actions and Pages
Github has free in-house solutions for CI/CD and hosting, with Actions and Pages. This means we don't need another external service to watch our code for changes, run our tests, build the production bundle, and publish it to a server. You need to configure Pages per repository, but your workflow will run as soon as you clone and push this repository, if you leave the `.github` folder intact.

### Folders
- [actors](actors/):
Generally, these are classes that extend `Phaser` namespace classes (aside from `Scene`s). If it collects attributes, is displayed, and can be interacted with by the user (directly or no), it probably goes here.

- [behaviors](behaviors/):
Simple scripts as class objects that can be used to impart behavior to actors. Usually this is behavior that can be shared across actors, needs minimal state of its own, and is okay to be instantiated/destroyed whenever. These are similar to `Phaser` mixins.

- [constants](constants/):
A handy place to define global, constant data, such as state keys or game configurations that never change.

- [controllers](controllers/):
Scripts that need to run in a `Scene`, but have no visual representation, or are not directly interacted with by the user. Useful for containing meta game state, orchestrating interactions between the UI and the game, handling groups of actors, etc.

- [data](data/):
This is where you should store your CastleDB file(s). Any other JSON data should go here as well (aside from things like animations).

- [react](react/):
Here is where the React app source lives. JSX, CSS, whatever UI you're going to use in React land.

- [res](res/):
Images, sfx, music, and any other binary assets for your game should live here, or in a subdirectory here. You could also store some of these directly next to actors, if it floats your boat, but glob imports can do some really handy things if you keep them together here.

- [scenes](scenes/):
This is for your `Phaser.Scene` extending classes! `main.js` Has a few handy patterns already.

- [root](root/):
Overall project configuration, the index pages, editor configs, etc. should all live in the root.
