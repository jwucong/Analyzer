const hasOwnProperty = require("./util").hasOwnProperty
console.log(hasOwnProperty)

class Analyzer {
  constructor(options) {
    const createReadOnlyProperty = value => ({
      value,
      writable: false,
      enumerable: true,
      configurable: true
    });
    Object.defineProperties(this, {
      name: createReadOnlyProperty('Analyzer'),
      version: createReadOnlyProperty('1.0.0')
    });
  }

  init() {
    const that = this;
    const script = document.createElement('script');
    script.onload = function () {
      console.log(that.name);
    };
  }

  send() {
    const that = this;
  }

}

const a = new Analyzer({});
console.log(a.name)
console.log(a.name = 123)
console.log(a.name)
console.log(a.version = 2.0)
console.log(a.version)
