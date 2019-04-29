function is(value, type) {
  const c = Object.prototype.toString.call(value).slice(8, -1);
  return typeof type === 'string' ? type.toLocaleLowerCase() === c.toLocaleLowerCase() : c;
}

function hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

function getUrlQuery(url = '') {
  const queryReg = /[?&]([^=&#]+)(?:=([^&#]*))?/ig;
  const NumberReg = /^\d+(\.\d+)?$/;
  const result = {};
  let match = queryReg.exec(url);
  while (match) {
    const key = decodeURIComponent(match[1]);
    const val = decodeURIComponent(match[2]);
    result[key] = NumberReg.test(val) ? parseFloat(val) : val;
    match = queryReg.exec(url);
  }
  return result;
}

function parseUrl(url = '') {
  const link = decodeURIComponent(url);
  const reg = /^(?:([\w.+-]+):\/\/)?(?:([^\s:]+):([^@]*)@)?([^\s:/]+)(?::(\d+))?(\/[^\s?#]*)?(\?[^\s#]*)?(#\S*$)?/i;
  const result = reg.exec(link) || [];
  return {
    href: result[0] || null,
    protocol: result[1] || null,
    username: result[2] || null,
    password: result[3] || null,
    hostname: result[4] || null,
    port: link ? parseInt(result[5], 10) || 80 : null,
    path: link ? result[6] || '/' : null,
    query: getUrlQuery(result[7] || ''),
    hash: result[8] || null
  };
}

function random(min = 0, max = 100) {
  return Math.round(Math.random() * (max - min) + min);
}

function toBytes(value, base = 1024) {
  const val = parseFloat(value);
  if (Number.isNaN(val)) {
    return NaN;
  }
  const unitReg = /([a-zA-Z]*)\s+$/i;
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

function formatBytes(bytes, digits = 2, base = 1024) {
  if (Number.isNaN(parseFloat(bytes))) {
    return 0;
  }
  const MAX_SIZE = Math.pow(base, 11);
  if (bytes < 0 || bytes > MAX_SIZE) {
    throw new Error(bytes < 0 ? 'Bytes can not be negative.' : 'The number of bytes is too large.');
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB']
  const n = Math.floor(Math.log(bytes) / Math.log(base));
  const size = (bytes / Math.pow(base, n)).toFixed(digits);
  return size + units[n];
}


export {
  is,
  hasOwnProperty
};
