function parse(input) {
  let lines = input.trimEnd().split("\n");
  let root = {name: "/", files: {}, subDirectories: {}, parent: null};
  let current = undefined;
  for(const line of lines) {
    if (line.startsWith('$')) {
      let parts = line.split(" ");
      if (parts[1] === "cd") {
        if (parts[2] === "..") {
          current = current.parent;
        } else {
          current = (parts[2] == "/") ? root : current.subDirectories[parts[2]];
        }
      }
    } else {
      let parts = line.split(" ");
      if (parts[0] === "dir") {
        current.subDirectories[parts[1]] = {name: parts[1], subDirectories: {}, files: {}, parent: current};
      } else {
        current.files[parts[1]] = parseInt(parts[0]);
      }
    }
  }
  return root;
}

function collectDirectorySizes(node, result) {
  let total = 0;
  for(const [name, size] of Object.entries(node.files)) {
    total += size;
  }
  result[node.name] = {};
  if (result[node.name]['subDirectories'] == undefined) {
    result[node.name].subDirectories = {};
  }
  for (const [name, value] of Object.entries(node.subDirectories)) {
    total += collectDirectorySizes(value, result[node.name].subDirectories);
  }
  result[node.name].size = total;
  return total;
}

module.exports = {parse, collectDirectorySizes};