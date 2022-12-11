const {parse, collectDirectorySizes} = require('../day7');

describe('Day 7', () => {
  it('should parse empty directory', () => {
    let result = parse("$ cd /\n");
    let expected = {
      name: "/",
      files: {},
      subDirectories: {},
      parent: null
    };
    expect(result).toEqual(expected);
  });

  it('should parse directory with files', () => {
    let input = "$ cd /\n" +
      "$ ls\n" +
      "14848514 b.txt\n" +
      "8504156 c.dat\n";
    let expected = {
      name: "/",
      files: {"b.txt": 14848514, "c.dat": 8504156},
      subDirectories: {},
      parent: null
    };
    expect(parse(input)).toEqual(expected);
  });

  it('should parse nested directory', () => {
    let input = "$ cd /\n" +
      "$ ls\n" +
      "dir a\n" +
      "14848514 b.txt\n" +
      "8504156 c.dat\n" +
      "$ cd a\n" +
      "$ ls\n" +
      "29116 f\n" +
      "2557 g\n" +
      "62596 h.lst";
    let a = {
      name: "a",
      files: {"f": 29116, "g": 2557, "h.lst": 62596},
      subDirectories: {}
    };
    let expected = {
      name: "/",
      files: {"b.txt": 14848514, "c.dat": 8504156},
      subDirectories: {"a": a},
      parent: null
    };
    a.parent = expected;
    expect(parse(input)).toEqual(expected);
  });

  let exampleInput = "$ cd /\n" +
    "$ ls\n" +
    "dir a\n" +
    "14848514 b.txt\n" +
    "8504156 c.dat\n" +
    "dir d\n" +
    "$ cd a\n" +
    "$ ls\n" +
    "dir e\n" +
    "29116 f\n" +
    "2557 g\n" +
    "62596 h.lst\n" +
    "$ cd e\n" +
    "$ ls\n" +
    "584 i\n" +
    "$ cd ..\n" +
    "$ cd ..\n" +
    "$ cd d\n" +
    "$ ls\n" +
    "4060174 j\n" +
    "8033020 d.log\n" +
    "5626152 d.ext\n" +
    "7214296 k";

  function exampleDirectoryStructure() {
    let e = {name: "e", files: {"i": 584}, subDirectories: {}};
    let a = {name: "a", files: {"f": 29116, "g": 2557, "h.lst": 62596}, subDirectories: {"e": e}};
    e.parent = a;
    let d = {name: "d", files: {"j": 4060174, "d.log": 8033020, "d.ext": 5626152, "k": 7214296}, subDirectories: {}};
    let root = {
      name: "/",
      files: {"b.txt": 14848514, "c.dat": 8504156},
      subDirectories: {"a": a, "d": d},
      parent: null
    };
    a.parent = root;
    d.parent = root;
    return root;
  }

  it('should parse full example', () => {
    expect(parse(exampleInput)).toEqual(exampleDirectoryStructure());
  });

  it('should parse full example', () => {
    expect(parse(exampleInput)).toEqual(exampleDirectoryStructure());
  });

  it('should calculate directory sizes', () => {
    let sizes = {};
    collectDirectorySizes(exampleDirectoryStructure(), sizes);
    console.log(sizes);
    expect(sizes).toEqual({
      "/": {
        "size": 48381165,
        "subDirectories": {
          "a": {"size": 94853, "subDirectories": {"e": {"size": 584, "subDirectories": {}}}},
          "d": {"size": 24933642, "subDirectories": {}}}
      }
    });
  });
})