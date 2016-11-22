"use strict";

const Assert = require("assert");
const FS = require("fs");


const filename = process.argv[2]
Assert(filename, "Expects a filename");

FS.createReadStream(filename)
  .pipe(process.stdout)
