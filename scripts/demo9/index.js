import { createTextElement, createElement } from './createElement';
window.DReact = {
  createElement,
  render,
};
//metamask
function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  const isProperty = (key) => key !== 'children';
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  // dom节点他一旦开始渲染就不会停止⏹下来了
  // element.props.children.forEach((child) => render(child, dom));
  return dom;
}
//下一个工作单元
let nextUnitOfWork = null;
//跟踪当前准备渲染的节点
let wipRoot = null;
//当前渲染书 最后准备提交的渲染树
let currentRoot = null;
function commitRoot() {
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
function commitWork(fiber) {
  // console.log('提交阶段', fiber);
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
function render(element, container) {
  //第一个的工作单元
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  //下一个fiber节点(工作单元)的根节点
  nextUnitOfWork = wipRoot;
}
//他已经就位置了
function workLoop(deadline) {
  //是否应该停止循环
  let shouldYield = false;
  //如果存在下一个工作单元 且 没有更高优先级的其他工作 执行循环
  //如果存在上述的情况 直接打断渲染
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    //如果截止时间到了 停止工作循环 更高优先级的任务来了
    console.log('🐻🐻🐻🐻 deadline ', deadline.timeRemaining());
    console.log('🌲🌲🌲🌲', nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
//告知浏览器的 空闲时间应该执行workLoop
requestIdleCallback(workLoop);
//承载了下一个工作单元nextUnitOfWork=fiber
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function reconcileChildren(fiber, elements) {
  //如果fiber没有dom节点 创建一个dom节点

  /**
   * 由于我们的渲染是可以被中断的 不想去展示那些被渲染了一半的UI
   */
  // if (fiber.parent) {
  //   //只要是一个dom元素就能追加比如
  //   // document.createElement("div").appendChild
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }
  //处理children 子节点
  // const elements = fiber.props.children;
  let index = 0;
  let oldFiber = wipRoot.alternate && wipRoot.alternate.child;
  let prevSibling = null;
  while (index < elements.length) {
    // while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };
    // children第一个参数为依据
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    //js模拟指针移动
    prevSibling = newFiber;
    index++;
  }
}
/** @jsx DReact.createElement */
const element = (
  <div id="foo">
    <a href="http://www.baidu.com">bar</a>
    <input type="text" value="测试" />
    <p>
      <b>我是加粗文本</b>
    </p>
  </div>
);

const container = document.getElementById('root');
DReact.render(element, container);
