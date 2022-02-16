export default function getUA() {
  let ua = navigator.userAgent.toLowerCase()
  let uaObj = {}

  uaObj.isFastSouGou = ua.match(/metasr/) && ua.match(/chrome/)
  uaObj.isMac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC') || (navigator.platform == 'Macintosh') || (navigator.platform == 'MacIntel')
  uaObj.isWin = (navigator.platform == 'Win32') || (navigator.platform == 'Windows')
  uaObj.isMobile = /iPhone|iPad|iPod|Android/i.test(ua)
  uaObj.isAndroid = /Android/i.test(ua)
  uaObj.isIOS = /iPhone|iPad|iPod/i.test(ua)
  uaObj.isWeiXin = /micromessenger/.test(ua)
  uaObj.isDingTalk = /dingtalk/.test(ua)
  uaObj.isQQ = /qq/.test(ua)
  uaObj.isTodayCamera = /todaycamera/.test(ua)

  let saEnv = 'others'
  if (uaObj.isWeiXin) {
    saEnv = 'wechat'
  } else if (uaObj.isQQ) {
    saEnv = 'QQ'
  } else if (uaObj.isDingTalk) {
    saEnv = 'DingTalk'
  }

  uaObj.saEnv = saEnv
  
  if (uaObj.isWeiXin) {
    uaObj.weiXinVersion = ua.split(' ').find(item => item.startsWith('micromessenger')).split('/')[1].split('(')[0]
  }

  return uaObj
}
