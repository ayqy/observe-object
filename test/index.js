const observe = require('../index');
const { get, logValue } = require('./utils');

// Tests
const obj = { a: 1 };
console.log(`
// Original object
const obj = { a: 1 };`);

console.log(`
// Just observe it by
const observed = observe(obj, (obContext, property, value) => {/*...*/});`);
const observed = observe(obj, (obContext, property, value) => {
  console.log(`======= Property Change =======`);
  logValue('HostObject', obContext.hostObject);
  logValue('Property', property);
  logValue('PropertyPath', `${obContext.propPath.map(v => `["${v}"]`).join('')}`);
  logValue('OldValue', get(obContext.hostObject, obContext.propPath));
  logValue('NewValue', value);
});

console.log(`
// Case1. Add new heavy-weight property
observed.b = {
  c: {
    d: [{
      e: 100
    }]
  }
};`);
observed.b = {
  c: {
    d: [{
      e: 100
    }]
  }
};

console.log(`
// Case2. Push new elements into a deep array
observed.b.c.d.push(1, 2);`);
observed.b.c.d.push(1, 2);

console.log(`
// Case3. Modify deep things
observed.b.c.d[0].e = -1;`);
observed.b.c.d[0].e = -1;

// Finally
console.log(`
// Original object
console.log(obj);`);
console.log(obj, { depth: null });

console.log(`
// Observed object
console.log(observed);`);
console.dir(observed, { depth: null });
