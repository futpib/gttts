#!/usr/bin/env node

const {TTSStream} = require('./index');

process.stdin.pipe(new TTSStream());
process.stdin.pipe(process.stdout);
