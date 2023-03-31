import { createTextNode, sleep, createLineFeed, createTextElement } from "./utils";
import { handingText, createCursor, createTypeContainer, getCurrentChildNodes } from "./src/heplers";
import { INSERT, MOVE, REMOVE, } from "./src/heplers";
import "./src/css/animate.css"

export type TypeEffectInstance = TypeEffect;
export type TypeEffectOptions = { speed?: number; style?: string; }

export const defaultTypeEffectOptions = { speed: 100 };

export default class TypeEffect {
  root: HTMLElement | null; // 根标签
  typeContainer: HTMLElement; // 打字区域
  callbacks: Array<Function> = []; // 处理链式调用callbacks
  cursorPosition: number = 0; // 光标位置

  constructor(private el: string, public options: TypeEffectOptions = defaultTypeEffectOptions) {
    this.root = document.querySelector(el);
    if (!this.root) {
      throw new ReferenceError('please give the correct container.');
    }
  }

  type(text: string, options?: TypeEffectOptions) {
    this.callbacks.push(async () => {
      for (let i = 0, n = text.length; i < n; i++) {
        const textNode = options?.style ? createTextElement(text[i], options?.style) : createTextNode(text[i]);
        // 使用延迟时间
        const speed = options?.speed || this.options.speed;
        await handingText(this.typeContainer, textNode, speed, INSERT);
        this.cursorPosition++;
      }
    });
    return this;
  }

  remove(characters: number = 1, options?: TypeEffectOptions) {
    // 获取到当前的容器元素 执行删除
    this.callbacks.push(async () => {
      // 获取当前所有子节点
      const childNodes = getCurrentChildNodes(this.typeContainer);
      // 能删除的节点为光标左侧的节点
      let actualCharactersLength = Math.min(characters, this.cursorPosition);
      // 防止越界 取用户与实际字符数量的最小值
      while (actualCharactersLength--) {
        const lastChildNode = childNodes[--this.cursorPosition];
        const speed = options?.speed || this.options.speed;
        await handingText(this.typeContainer, lastChildNode, speed, REMOVE);
      }
    });
    return this;
  }

  move(characters: number = 1, options?: TypeEffectOptions) {
    // 获取到当前的容器元素 执行删除
    this.callbacks.push(async () => {
      const childNodes = getCurrentChildNodes(this.typeContainer), direction = characters > 0 ? 'forward' : 'backward';
      const dict = {
        // 还剩下多少个字符可以往前 (往前移动同时不能超过字符右端点)
        'forward': {
          actualCharactersLength: Math.min(characters, childNodes.length - this.cursorPosition),
          add: 1
        },
        // 还剩下多少个字符可以往后 (往后移动同时不能超过字符左端点)
        'backward': {
          actualCharactersLength: Math.min(-characters, this.cursorPosition),
          add: -1
        }
      }
      while (dict[direction].actualCharactersLength--) {
        const siblingNode = childNodes[this.cursorPosition += dict[direction].add];
        const speed = options?.speed || this.options.speed;
        await handingText(this.typeContainer, siblingNode, speed, MOVE)
      }
    });
    return this;
  }

  sleep(time: number) {
    this.callbacks.push(async () => await sleep(time))
    return this;
  }

  line() {
    this.callbacks.push(async () => {
      const br = createLineFeed();
      this.typeContainer.insertBefore(br, this.typeContainer.childNodes[this.cursorPosition++]);
    });
    return this;
  }

  async start() {
    createTypeContainer(this);
    createCursor(this);
    for (const cb of this.callbacks) await cb.apply(this); // 处理内容callbacks
  }
}

new TypeEffect('#app', { speed: 100, style: 'font-size: 20px; font-weight: bold;' })
  .type('醋醋明天不用上班了', { style: 'color: red;' })
  .sleep(100)
  .type('耶 又是美好的一甜，', { style: 'color: skyblue;' })
  .sleep(500)
  .remove(2)
  .type('天，')
  .sleep(300)
  .move(-5)
  .sleep(500)
  .type('吼吼吼吼吼吼吼吼吼吼!', { speed: 80 })
  .sleep(500)
  .line()
  .sleep(500)
  .type('请问你叫什么名字!', { speed: 150 })
  .line()
  .sleep(500)
  .type('我叫熊磊鑫!', { speed: 150 })
  .sleep(500)
  .remove(7)
  .start();