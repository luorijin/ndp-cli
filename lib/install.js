const program = require('commander')
const install = require('./template/install')
const logger = require("../lib/template/logger")
const tempMap = require('../template/map.json')

program.parse(process.argv);
let tempName = program.args[0];
if(tempMap[tempName]){
    logger.fatal("模板已存在,,替换执行update")
    return;
}
install(tempName)