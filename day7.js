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

function sumSmallerFileSizes(node, maxSize) {
  let total = 0;
  for (const [key, obj] of Object.entries(node)) {
    if (obj.size <= maxSize) {
      total += obj.size;
    }
    if (Object.keys(obj.subDirectories).length > 0) {
      total += sumSmallerFileSizes(obj.subDirectories, maxSize);
    }
  }
  return total;
}

function solvePart1(input) {
  let directoryStructure = parse(input);
  let sizes = {};
  collectDirectorySizes(directoryStructure, sizes);
  let total = sumSmallerFileSizes(sizes, 100000);
  return total;
}

module.exports = {parse, collectDirectorySizes, sumSmallerFileSizes, solvePart1};