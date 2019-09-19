import parseBattlefield from "../../../days/15/parseBattlefield";

it("should parse a wall correctly", () => {
  expect(parseBattlefield("#")).toEqual({ battlefield: [["wall"]], units: [] });
});

it("should parse a cavern correctly", () => {
  expect(parseBattlefield(".")).toEqual({
    battlefield: [["cavern"]],
    units: []
  });
});

it("should parse a goblin correctly", () => {
  expect(parseBattlefield("G")).toEqual({
    battlefield: [["cavern"]],
    units: [{ type: "goblin", health: 200, position: { row: 0, column: 0 } }]
  });
});

it("should parse an elf correctly", () => {
  expect(parseBattlefield("E")).toEqual({
    battlefield: [["cavern"]],
    units: [{ type: "elf", health: 200, position: { row: 0, column: 0 } }]
  });
});

it("should parse the field properly", () => {
  const field = `#######      
    #.G.EE#         
    #######`;
  expect(parseBattlefield(field)).toEqual({
    battlefield: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "cavern", "cavern", "cavern", "cavern", "cavern", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"]
    ],
    units: [
      { type: "goblin", health: 200, position: { row: 1, column: 2 } },
      { type: "elf", health: 200, position: { column: 4, row: 1 } },
      { type: "elf", health: 200, position: { column: 5, row: 1 } }
    ]
  });
});
