// 通知封装

import { ElNotification } from "element-plus";

// dangerouslyUseHTMLString 是否将 message 属性作为 HTML 片段处理
export function notifc(message, type, dangerouslyUseHTMLString = false){
    return ElNotification({
        message: message,
        type: type,
        dangerouslyUseHTMLString,
        duration: 3000,
      });
}