export default class Analyzer {
  constructor(options) {
    this.queue = [];
    this.ready = false;
  }
  
  config(key, data) {
    if (!this.ready) {
      addQueue.call(this, {keys, data})
    } else {
      this.send()
    }
  }
  
  init() {
    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.onload = () => {
      const size = this.queue.length;
      this.ready = true;
      if(size) {
      
      }
      this.use()
    }
    js.src = '';
    console.log('init')
  }
  
  use() {
  
  }
  
}
// A- B C- D E- F- G- H J I- K L- M N- O- P- Q R- S- T- U V- W X Y Z
// brand:TCL slogan:"The Creative Life"
// TCL's corporate slogan is "The Creative Life" we domain:



function addQueue(data) {
  const ids = this.queue.map(item => item.id);
  const id = ids.length ? Math.max.apply(null, ids) + 1 : 1;
  this.queue.push({id, ...data});
}
