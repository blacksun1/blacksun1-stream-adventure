"use strict";

/*
Instead of transforming every line as in the previous "TRANSFORM" example,
for this challenge, convert even-numbered lines to upper-case and odd-numbered
lines to lower-case. Consider the first line to be odd-numbered. For example
given this input:

    One
    Two
    Three
    Four

Your program should output:

    one
    TWO
    three
    FOUR

You can use the `split` module to split input by newlines. For example:

    var split = require('split');
    process.stdin
        .pipe(split())
        .pipe(through2(function (line, _, next) {
            console.dir(line.toString());
            next();
        }))
    ;

`split` will buffer chunks on newlines before you get them. In the previous
example, we will get separate events for each line even though all the data
probably arrives on the same chunk:

    $ echo -e 'one\ntwo\nthree' | node split.js
    'one'
    'two'
    'three'

Your own program should use `split` in this way, but you should transform the
input and pipe the output through to `process.stdout`.

Make sure to `npm install split through2` in the directory where your solution
file lives.
*/

const Assert = require("assert");
const Through = require("through2");
const Split = require("split");


function writeUpperCase(buffer, encoding, next) {

  this.push(buffer.toString().toUpperCase());
}

function writeLowerCase(buffer, encoding, next) {

  this.push(buffer.toString().toLowerCase());
}

const funcs = [writeUpperCase, writeLowerCase];

function toggleUpperAndLower(buffer, encoding, next) {

  this.lineNumber = this.lineNumber || 0
  const funcIndex = (this.lineNumber += 1) % 2;
  funcs[funcIndex].apply(this, arguments);
  this.push("\n");

  return next();
}

const upperCaseStream = Through(toggleUpperAndLower);

process.stdin
  .pipe(Split())
  .pipe(upperCaseStream)
  .pipe(process.stdout)
