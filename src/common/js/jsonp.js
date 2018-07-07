//引入jsonp模块
import JSONP from 'jsonp'

//暴露一个用promise封装的jsonp方法
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    JSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  });
}
//格式化data数据为url
export function param(data) {
  let url = ''
  for (var i in data) {
    let value = data[i] !== undefined ? data[i] : ''
    url += '&' + i + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

