const {parse} = require('../day7');

describe('Day 7', () => {
  it('should parse empty directory', () => {
    let result = parse("$ cd /\n");
    let expected = {
      name: "/",
      files: [],
      subDirectories: []
    };
    expect(result).toEqual(expected);
  })
})