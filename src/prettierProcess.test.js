const prettierProcess = require("./prettierProcess.js");

const ansiRed = "\x1b[31m";
const ansiGreen = "\x1b[32m";
const ansiGray = "\x1b[90m";

describe("call with prettier formatted source", () => {
  const source = "true;\n";
  const result = prettierProcess(source, "index.js");

  it("should be unchanged", async () => {
    const { output } = await result;
    expect(output).toBe(source);
  });

  it(`should contain gray "prettier:none"`, async () => {
    const { message } = await result;
    expect(message).toContain("prettier:none");
    expect(message).toContain(ansiGray);
  });
});

describe("call with unformatted source", () => {
  const source = "true;";
  const result = prettierProcess(source, "index.js");

  it("should be changed", async () => {
    const { output } = await result;
    expect(output).not.toBe(source);
  });

  it(`should contain green "prettier:done"`, async () => {
    const { message } = await result;
    expect(message).toContain("prettier:done");
    expect(message).toContain(ansiGreen);
  });
});

describe("call with invalid source", () => {
  const source = ".";
  const result = prettierProcess(source, "index.js");

  it("should return the source back", async () => {
    const { output } = await result;
    expect(output).toBe(source);
  });

  it(`should contain red "prettier:err"`, async () => {
    const { message } = await result;
    expect(message).toContain("prettier:err");
    expect(message).toContain(ansiRed);
  });
});
