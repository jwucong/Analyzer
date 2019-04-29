import {hasOwnProperty} from "./util";

export default class MM {
  constructor() {
    this.name = 'tesla';
    this.version = '1.0.0'
  }

  install(instace) {
    const props = Object.keys(this)
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
    const instacePro = Object.getPrototypeOf(instace)
    console.log('props: ', props)
    console.log('methods: ', methods)
    props.forEach(item => {
      instace[item] = this[item]
    })
    methods.forEach(item => {
      if(['constructor', 'install'].indexOf(item) > -1) {
        return
      }
      instacePro[item] = this[item]
    })
    console.log('this: ', this)
    console.log('instace: ', instace)
  }
  
  config(key, data) {
    console.group('config')
    console.log('key: ', key)
    console.log('data: ', data)
    console.groupEnd();
  }

  send(key, data) {
    console.group('send')
    console.log('key: ', key)
    console.log('data: ', data)
    console.groupEnd();
  }

}

