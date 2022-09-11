import * as lib from './lib';
import * as core from '@actions/core';

try {
    const configPath = core.getInput('config_file')
    const workdir = lib.getWorkDir(configPath)
    core.info(`work_dirs: ${workdir}`)
    core.setOutput("work_dirs", workdir);
} catch (error) {
    core.setFailed(error.message)
}

