export function maskUrl (box: HTMLElement, innerBox: HTMLElement) {
  const innerBoxSize = innerboxRect()
  const boxSize = box.getBoundingClientRect()
  let url = `data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${boxSize.width}' height='${boxSize.height}'><mask id='mask'><rect x='0' y='0' width='${boxSize.width}' height='${boxSize.height}' fill='white'></rect>` //out box

  const x = (innerBoxSize.rect.x || innerBoxSize.rect.left) - (boxSize.x || boxSize.left)
  const y = (innerBoxSize.rect.y || innerBoxSize.rect.top) - (boxSize.y || boxSize.top)
  const width = innerBoxSize.rect.width
  const height = innerBoxSize.rect.height

  url += `<rect x='${x}' y='${y}' width='${width}' height='${height}' ${
      innerBoxSize.cornerRadius ? `rx='${innerBoxSize.cornerRadius}' ry='${innerBoxSize.cornerRadius}'` : ''
    } fill='black'></rect>` //inner circle
  url += `</mask><rect x='0' y='0' width='${boxSize.width}' height='${boxSize.height}' mask='url(%23mask)'></rect></svg>` //out box
  box.style.webkitMask = 'url("' + url + '")'
  box.style.webkitMaskSize = '100% 100%'

  function innerboxRect () { //size of innerBox
    innerBox.getBoundingClientRect()
    return { rect: innerBox.getBoundingClientRect(), cornerRadius: parseFloat(getComputedStyle(box).borderRadius.split(' ')[0]) }
  }
}
