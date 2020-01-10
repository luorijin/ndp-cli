import {isVali} from './utils'
export default {
    setLs: function (key, value, days) {
        // 设置过期原则
        if(!isVali(key)) return;
        if (!value) {
          localStorage.removeItem(key)
        } else {
          let Days = days || 1; // 默认保留1天
          let exp = new Date();
          localStorage[key] = JSON.stringify({
            value,
            expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
          })
        }
      },
      getLs: function (name) {
        try {
          if(!localStorage[name]) return null;
          let o = JSON.parse(localStorage[name])
          if (!o || o.expires < Date.now()) {
            localStorage.removeItem(name);
            return null
          } else {
            return o.value
          }
        } catch (e) {
          console.error(e)
          return localStorage[name]
        } finally {
        }
      },
      clearLs(key){
        localStorage.removeItem(key);
      }
}