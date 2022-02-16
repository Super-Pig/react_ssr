/* eslint-disable */
import getUA from './getUA'

export const isInApp = () => {
  return !!(getUA().isIOS && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.XCamera || getUA().isAndroid && getUA().isTodayCamera)
}

export const fetchEnvAttrs = () => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_GET_ENV_ATTRS",
    content: {
      callback: "XCameraGetEnvAttrs"
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const saveImage = (dataURL) => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_SAVE_IMAGE",
    content: {
      image: dataURL,
      callback: ""
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const setClipboard = (text) => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_SET_CLIPBOARD",
    content: {
      text,
      callback: "XCameraSetClipboardSuccess"
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const encodeParams = (params) => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_ENCODE_PARAMS",
    content: {
      params,
      callback: "getXCameraEncodeParams"
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const decodeParams = (data) => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_DECODE_DATA",
    content: {
      data,
      callback: "getXCameraDecodeData"
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const share = (data) => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_SHARE",
    content: {
      ...data,
      callback: "XCameraShareTarget"
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const launchMP = (data) => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_LAUNCH_MP",
    content: {
      ...data,
      callback: ""
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const forceUpdate = () => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_FORCE_UPDATE_APP",
    content: {
      callback: ""
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const logout = () => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_LOGOUT",
    content: {
      callback: "XCameraLogoutSuccess"
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const closeWebView = () => {
  const message = {
    type: "JS_CALL_NATIVE_FUNC",
    subtype: "H5_CLOSE_WEBVIEW",
    content: {
      callback: ""
    }
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const toView = ({ subtype, content }) => {
  const message = {
    type: "TOVIEW_LOCAL_PAGE",
    subtype,
    content
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const toOutView = ({ subtype, content }) => {
  const message = {
    type: "TOVIEW_H5_OUT_APP",
    subtype,
    content
  }
  if (getUA().isIOS) {
    window.webkit.messageHandlers.XCamera.postMessage(message)
  } else {
    window.android.callAndroid(JSON.stringify(message))
  }
}

export const appVersion = () => {
  //iOS:TodayCamera/2.9.104 Android:TodayCamera/v2.9.104
  return navigator.userAgent.split(' ').pop().replace('TodayCamera/', '').replace('v', '')
}

export const encodeHttpParams = (params) => {
  return new Promise((resolve) => {
    if (__IS_ENV_PRODUCTION__) {
      window['getXCameraEncodeParams'] = function (encodeString) {
        resolve({
          params: encodeString
        })
      }
      encodeParams(params)
    } else {
      resolve(params)
    }
  })
}

export const decodeHttpResult = (result) => {
  return new Promise((resolve) => {
    if (__IS_ENV_PRODUCTION__) {
      window['getXCameraDecodeData'] = function (decodeString) {
        resolve(JSON.parse(decodeString))
      }
      decodeParams(result.result)
    } else {
      resolve(result)
    }
  })
}