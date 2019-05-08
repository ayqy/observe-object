function observe(object, onChange = () => {}) {
  return new Proxy(object, handleProxy(object, onChange));
}

function handleProxy(object, onChange, obContext = { propPath: [], hostObject: object }) {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(
          target[property],
          handleProxy(target[property], onChange, Object.assign({}, obContext, {
            propPath: obContext.propPath.concat([`${property}`])
          }))
        );
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      onChange(Object.assign({}, obContext, {
        propPath: obContext.propPath.concat([`${property}`])
      }), property, descriptor.value);
      return Reflect.defineProperty(target, property, descriptor);
    },
    deleteProperty(target, property) {
      onChange(Object.assign({}, obContext, {
        propPath: obContext.propPath.concat([`${property}`])
      }), property);
      return Reflect.deleteProperty(target, property);
    }
  };

  return handler;
}

module.exports = observe;
