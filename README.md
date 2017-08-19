# gttts
Google translate text to speech

## Installation
1. Google Chrome
2. `yarn global add gttts`

## Usage

### CLI
```bash
$ echo 'U wot m8?' | gttts
```

### JS
```js
const {TTSStream} = require('gttts');

process.stdin.pipe(new TTSStream());
```

## Please don't be evil
