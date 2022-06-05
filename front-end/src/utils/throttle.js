/**
 * 节流
 * @param {*} fn 将执行的函数
 * @param {*} time 节流规定的时间
 */
 export const throttle = (fn, time) => {
    let timer = null
    return (...args) => {
      // 若timer === false，则执行，并在指定时间后将timer重制
      if(!timer){
        fn.apply(this, args)
        timer = setTimeout(() => {
          timer = null
        }, time)
      }
    }
  }
  