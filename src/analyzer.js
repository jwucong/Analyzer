export const Analyzer = (function () {
  const queue = [];
  let instance = null;
  return class {
    constructor() {
      this.name = 'tesla';
      this.version = '1.0.0';
      loadScript(() => {
        const props = Object.keys(this)
        console.log('props: ', props)
      })
      return instance || (instance = this);
    }

    send(commad, data) {
      queue.push(arguments);
      console.log('send: ', arguments)
    }
  }
})();


function loadScript(success, error) {
  const js = document.createElement('script');
  document.body.appendChild(js);
  js.type = 'text/javascript';
  js.onload = success;
  js.onerror = error;
  js.src = 'https://cdn.bootcss.com/jquery/1.12.4/jquery.js';
}




