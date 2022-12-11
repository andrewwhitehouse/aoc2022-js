const {parse} = require('../day7');

describe('Day 7', () => {
  it('should parse empty directory', () => {
    let result = parse("$ cd /\n");
    let expected = {
      name: "/",
      files: {},
      subDirectories: []
    };
    expect(result).toEqual(expected);
  });

  it('should pass directory with files', () => {
    let input = "$ cd /\n" +
      "$ ls\n" +
      "14848514 b.txt\n" +
      "8504156 c.dat\n";
    let expected = {
      name: "/",
      files: {"b.txt": 14848514, "c.dat": 8504156},
      subDirectories: []
    };
    expect(parse(input)).toEqual(expected);
  });
})