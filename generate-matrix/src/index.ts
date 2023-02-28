import * as lib from './lib';
import * as core from '@actions/core';

try {
    const configPath = core.getInput('config_file')
    const targets = lib.getTargets(configPath)
    core.info(`targets: ${targets}`)
    core.setOutput("targets", targets);
} catch (error) {
    core.setFailed(error.message)
}

