
if(typeof analyzer === 'object' && analyzer instanceof Analyzer) {
  Object.getPrototypeOf(analyzer).send = send;
}

function send(command, data) {
  switch (command) {
    case 'config':
      config(data);
      break;
    default:
      push(command, data);
  }
  console.log('send: ', command, data)
}

function config(data) {

}

function push(command, data) {

}

function getPV() {

}
