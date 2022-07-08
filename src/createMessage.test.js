const createMessage = require("./createMessage");
const ansiRed = "\x1b[31m";
const ansiGreen = "\x1b[32m";
const ansiGray = "\x1b[90m";

describe("call with no arguments", () => {
  const result = createMessage();

  it(`should contain "none"`, () => {
    expect(result).toContain("none");
  });

  it("should have gray colors", () => {
    expect(result).toContain(ansiGray);
  });
});

describe("call with isDone = true", () => {
  const result = createMessage("", 0, { isDone: true });

  it(`should contain "done"`, () => {
    expect(result).toContain("done");
  });

  it("should have green colors", () => {
    expect(result).toContain(ansiGreen);
  });
});

describe("call with isError = true", () => {
  const result = createMessage("", 0, { isError: true });

  it(`should contain "err"`, () => {
    expect(result).toContain("err");
  });

  it("should have red colors", () => {
    expect(result).toContain(ansiRed);
  });
});

describe("call with both isDone = true and isError = true", () => {
  const result = createMessage("", 0, { isError: true });

  it(`should contain "err"`, () => {
    expect(result).toContain("err");
  });

  it("should have red colors", () => {
    expect(result).toContain(ansiRed);
  });
});
