import { operations, runOperation, State } from "../../../days/16/operations";

describe("addition", () => {
  it("addr", () => {
    const state: State = [2, 5, 1, 5];
    // 5 + 1 into 3-rd register
    expect(operations.addr(1, 2, state)).toEqual(6);
  });
  it("addi", () => {
    const state: State = [2, 6, 21, 21];
    // add '11' to 2
    expect(operations.addi(0, 11, state)).toBe(13);
  });
});

describe("multiplication", () => {
  it("mulr", () => {
    const state: State = [2, 5, 1, 5];
    // 1 x 5
    expect(operations.mulr(1, 2, state)).toBe(5);
  });
  it("muli", () => {
    const state: State = [2, 6, 21, 21];
    // multiply 2 by '11'
    expect(operations.muli(0, 11, state)).toBe(22);
  });
});

describe("bitwise AND", () => {
  it("banr", () => {
    const state: State = [2, 5, 1, 5];
    // 5 & 1
    expect(operations.banr(1, 2, state)).toBe(1);
  });
  it("bani", () => {
    const state: State = [2, 6, 21, 21];
    // 2 & 11
    expect(operations.bani(0, 11, state)).toBe(2);
  });
});

describe("bitwise OR", () => {
  it("borr", () => {
    const state: State = [2, 5, 1, 5];
    // 5 | 1
    expect(operations.borr(1, 2, state)).toBe(5);
  });
  it("bori", () => {
    const state: State = [2, 6, 21, 21];
    // 2 | 11
    expect(operations.bori(0, 11, state)).toBe(11);
  });
});

describe("assignment", () => {
  it("setr", () => {
    const state: State = [2, 5, 1, 5];
    expect(operations.setr(1, 2, state)).toBe(5);
  });
  it("seti", () => {
    const state: State = [2, 6, 21, 21];
    expect(operations.seti(0, 11, state)).toBe(0);
  });
});

describe("greater-than testing", () => {
  it("gtir", () => {
    expect(operations.gtir(1, 2, [2, 4, 0, 51])).toBe(1);
    expect(operations.gtir(1, 2, [2, 4, 5, 51])).toBe(0);
  });
  it("gtri", () => {
    expect(operations.gtri(1, 2, [2, 4, 0, 51])).toBe(1);
    expect(operations.gtri(1, 2, [2, 0, 15, 51])).toBe(0);
  });
  it("gtrr", () => {
    expect(operations.gtrr(1, 2, [2, 4, 0, 51])).toBe(1);
    expect(operations.gtrr(1, 2, [2, 0, 15, 51])).toBe(0);
  });
});

describe("equality testing", () => {
  it("eqir", () => {
    expect(operations.eqir(1, 2, [2, 4, 1, 51])).toBe(1);
    expect(operations.eqir(1, 2, [2, 4, 5, 51])).toBe(0);
  });
  it("eqri", () => {
    expect(operations.eqri(1, 4, [2, 4, 0, 51])).toBe(1);
    expect(operations.eqri(1, 2, [2, 0, 15, 51])).toBe(0);
  });
  it("eqrr", () => {
    expect(operations.eqrr(1, 2, [2, 4, 4, 51])).toBe(1);
    expect(operations.eqrr(1, 2, [2, 0, 15, 51])).toBe(0);
  });
});

describe("run operation", () => {
  it("simple addition addr", () => {
    const state: State = [2, 52, 2, 22];
    expect(runOperation("addr", 1, 0, 1, state)).toEqual([2, 54, 2, 22]);
  });

  it("assignment setr", () => {
    const state: State = [2, 0, -12, 52];
    expect(runOperation("setr", 2, 232, 1, state)).toEqual([2, -12, -12, 52]);
  });

  it("equality eqrr", () => {
    const state: State = [-12, 0, -12, 52];
    expect(runOperation("eqrr", 0, 2, 2, state)).toEqual([-12, 0, 1, 52]);
  });
});
