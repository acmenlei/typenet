import { type TypeEffectInstance } from "../index"
export const INSERT = "INSERT",
  REMOVE = "REMOVE",
  MOVE = "MOVE"

type TextNode = Text | ChildNode
type Speed = number | undefined

// 创建光标
export function createCursor(typeInstance: TypeEffectInstance) {
  const cursorNode = document.createElement("div")
  cursorNode.textContent = "|"
  cursorNode.className = "flicker"
  typeInstance.typeContainer?.appendChild(cursorNode)
}
// 插入操作
function insert(node: TextNode, container: HTMLElement) {
  const cursor = container.querySelector<HTMLElement>(".flicker")
  container.insertBefore(node, cursor)
}
// 移动光标
function move(node: TextNode, container: HTMLElement) {
  const cursor = container.querySelector(".flicker") as HTMLElement
  container.insertBefore(cursor, node)
}
// 创建打字容器
export function createTypeContainer(typeInstance: TypeEffectInstance) {
  const container = (typeInstance.typeContainer = document.createElement("div"))
  container.className = "type-container"
  container.style.cssText = typeInstance.options.style || ""
  typeInstance.root?.appendChild(typeInstance.typeContainer)
}
// 获取当前文本
export function getCurrentChildNodes(root: HTMLElement) {
  const nodes = Array.from(root.childNodes),
    childNodes: ChildNode[] = []
  for (const node of nodes) {
    if (
      node.nodeType === 3 ||
      (node.nodeType == 1 && (node as HTMLElement).className != "flicker")
    ) {
      childNodes.push(node)
    }
  }
  return childNodes
}

export function handingText(
  container: HTMLElement,
  node: TextNode,
  speed: Speed,
  type: string
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case INSERT:
          insert(node, container)
          break
        case REMOVE:
          container.removeChild(node)
          break
        case MOVE:
          move(node, container)
          break
        default:
          break
      }
      resolve(1)
    }, speed)
  })
}
