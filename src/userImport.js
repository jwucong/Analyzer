export default class Analyzer {
  constructor(options) {
    this.queue = [];
    const src = 'https://cdn.bootcss.com/jquery/1.12.4/jquery.js'
    loadScript.call(this, src).then(function() {

    })
  }

  config(key, data) {
    addQueue.call(this, {key, data})
    console.log('exec config: ', this.queue)
  }

  send(key, data) {
    addQueue.call(this, {key, data})
    console.log('exec send: ', this.queue)
  }

  use(instance) {
    instance.install(this)
  }

}

function addQueue(data) {
  const ids = this.queue.map(item => item.id);
  const id = ids.length ? Math.max.apply(null, ids) + 1 : 1;
  this.queue.push({id, ...data});
}

function loadScript(src) {
  // 'https://cdn.bootcss.com/jquery/1.12.4/jquery.js'
  const js = document.createElement('script');
  const promise = new Promise((resolve, reject) => {
    js.onload = () => resolve();
    js.onerror = () => reject();
  })
  document.body.appendChild(js);
  js.type = 'text/javascript';
  js.src = src;
  return promise;
}
// A- B C- D E- F- G- H J I- K L- M N- O- P- Q R- S- T- U V- W X Y Z
// brand:TCL slogan:"The Creative Life"
// TCL's corporate slogan is "The Creative Life" we domain:




