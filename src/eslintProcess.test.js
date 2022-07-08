const eslintProcess = require("./eslintProcess.js");

const ansiRed = "\x1b[31m";
const ansiGreen = "\x1b[32m";
const ansiGray = "\x1b[90m";

describe("call with eslint formatted source", () => {
  const source = "true;\n";
  const result = eslintProcess(source, "index.js");

  it("should be unchanged", async () => {
    const { output } = await result;
    expect(output).toBe(source);
  });

  it(`should contain gray "eslint:none"`, async () => {
    const { message } = await result;
    expect(message).toContain("eslint:none");
    expect(message).toContain(ansiGray);
  });
});

describe("call with unformatted source", () => {
  const source = "const b = true; if (!!b) {b}";
  const result = eslintProcess(source, "index.js");

  it("should be changed", async () => {
    const { output } = await result;
    expect(output).not.toBe(source);
  });

  it(`should contain green "eslint:done"`, async () => {
    const { message } = await result;
    expect(message).toContain("eslint:done");
    expect(message).toContain(ansiGreen);
  });
});

describe("call with invalid source", () => {
  const source = ".";
  const result = eslintProcess(source, "index.js");

  it("should return the source back", async () => {
    const { output } = await result;
    expect(output).toBe(source);
  });

  it(`should contain red "eslint:err"`, async () => {
    const { message } = await result;
    expect(message).toContain("eslint:err");
    expect(message).toContain(ansiRed);
  });
});
