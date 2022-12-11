function parse(input) {
  let lines = input.trimEnd().split("\n");
  let root = {name: "/", files: {}, subDirectories: {}, parent: null};
  let current = undefined;
  for(const line of lines) {
    console.log(line);
    console.log(root);
    if (line.startsWith('$')) {
      console.log("Command " + line);
      let parts = line.split(" ");
      if (parts[1] === "cd") {
        if (parts[2] === "..") {
          current = current.parent;
        } else {
          current = (parts[2] == "/") ? root : current.subDirectories[parts[2]];
        }
      }
    } else {
      console.log("Not a command " + line);
      let parts = line.split(" ");
      if (parts[0] === "dir") {
        current.subDirectories[parts[1]] = {name: parts[1], subDirectories: {}, files: {}, parent: current};
      } else {
        console.log(parts);
        current.files[parts[1]] = parseInt(parts[0]);
      }
    }
  }
  return root;
}

module.exports = {parse}