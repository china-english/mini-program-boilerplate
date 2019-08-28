/* global wx */

// 获取和系统相关的信息
const SYSTEM_INFO = wx.getSystemInfoSync()

export default {
  ...SYSTEM_INFO
}
