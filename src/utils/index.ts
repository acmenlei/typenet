// 睡眠
export function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
// 创建文本节点
export function createTextNode(text: string) {
  return document.createTextNode(text)
}
// 创建元素节点并设置文本内容
export function createTextElement(text: string, style: string) {
  const node = document.createElement("span")
  node.textContent = text
  node.style.cssText = style
  return node
}
// 换行
export function createLineFeed() {
  return document.createElement("br")
}
