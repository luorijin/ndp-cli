#!/usr/bin/env node
const program = require("commander")
const run = require("../lib/run")
const minimist = require("minimist")
try {
    program.option('-m,--mode',"打包环境")
    program.command('init <templat-name> <project-name>')
    .description('创建项目');
    program.command('dev')
    .description('运行项目')
    program.command('build')
    .description('打包项目');
    program.command('install <templat-name>')
    .description('安装本地模板');
    program.command('update <templat-name> [options]')
    .description('更新模板，直接覆盖,-I:本地,默认:远程');
    program.parse(process.argv);
    let type = program.args[0];
    let args = minimist(process.argv.slice(2))
    run(type,args.mode)
} catch (error) {
  console.log(error)  
}
