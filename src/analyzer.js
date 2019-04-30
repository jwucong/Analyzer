export const analyzer = (function () {
  'use strict'
  let queue = [];
  let instance = null;
  return new class Analyzer {
    constructor() {
      loadScript(() => {
        const props = Object.keys(this);
        console.log('props: ', props);
        console.log('queue: ', queue);
      });
      defineReadOnlyProperties(this, [
        {name: 'name', value: 'Analyzer'},
        {name: 'version', value: '1.0.0'}
      ]);
      return instance || (instance = this);
    }

    send(commad, data) {
      queue.push(Array.from(arguments));
    }

  }
})();

function loadScript(success, error) {
  const js = document.createElement('script');
  document.body.appendChild(js);
  js.async = true;
  js.type = 'text/javascript';
  js.onload = success;
  js.onerror = error;
  // js.src = 'https://cdn.bootcss.com/jquery/1.12.4/jquery.js';
  js.src = '../dist/send.js';
}

function defineReadOnlyProperties(obj, props) {
  const descriptor = props.reduce((acc, item) => {
    acc[item.name] = {
      value: item.value,
      writable: false,
      configurable: false,
      enumerable: true
    }
    return acc;
  }, {});
  Object.defineProperties(obj, descriptor);
}




