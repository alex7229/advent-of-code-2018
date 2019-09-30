import solve from "../../../days/15/Day15Part1";

it("should calculate the first battle properly", () => {
  const field = `#######
  #.G...#
  #...EG#
  #.#.#G#
  #..G#E#
  #.....#
  #######`;
  expect(solve(field)).toBe(27730);
});

it("should calculate the second battle properly", () => {
  const field = `#######      
  #G..#E#      
  #E#E.E#     
  #G.##.# 
  #...#E#    
  #...E.#    
  #######`;
  expect(solve(field)).toBe(36334);
});

it("should calculate the third battle properly", () => {
  const field = `#######    
  #E..EG#    
  #.#G.E#    
  #E.##E#  
  #G..#.#    
  #..E#.#     
  #######`;
  expect(solve(field)).toBe(39514);
});

it("should calculate the fourth battle properly", () => {
  const field = `#######     
  #E.G#.#      
  #.#G..#     
  #G.#.G# 
  #G..#.#      
  #...E.#      
  #######`;
  expect(solve(field)).toBe(27755);
});

it("should calculate the fifth battle properly", () => {
  const field = `#######      
  #.E...#   
  #.#..G#      
  #.###.#  
  #E#G#G#   
  #...#G#     
  #######`;
  expect(solve(field)).toBe(28944);
});

it("should calculate the sixth battle properly", () => {
  const field = `#########      
  #G......#    
  #.E.#...#     
  #..##..G#    
  #...##..# 
  #...#...#    
  #.G...G.#     
  #.....G.#     
  #########`;
  expect(solve(field)).toBe(18740);
});
