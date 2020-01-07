#!/usr/bin/env node
const program = require("commander")
const run = require("../lib/run")
const minimist = require("minimist")
try {
    program.option('-m,--mode',"打包环境");
    program.parse(process.argv);
    let type = program.args[0];
    let args = minimist(process.argv.slice(2))
    run(type,args.mode)
} catch (error) {
  console.log(error)  
}
