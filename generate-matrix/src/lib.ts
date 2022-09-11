import * as fs from 'fs';
import * as core from '@actions/core';

function getLabels(): string[] {
    const labelsFileName = 'labels.txt'
    const labelsFilePath = process.env.CI_INFO_TEMP_DIR
    let r = fs.readFileSync(labelsFilePath + "/" + labelsFileName).toString().split(/\r?\n/).filter(Boolean);
    let labels = Object.values(r)

    return labels;
}

export function getWorkDir(configPath: string): string[] {
    const labels = getLabels();
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

    let workDirs = new Array();
    for (var idx in labels) {
        let key = labels[idx];
        for (var i in configData[key]) {
            workDirs.push(configData[key][i])
        }
    }

    if (workDirs.length == 0) {
        core.setFailed("Labels must be selected.");
    }

    // merge working directories
    let set = new Set(workDirs)
    let setToArr = Array.from(set)

    return setToArr;
}
