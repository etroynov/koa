export function only(obj: object, keys){
  obj = obj || {};
  if ('string' == typeof keys) keys = keys.split(/ +/);

  return keys.reduce(function(ret, key){
    if (null == obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
};
