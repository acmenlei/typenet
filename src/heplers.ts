export const INSERT = 'INSERT', REMOVE = 'REMOVE', MOVE = 'MOVE';

export function handingText(container: HTMLElement, node: Text | ChildNode, speed: number, type: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case INSERT: insert(node, container); break;
        case REMOVE: container.removeChild(node); break;
        case MOVE: move(node, container); break;
        default: break;
      }
      resolve(1);
    }, speed);
  })
}

// 创建光标
export function createCursor() {
  const cursorNode = document.createElement('div');
  cursorNode.textContent = '|';
  cursorNode.className = 'flicker';
  this.typeContainer?.appendChild(cursorNode);
}
// 插入操作
function insert(node: Text | ChildNode, container: HTMLElement) {
  const cursor = container.querySelector<HTMLElement>('.flicker');
  container.insertBefore(node, cursor);
}
// 移动光标
function move(node: Text | ChildNode, container: HTMLElement) {
  const cursor = container.querySelector('.flicker') as HTMLElement;
  container.insertBefore(cursor, node);
}
