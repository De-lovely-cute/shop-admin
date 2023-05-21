// 通知封装
import { ElNotification, ElMessageBox } from "element-plus";

// loading
import nProgress from "nprogress";

// dangerouslyUseHTMLString 是否将 message 属性作为 HTML 片段处理
export function notifc(message, type = "success", dangerouslyUseHTMLString = true) {
  return ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  });
}

export function showModal(content = '是否要退出登录', type = 'warning', title = '') {
  return ElMessageBox.confirm(
    content, 
    title,
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type,
  })
}

// 显示全屏loading
export function showFullLoading(){
  nProgress.start()
}
// 隐藏全屏loading
export function hideFullLoading(){
 nProgress.done()
}

// 弹出输入框
export function showPrompt(tip,value = ""){
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
  })
}


// 将query对象转成url参数
export function queryParams(query){
  let q = []
  for (const key in query) {
      if(query[key]){
          q.push(`${key}=${encodeURIComponent(query[key])}`)
      }
  }
  let r = q.join("&")
  r = r ? ("?"+r) : ""
  return r
}

// 上移
export function useArrayMoveUp(arr,index){
  swapArray(arr,index,index - 1)
}

// 下移
export function useArrayMoveDown(arr,index){
  swapArray(arr,index,index + 1)
}

function swapArray(arr,index1,index2){
  arr[index1] = arr.splice(index2,1,arr[index1])[0]
  return arr
}

// sku排列算法
export function cartesianProductOf() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
      var ret = [];
      a.forEach(function (a) {
          b.forEach(function (b) {
              ret.push(a.concat([b]));
          });
      });
      return ret;
  }, [
      []
  ]);
}