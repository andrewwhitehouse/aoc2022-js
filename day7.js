function parse(input) {
  let lines = input.trimEnd().split("\n");
  let files = {};
  for(const line of lines) {
    if (!line.startsWith('$')) {
      let parts = line.split(" ");
      console.log(parts);
      files[parts[1]] = parseInt(parts[0]);
    }
  }
  return {name: "/", files: files, subDirectories: []};
}

module.exports = {parse}