# Headroom.js

Headroom.js is a lightweight, high-performance JS widget (with no dependencies) that allows you to react to the user's scroll. The header on [this site](http://wicky.nillia.ms/headroom.js) is a living example, it slides out of view when scrolling down and slides back in when scrolling up.

## Installation

Headroom.js is available on npm. To install:

```bash
npm install headroom.js --save

# or...
yarn add headroom.js
```

A a universal build (suitable for script tags, CommonJS, and AMD) is available from unpkg.com:

[https://unpkg.com/headroom.js](https://unpkg.com/headroom.js)

## Documentation

For complete documentation please visit the [headroom.js website](http://wicky.nillia.ms/headroom.js).

## Quick start

After installing `headroom.js`. The following JS will create and initialise a headroom instance:

```js
import Headroom from "headroom.js";

// select your header or whatever element you wish
const header = document.querySelector("header");

const headroom = new Headroom(header);
headroom.init();
```

Then you can add the following CSS to your page:

```css
.headroom {
  will-change: transform;
  transition: transform 200ms linear;
}
.headroom--pinned {
  transform: translateY(0%);
}
.headroom--unpinned {
  transform: translateY(-100%);
}
```

You should now see your header slide in and out in response to the user's scroll.

## Contributions & Issues

Contributions are welcome. Please clearly explain the purpose of the PR and follow the current code style.

Issues can be resolved quickest if they are descriptive and include both a reduced test case and a set of steps to reproduce.

## Contributing Guide

### Setup

The following steps will get you setup to contribute changes to this repo:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of [this page](https://github.com/WickyNilliams/headroom.js))
2. Clone your fork locally

```bash
git clone https://github.com/<your_github_username>/headroom.js.git
cd headroom.js
```

3. Install dependencies. This repo uses `npm`, so you should too.

```bash
npm install
```

### Building

To build the project:

```bash
npm run build
```

To start a watcher for building the project and running tests:

```bash
npm start
```

### Testing

To run the test suite in headless mode:

```bash
npm test
```

## License

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
