import solve from "../../../days/15/Day15Part1";

it.skip("should calculate the combat result for all the fields correctly", () => {
  const firstField = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;
  const secondField = `#######
#G..#E#
#E#E.E#
#G.##.# 
#...#E# 
#...E.# 
#######`;
  const thirdField = `#######         
#E..EG#      
#.#G.E#    
#E.##E# 
#G..#.#    
#..E#.#   
#######`;
  const fourthField = `#######      
#E.G#.#     
#.#G..#    
#G.#.G#  
#G..#.#    
#...E.#     
#######`;
  const fifthField = `#######      
#.E...#    
#.#..G#    
#.###.#   
#E#G#G#     
#...#G#     
####### `;
  const sixthField = `#########   
#G......#     
#.E.#...#     
#..##..G#     
#...##..#  
#...#...#     
#.G...G.#     
#.....G.#      
#########`;
  expect(solve(firstField)).toBe(27730);
  expect(solve(secondField)).toBe(36634);
  expect(solve(thirdField)).toBe(39514);
  expect(solve(fourthField)).toBe(27755);
  expect(solve(fifthField)).toBe(28944);
  expect(solve(sixthField)).toBe(18740);
});
