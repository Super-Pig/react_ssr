/* eslint-disable no-console */

/**
 * 
 * @param value 
 * parseInt(Math.random() * 100) for dev
 * iOS11 存在兼容性问题
 */
export const execCommandCopy = (value = parseInt(Math.random() * 100)) => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', value)
  input.setAttribute('readonly', 'readonly')
  input.setSelectionRange(0, 9999)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    console.log('复制成功')
  }
  document.body.removeChild(input)
}

export const copyText = (text) => {
  // 数字没有 .length 不能执行selectText 需要转化成字符串
  const textString = text.toString()
  let input = document.querySelector('#copy-input')
  if (!input) {
    input = document.createElement('input')
    input.id = 'copy-input'
    input.readOnly = 'readOnly'        // 防止ios聚焦触发键盘事件
    input.style.position = 'absolute'
    input.style.left = '-1000px'
    input.style.zIndex = '-1000'
    document.body.appendChild(input)
  }

  input.value = textString
  // ios必须先选中文字且不支持 input.select()
  selectText(input, 0, textString.length)

  // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
  // 选择文本。createTextRange(setSelectionRange)是input方法
  function selectText(textBox, startIndex, stopIndex) {
    if (textBox.createTextRange) {//ie
      const range = textBox.createTextRange()
      range.collapse(true)
      range.moveStart('character', startIndex)//起始光标
      range.moveEnd('character', stopIndex - startIndex)//结束光标
      range.select()//不兼容苹果
    } else {//firefox/chrome
      textBox.setSelectionRange(startIndex, stopIndex)
      textBox.focus()
    }
  }

  if (document.execCommand('copy')) {
    document.execCommand('copy')
  }
  input.blur()
  return document.execCommand('copy')
}

function utf16to8(str) {
  var out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}
function base64_encode(str) {
  //下面是64个基本的编码
  var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var out, i, len
  var c1, c2, c3
  len = str.length
  i = 0
  out = ''
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt((c1 & 0x3) << 4)
      out += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
      out += base64EncodeChars.charAt((c2 & 0xF) << 2)
      out += '='
      break
    }
    c3 = str.charCodeAt(i++)
    out += base64EncodeChars.charAt(c1 >> 2)
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6))
    out += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return out
}
export const baseEncode = (str) => {
  return base64_encode(utf16to8(str))
}

export const formatMoney = (money, floatSize = 1) => {
  if (floatSize === 1) {
    return Math.round(money / 10) / 10
  } else {
    return money / 100
  }
}

export const loadScript = (src, cb) => {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  cb = cb || function () {}

  script.type = 'text/javascript'
  script.src = src

  if (!('onload' in script)) {
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      cb(script)
    }
  }

  script.onload = function () {
    this.onload = null
    cb(script)
  }

  head.appendChild(script)
}