const { Volume, createFsFromVolume } = require("memfs");
const fsFromArray = (list) =>
  createFsFromVolume(
    Volume.fromJSON(Object.fromEntries(list.map((path) => [path, ""])), "/")
  );
const fs = fsFromArray([
  "index.js",
  "src/a.js",
  "src/b.mjs",
  "src/c.jsx",
  "src/d/d1.js",
]);
jest.setMock("fs", fs);
jest.setMock("fs/promises", fs.promises);

const expandPatterns = require("./expandPatterns");

describe("expandPatterns with single dot (.) arguments", () => {
  it("should return correnct number of paths", async () => {
    expect.assertions(5);
    for await (const _ of expandPatterns(["."], "/")) {
      expect(true).toBe(true);
    }
  });
});

describe("expandPatterns with single path arguments", () => {
  it("should return correnct number of paths", async () => {
    expect.assertions(1);
    for await (const _ of expandPatterns(["index.js"], "/")) {
      expect(true).toBe(true);
    }
  });
});

describe("expandPatterns with glob arguments", () => {
  it("should return correnct number of paths", async () => {
    expect.assertions(3);
    for await (const _ of expandPatterns(["src/*"], "/")) {
      expect(true).toBe(true);
    }
  });

  it("should return correnct number of paths", async () => {
    expect.assertions(3);
    for await (const _ of expandPatterns(["**/*.js"], "/")) {
      expect(true).toBe(true);
    }
  });
});

describe("expandPatterns with redundant non-glob arguments", () => {
  it("should return correnct number of paths", async () => {
    expect.assertions(1);
    for await (const _ of expandPatterns(["index.js", "index.js"], "/")) {
      expect(true).toBe(true);
    }
  });

  it("should return correnct number of paths", async () => {
    expect.assertions(4);
    for await (const _ of expandPatterns(["src", "src/a.js"], "/")) {
      expect(true).toBe(true);
    }
  });

  it("should return correnct number of paths", async () => {
    expect.assertions(4);
    for await (const _ of expandPatterns(["src/a.js", "src"], "/")) {
      expect(true).toBe(true);
    }
  });

  it("should return correnct number of paths", async () => {
    expect.assertions(4);
    for await (const _ of expandPatterns(["src", "src/"], "/")) {
      expect(true).toBe(true);
    }
  });
});

describe("expandPatterns with redundant glob arguments", () => {
  it("should return correnct number of paths", async () => {
    expect.assertions(3);
    for await (const _ of expandPatterns(["src/*.js", "src/*.*"], "/")) {
      expect(true).toBe(true);
    }
  });
});
