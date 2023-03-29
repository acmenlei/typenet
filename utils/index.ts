// 睡眠
export function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
// 创建文本节点
export function createTextNode(text: string) {
  return document.createTextNode(text);;
}
// 换行
export function createLineFeed() {
  return document.createElement('br');;
}

export function getCurrentChildNodes(root: HTMLElement) {
  const nodes = root.childNodes, childNodes: ChildNode[] = [];
  for (const node of nodes) {
    if(node.nodeType === 3 || (node.nodeType == 1 && (node as HTMLElement).className != 'flicker')) {
      childNodes.push(node);
    }
  }
  return childNodes;
}