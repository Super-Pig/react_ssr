/* eslint-disable */
export const drawRoundedRect = (ctx, options) => {
  const {
    x,
    y,
    width,
    height,
    r,
    corners,
    fill,
    stroke
  } = options
  const allCorners = corners === undefined || corners.length === 0 ||
    corners.length === 4 &&
    corners.includes('topLeft') &&
    corners.includes('topRight') &&
    corners.includes('bottomLeft') &&
    corners.includes('bottomRight')
  ctx.save()
  ctx.beginPath() // draw top and top right corner
  if (allCorners || corners.includes('topLeft')) {
    ctx.moveTo(x + r, y)
  } else {
    ctx.moveTo(x, y)
  }
  if (allCorners || corners.includes('topRight')) {
    ctx.arcTo(x + width, y, x + width, y + r, r)  // draw right side and bottom right corner
  } else {
    ctx.lineTo(x + width, y)
  }
  if (allCorners || corners.includes('bottomRight')) {
    ctx.arcTo(x + width, y + height, x + width - r, y + height, r)  // draw bottom and bottom left corner
  } else {
    ctx.lineTo(x + width, y + height)
  }
  if (allCorners || corners.includes('bottomLeft')) {
    ctx.arcTo(x, y + height, x, y + height - r, r)  // draw left and top left corner
  } else {
    ctx.lineTo(x, y + height)
  }
  if (allCorners || corners.includes('topLeft')) {
    ctx.arcTo(x, y, x + r, y, r)
  } else {
    ctx.lineTo(x, y)
  }
  if (fill) {
    ctx.fill()
  }
  if (stroke) {
    ctx.stroke()
  }
  ctx.restore()
}

export const warpTextHeight = (ctx, text, maxWidth, lineHeight) => {
  let line = '', lines = 1
  for (let i = 0; i < text.length; i++) {
    let metrics = ctx.measureText(line + text[i])
    if (metrics.width > maxWidth) {
      lines++
      line = text[i]
    } else {
      line += text[i]
    }
  }
  return lines * lineHeight
}

export const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  ctx.textBaseline = 'middle'
  let line = '', lines = 1
  for (let i = 0; i < text.length; i++) {
    let metrics = ctx.measureText(line + text[i])
    if (metrics.width > maxWidth) {
      ctx.fillText(line, x, y + lines * lineHeight - lineHeight / 2)
      lines++
      line = text[i]
    } else {
      line += text[i]
    }
  }
  if (!!line.length) {
    ctx.fillText(line, x, y + lines * lineHeight - lineHeight / 2)
  }
}