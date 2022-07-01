const { promises: fs } = require("node:fs");
const fastGlob = require("fast-glob");

const statSafe = async (path) => {
  try {
    return await fs.stat(path);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

async function* expandPatterns(patterns) {
  const cwd = process.cwd();
  const ignore = [".git", "node_modules"];
  const options = { dot: true, cwd, ignore };

  for (const pattern of patterns) {
    const stat = await statSafe(pattern);
    if (stat) {
      if (stat.isFile()) {
        yield pattern;
      } else if (stat.isDirectory()) {
        yield* await fastGlob(`${pattern}/**/*`, options);
      }
    } else {
      yield* await fastGlob(pattern, options);
    }
  }
};

module.exports = expandPatterns;
