function is(value, type) {
  const c = Object.prototype.toString.call(value).slice(8, -1);
  return typeof type === 'string' ? type.toLocaleLowerCase() === c.toLocaleLowerCase() : c;
}

function hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

function getUrlQuery(url = '') {
  const reg = /[?&]([^=&#]+)(?:=([^&#]*))?/ig;
  const obj = {};
  let p = reg.exec(url);
  while (p) {
    const key = decodeURIComponent(p[1]);
    const val = p[2] && decodeURIComponent(p[2]);
    obj[key] = obj.hasOwnProperty(key) ? [].concat(obj[key], val) : val;
    p = reg.exec(url);
  }
  return obj;
}

function parseUrl(url = '', parseQueryStr = true) {
  const isLink = typeof url === 'string' && url.trim().length > 0;
  const link = isLink ? decodeURIComponent(url.trim()) : null;
  const reg = /^(?:([\w.+-]+):\/\/)?(?:([^\s:]+):([^@]*)@)?([^\s:\/]+)(?::(\d+))?(\/[^\s?#]*)?(\?[^\s#]*)?(#\S*$)?/i;
  const p = reg.exec(link) || [];
  const val = v => isLink && v ? v : null;
  const host = val(p[4])
  const qstr = val(p[7])
  return {
    href: val(p[0]),
    protocol: val(p[1]),
    username: val(p[2]),
    password: val(p[3]),
    hostname: host,
    port: Number(val(p[5])) || (p[1] === 'http' ? 80 : p[1] === 'https' ? 443 : null),
    path: val(p[6]) || host && '/',
    query: qstr && parseQueryStr ? getUrlQuery(qstr) : qstr,
    hash: val(p[8])
  }
}

function random(min = 0, max = 100) {
  return Math.round(Math.random() * (max - min) + min);
}

function toBytes(value, base = 1024) {
  const val = parseFloat(value);
  if (Number.isNaN(val)) {
    return NaN;
  }
  const unitReg = /([a-zA-Z]*)\s*$/i;
  const match = unitReg.exec(value);
  if (!match) {
    return NaN;
  }
  const unit = match[1] || 'B';
  const units = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
  const index = units.findIndex((item, i) => {
    const str = `^${item}${i === 0 ? '(?:yte)' : 'b'}?$`;
    const reg = new RegExp(str, 'i');
    return reg.test(unit);
  });
  if (index < 0) {
    return NaN;
  }
  return Math.ceil(val * Math.pow(base, index));
}

function byteFormat(bytes, digits = 2, base = 1024) {
  if (Number.isNaN(parseFloat(bytes))) {
    return 0;
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB']
  const MAX_SIZE = Math.pow(base, units.length - 1);
  if (bytes < 0 || bytes > MAX_SIZE) {
    throw new Error(bytes < 0 ? 'bytes can not be negative.' : 'The number of bytes is too large.');
  }
  const index = Math.floor(Math.log(bytes) / Math.log(base));
  const size = (bytes / Math.pow(base, index)).toFixed(digits);
  return size + units[index];
}

//
// export {
//   is,
//   hasOwnProperty
// };
