#!/usr/bin/env node
const { program } = require('commander');
const shell = require('shelljs');
const chalk = require('chalk');
const devServer = require('../lib/dev');
const buildProject = require('../lib/build');
let { existsSync, readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const webpackConfigFn = require('../config/webpack.base.config');

program.version('0.0.1');
program
 .option('-d, --debug', 'output extra debugging')
 .option('-r, --run-type <type>', 'run a project')
 .parse(process.argv);



const { runType } = program.opts();
if (runType) {
    const cwd = process.cwd();
    const mode = runType === 'dev' ? 'development' : 'production';
    const configFilePath = path.join(cwd,'config');
    console.log(configFilePath,runType, 'config');
    if(existsSync(configFilePath)){
        const files = readdirSync(configFilePath);
        let startFilePath;
        if(files) startFilePath = path.join(configFilePath,files.find(f => f.startsWith(runType)));
        const extraConfig = require(startFilePath);
        const webpackConfig  = webpackConfigFn({cwd, mode, extraConfig});
        if(mode === 'development'){
            devServer(webpackConfig, extraConfig.port, path.join(cwd,'build'));
        }else{
            buildProject(webpackConfig);
        }
    }else{
        console.log(chalk.red('not exist config director,please create config director'));
    }
}