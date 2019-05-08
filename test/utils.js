function get(object, path) {
  let index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

function logValue(name = '', obj = null) {
  process.stdout.write(`${name} `);
  console.dir(obj, { depth: null });
}

module.exports = {
  get,
  logValue
};
