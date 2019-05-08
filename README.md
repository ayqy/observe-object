# Observe Object

Observe JavaScript objects with native [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## Features

- No messy APIs, just `observe(anyObject)` and **Happy Watching**.

- Support all intrinsic array functions, such as `pop()`, `splice()`, `arr.length=0`

## Usage & Cases

```
// Original object
const obj = { a: 1 };

// Just observe it by
const observed = observe(obj, (obContext, property, value) => {/*...*/});

// Case1. Add new heavy-weight property
observed.b = {
  c: {
    d: [{
      e: 100
    }]
  }
};
======= Property Change =======
HostObject { a: 1 }
Property 'b'
PropertyPath '["b"]'
OldValue null
NewValue { c: { d: [ { e: 100 } ] } }

// Case2. Push new elements into a deep array
observed.b.c.d.push(1, 2);
======= Property Change =======
HostObject { a: 1, b: { c: { d: [ { e: 100 } ] } } }
Property '1'
PropertyPath '["b"]["c"]["d"]["1"]'
OldValue null
NewValue 1
======= Property Change =======
HostObject { a: 1, b: { c: { d: [ { e: 100 }, 1 ] } } }
Property '2'
PropertyPath '["b"]["c"]["d"]["2"]'
OldValue null
NewValue 2
======= Property Change =======
HostObject { a: 1, b: { c: { d: [ { e: 100 }, 1, 2 ] } } }
Property 'length'
PropertyPath '["b"]["c"]["d"]["length"]'
OldValue 3
NewValue 3

// Case3. Modify deep things
observed.b.c.d[0].e = -1;
======= Property Change =======
HostObject { a: 1, b: { c: { d: [ { e: 100 }, 1, 2 ] } } }
Property 'e'
PropertyPath '["b"]["c"]["d"]["0"]["e"]'
OldValue 100
NewValue -1

// Original object
console.log(obj);
{ a: 1, b: { c: { d: [Array] } } } { depth: null }

// Observed object
console.log(observed);
{ a: 1, b: { c: { d: [ { e: -1 }, 1, 2 ] } } }
```
