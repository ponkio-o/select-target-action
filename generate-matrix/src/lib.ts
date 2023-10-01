import * as fs from 'fs';
import * as core from '@actions/core';

const defaultTargetKey = 'default'

export function getTargets(configPath: string): string[] {
    const labels = getLabels();
    const configData = getConfigData(configPath)

    return parseConfigData(labels, configData);
}

export function getLabels(): string[] {
    const labelsFileName = 'labels.txt'
    const labelsFilePath = process.env.CI_INFO_TEMP_DIR
    let r = fs.readFileSync(labelsFilePath + "/" + labelsFileName).toString().split(/\r?\n/).filter(Boolean);
    let labels = Object.values(r)

    return labels;
}

export function getConfigData(configPath: string): any {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
}

export function parseConfigData(labels: string[], configData: any): string[] {
    let targets = new Array();
    for (var idx in labels) {
        let key = labels[idx];
        for (var i in configData[key]) {
            targets.push(configData[key][i])
        }
    }

    // If targets don't exist, use default targets
    if (targets.length == 0) {
        if (configData[defaultTargetKey] != undefined && configData[defaultTargetKey].length != 0) {
            core.info("Use default target")
            targets = configData[defaultTargetKey]
        } else {
            core.debug(`targets: ${String(targets)}`)
            core.debug(`labels: ${String(labels)}`)
            core.setFailed("Select labels or set default target. See  https://github.com/ponkio-o/select-target-action/blob/main/README.md#default-target");
        }
    }

    // Merge working directories
    let set = new Set(targets)
    let setToArr = Array.from(set)

    return setToArr;
}
