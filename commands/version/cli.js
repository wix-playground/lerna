#!/usr/bin/env node

"use strict";

const cli = require("@lerna/cli");

const versionCmd = require("./index");

const pkg = require("./package.json");

module.exports = main;

function main(argv) {
  const context = {
    lernaVersion: pkg.version,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return cli()
    .command(versionCmd)
    .parse(argv, context);
}

main(process.argv.slice(2))
