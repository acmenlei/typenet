import { sleep } from "./utils";
import "./src/css/animate.css"
// import back from "./src/api/back"
// import start from "./src/api/start"
export type TypeEffectOptions = { speed: number; }
export type TypeEffectInstance = TypeEffect;

const defaultTypeEffectOptions = { speed: 100 }, INSERT = 'INSERT', REMOVE = 'REMOVE';

export default class TypeEffect {
  root: HTMLElement | null;
  typeContainer: HTMLElement;
  callbacks: Array<Function> = [];

  constructor(private el: string, private options: TypeEffectOptions = defaultTypeEffectOptions) {
    this.root = document.querySelector(el);
    if (!this.root) {
      throw ReferenceError('please give the correct container.');
    }
    this.typeContainer = document.createElement('div');
    this.typeContainer.className = 'type-container';
    this.root.appendChild(this.typeContainer);
  }

  type(text: string, options?: TypeEffectOptions) {
    this.callbacks.push(async () => {
      for (let i = 0, n = text.length; i < n; i++) {
        const textNode = document.createTextNode(text[i]);
        // 使用延迟时间
        const speed = options?.speed || this.options.speed;
        await handingText(this.typeContainer, textNode, speed, INSERT);
      }
    });
    return this;
  }

  remove(characters: number = 1, options?: TypeEffectOptions) {
    // 获取到当前的容器元素 执行删除
    this.callbacks.push(async () => {
      let actualCharactersLength = Math.min(characters, this.typeContainer.childNodes.length);
      // 防止越界 取用户与实际字符数量的最小值
      while (actualCharactersLength--) {
        const lastChildNode = this.typeContainer.childNodes[this.typeContainer.childNodes.length - 1];
        const speed = options?.speed || this.options.speed;
        await handingText(this.typeContainer, lastChildNode, speed, REMOVE);
      }
    })
    return this;
  }

  sleep(time: number) {
    this.callbacks.push(async () => await sleep(time))
    return this;
  }

  async start() {
    createCursor.apply(this);
    // 处理内容callbacks
    for (const cb of this.callbacks) {
      await cb.apply(this);
    }
  }
}
// 创建光标
function createCursor() {
  const cursorNode = document.createElement('div');
  cursorNode.textContent = '|';
  cursorNode.className = 'flicker';
  this.root?.appendChild(cursorNode);
}

function handingText(container: HTMLElement, node: Text | ChildNode, speed: number, type: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case INSERT: container.appendChild(node); break;
        case REMOVE: container.removeChild(node); break;
        default: break;
      }
      resolve(1);
    }, speed);
  })
}

// test
new TypeEffect('#app', { speed: 500 })
  .sleep(3000)
  .type('醋醋明天不用上班了')
  .sleep(500)
  .type('耶 又是美好的一甜', { speed: 200 })
  .sleep(500)
  .remove(1)
  .type('天，')
  .sleep(500)
  .type('吼吼吼吼吼吼吼吼吼吼!', { speed: 50 })
  .start();