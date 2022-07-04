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

const cleanPatterns = (patterns, ignores) => {
  return patterns
    .sort()
    .filter(
      (pattern, patternIndex) =>
        !patterns.some(
          (parent, parentIndex) =>
            pattern.startsWith(parent) && parentIndex !== patternIndex
        ) && !ignores.some((ignore) => pattern.startsWith(ignore))
    );
};

async function* expandPatterns(patterns) {
  const cwd = process.cwd();
  const gitignore = await fs.readFile(cwd + "/.gitignore", "utf-8");
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

module.exports = expandPatterns;
