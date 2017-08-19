#!/usr/bin/env node

const {TTSStream} = require('./index');

process.stdin.pipe(new TTSStream());
