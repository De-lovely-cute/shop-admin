// 通知封装
import { ElNotification, ElMessageBox } from "element-plus";

// loading
import nProgress from "nprogress";

// dangerouslyUseHTMLString 是否将 message 属性作为 HTML 片段处理
export function notifc(message, type, dangerouslyUseHTMLString = false) {
  return ElNotification({
    message: message,
    type: type,
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