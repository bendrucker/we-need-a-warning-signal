# we-need-a-warning-signal [![Build Status](https://travis-ci.org/bendrucker/we-need-a-warning-signal.svg?branch=master)](https://travis-ci.org/bendrucker/we-need-a-warning-signal)

> ["We need a warning signal"](https://www.youtube.com/watch?v=AZfRggA3YYU) —Kevin Malone

A CLI and `Transform` stream. When the word "warning" or "warn" is piped in, Kevin sounds the warning signal.

## Install

```
$ npm install --global|--save we-need-a-warning-signal
```


## Usage

### API

```js
var WarningStream = require('we-need-a-warning-signal')

createReadStream()
  .pipe(WarningStream())
  .pipe(process.stdout)
```

### CLI

```sh
echo "warning" | warning-signal
```

![the trick is to undercook the onions](kevin.gif)

## License

MIT © [Ben Drucker](http://bendrucker.me)
