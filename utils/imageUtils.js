import EXIF from 'exif-js'

export const rotateImage = async (image) => {
  let orientation = await getImageOrientation(image)
  let tmpCanvas = document.createElement('canvas')
  if (image.width >= image.height) {
    let ratio = 750 / image.height
    tmpCanvas.height = 750
    tmpCanvas.width = image.width * ratio
  } else {
    let ratio = 750 / image.width
    tmpCanvas.width = 750
    tmpCanvas.height = image.height * ratio
  }
  if (orientation === 6 || orientation === 8) {
    //交换画布宽高
    tmpCanvas.width += tmpCanvas.height
    tmpCanvas.height = tmpCanvas.width - tmpCanvas.height
    tmpCanvas.width -= tmpCanvas.height
  }
  let ctx = tmpCanvas.getContext('2d')
  switch (orientation) {
    case 1:
      //无需旋转
      ctx.drawImage(image, 0, 0, tmpCanvas.width, tmpCanvas.height)
      return tmpCanvas.toDataURL('image/jpeg')
    case 3:
      //需要旋转180度
      ctx.translate(tmpCanvas.width , tmpCanvas.height)
      ctx.rotate(Math.PI)
      ctx.drawImage(image, 0, 0, tmpCanvas.width, tmpCanvas.height)
      return tmpCanvas.toDataURL('image/jpeg')
    case 6:
      //需要顺时针旋转90°
      ctx.translate(tmpCanvas.width , 0)
      ctx.rotate(90 * Math.PI / 180)
      ctx.drawImage(image, 0, 0, tmpCanvas.height, tmpCanvas.width)
      return tmpCanvas.toDataURL('image/jpeg')
    case 8:
      //需要顺时针270°
      ctx.translate(0 , tmpCanvas.height)
      ctx.rotate(270 * Math.PI / 180)
      ctx.drawImage(image, 0, 0, tmpCanvas.height, tmpCanvas.width)
      return tmpCanvas.toDataURL('image/jpeg')
    default:
      //无需旋转
      ctx.drawImage(image, 0, 0, tmpCanvas.width, tmpCanvas.height)
      return tmpCanvas.toDataURL('image/jpeg')
  }
}

/**
 * 从File获取dataURL并旋转
 * @param file
 * @returns {Promise<*>}
 */
export const rotateImageFile = async (file) => {
  let orientation = await getImageOrientation(file)
  let dataURL = await readFileAsDataUrl(file)
  let canvas = document.createElement('canvas')
  let image = await createImageWithDataURL(dataURL)
  let ctx = canvas.getContext('2d')
  if (image.width >= image.height) {
    let ratio = 750 / image.height
    canvas.height = 750
    canvas.width = image.width * ratio
  } else {
    let ratio = 750 / image.width
    canvas.width = 750
    canvas.height = image.height * ratio
  }
  if (orientation === 6 || orientation === 8) {
    //交换画布宽高
    canvas.width += canvas.height
    canvas.height = canvas.width - canvas.height
    canvas.width -= canvas.height
  }
  switch (orientation) {
    case 1:
      //无需旋转
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/jpeg')
    case 3:
      //需要旋转180度
      ctx.translate(canvas.width , canvas.height)
      ctx.rotate(Math.PI)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/jpeg')
    case 6:
      //需要顺时针旋转90°
      ctx.translate(canvas.width , 0)
      ctx.rotate(90 * Math.PI / 180)
      ctx.drawImage(image, 0, 0, canvas.height, canvas.width)
      return canvas.toDataURL('image/jpeg')
    case 8:
      //需要顺时针270°
      ctx.translate(0 , canvas.height)
      ctx.rotate(270 * Math.PI / 180)
      ctx.drawImage(image, 0, 0, canvas.height, canvas.width)
      return canvas.toDataURL('image/jpeg')
    default:
      //无需旋转
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/jpeg')
  }
}

/**
 * 从File读取dataURL
 * @param file
 * @returns {Promise<any>}
 */
export const readFileAsDataUrl = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = e => {
      resolve(e.target.result)
    }
    reader.onerror = err => {
      reject(err)
    }
  })
}

/**
 * 根据dataURL创建Image
 * @param dataURL
 * @returns {Promise<*>}
 */
export const createImageWithDataURL = (dataURL) => {
  const image = new Image()
  image.setAttribute('crossOrigin','Anonymous')
  image.src = dataURL.src
  return new Promise((resolve => {
    image.onload = () => resolve(image)
  }))
}

/**
 * 根据dataURL创建Image, 不设置CORS
 * @param dataURL
 * @returns {Promise<*>}
 */
export const createImageWithDataURLWithoutCORS = (dataURL) => {
  const image = new Image()
  image.src = dataURL
  return new Promise((resolve => {
    image.onload = () => resolve(image)
  }))
}

/**
 * 获取图片方向
 * @param image
 * @returns {Promise<any>}
 */
export const getImageOrientation = (image) => {
  return new Promise(resolve => {
    EXIF.getData(image, () => {
      let orientation = EXIF.getTag(image, 'Orientation') ? EXIF.getTag(image, 'Orientation') : 1
      resolve(orientation)
    })
  })
}

/**
 * 将base64字符转换为Blob对象
 * @param b64Data
 * @param contentType
 * @param sliceSize
 * @returns {Blob}
 */
export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, {type: contentType})
}

/**
 * 将DataUrl转为Blob对象
 * @param dataURL
 * @returns {Blob}
 */
export const dataURLtoBlob = (dataURL) => {
  let chunks = dataURL.split(';')
  return b64toBlob(chunks[1].split(',')[1], chunks[0].split(':')[1])
}