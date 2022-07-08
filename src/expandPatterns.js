const { promises: fs } = require("node:fs");
const fastGlob = require("fast-glob");
const prettier = require("prettier");
const { languages } = prettier.getSupportInfo();
const extensionsGlob = `**/*{${[...languages.flatMap((l) => l.extensions)]}}`;

const statSafe = async (path) => {
  try {
    return await fs.stat(path);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const readFileSafe = async (path) => {
  try {
    return await fs.readFile(path, "utf-8");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const cleanPatterns = (patterns, ignores) => {
  return patterns
    .sort()
    .filter(
      (pattern, patternIndex) =>
        !patterns.some(
          (parent, parentIndex) =>
            pattern.startsWith(parent) && patternIndex > parentIndex
        ) && !ignores.some((ignore) => pattern.startsWith(ignore))
    );
};

async function* expandPatternsInternal(patterns, cwd = process.cwd()) {
  const gitignore = (await readFileSafe(cwd + "/.gitignore")) ?? "";
  const ignore = [
    ".git",
    ...gitignore
      .split("\n")
      .filter((line) => !line.includes("!") && !!line)
      .map((line) => line.replace(/[/]+$/, "")),
  ];
  const options = { cwd, dot: true, ignore };

  for (const pattern of cleanPatterns(patterns, ignore)) {
    const stat = await statSafe(pattern);
    if (stat) {
      if (stat.isFile()) {
        yield pattern;
      } else if (stat.isDirectory()) {
        yield* await fastGlob(`${pattern}/${extensionsGlob}`, options);
      }
    } else {
      yield* await fastGlob(pattern, options);
    }
  }
}

async function* expandPatterns(patterns, cwd = process.cwd()) {
  const seen = new Set();

  for await (const path of expandPatternsInternal(patterns, cwd)) {
    if (seen.has(path)) {
      continue;
    }

    seen.add(path);
    yield path;
  }
}

module.exports = expandPatterns;
