import {parseConfigData} from "../src/lib";

test("Check single label (single target)", () => {
    const labels: string[] = ["target:staging"]
    const data =
    {
        "target:staging": [
            "envs/staging"
        ]
    }
    const result = parseConfigData(labels, data);
    expect(result).toEqual(["envs/staging"]);
});

test("Check single label (multiple targets)", () => {
    const labels: string[] = ["target:all"]
    const data =
    {
        "target:all": [
            "envs/development",
            "envs/staging",
            "envs/production",
        ]
    }
    const result = parseConfigData(labels, data);
    expect(result).toEqual(["envs/development", "envs/staging", "envs/production"]);
});

test("Check multiple labels", () => {
    const labels: string[] = ["target:staging", "target:production"]
    const data =
    {
        "target:staging": [
            "envs/staging"
        ],
        "target:production": [
            "envs/production"
        ]
    }
    const result = parseConfigData(labels, data);
    expect(result).toEqual(["envs/staging", "envs/production"]);
});

test("Check if target is merged", () => {
    const labels: string[] = ["target:all", "target:production"]
    const data =
    {
        "target:all": [
            "envs/development",
            "envs/staging",
            "envs/production"
        ],
        "target:production": [
            "envs/production"
        ]
    }
    const result = parseConfigData(labels, data);
    expect(result).toEqual(["envs/development", "envs/staging", "envs/production"]);
});

test("Check fallback to default target when didn't specify a label", () => {
    const labels: string[] = [""]
    const data =
    {
        "default": [
            "envs/development",
            "envs/staging",
            "envs/production"
        ]
    }
    const result = parseConfigData(labels, data);
    expect(result).toEqual(["envs/development", "envs/staging", "envs/production"]);
});

test("Check fallback to default target when did specify a invalid label", () => {
    const labels: string[] = ["target:invalid"]
    const data =
    {
        "default": [
            "envs/development",
            "envs/staging",
            "envs/production"
        ]
    }
    const result = parseConfigData(labels, data);
    expect(result).toEqual(["envs/development", "envs/staging", "envs/production"]);
});

test("Check if invalid labels are skipped", () => {
    const labels: string[] = ["target:invalid", "target:production"]
    const data =
    {
        "target:production": [
            "envs/production"
        ]
    }
    const result = parseConfigData(labels, data);
    expect(result).toEqual(["envs/production"]);
});
