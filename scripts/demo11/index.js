import { createTextElement, createElement } from './createElement';
//alternate这个属性是全体fiber通用的 保存了fiber更新前的fiber tree
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

  // const isProperty = (key) => key !== 'children';
  // Object.keys(fiber.props)
  //   .filter(isProperty)
  //   .forEach((name) => {
  //     dom[name] = fiber.props[name];
  //   });
  updateDom(dom, {}, fiber.props);
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
//准备删除的节点
let deletions = null;
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
const isProperty = (key) => key !== 'children';
//判断是否是新属性
const isNew = (prev, next) => (key) => prev[key] !== next[key];
//仅仅是更新dom
// 是否是旧属性
const isGone = (prev, next) => (key) => !(key in next);
const isEvent = (key) => key.startsWith('on');
function updateDom(dom, prevProps, nextProps) {
  // 删除旧属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = '';
    });

  // 更新新属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
  //删除旧的或者有变化的事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 注册新事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}
function commitWork(fiber) {
  //effectTag判断节点是否不在需要了 或者是否是删除的节点
  // console.log('提交阶段', fiber);
  if (!fiber) {
    return;
  }
  let domParentFiber = fiber.parent;
  //去fiver.parent 没有dom节点 则继续寻找fiber.parent.parent.dom
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  //const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag == 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent);
  }
  // domParent.appendChild(fiber.dom);
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
  deletions = [];
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

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const children = fiber.props.children;
  reconcileChildren(fiber, children);
}

//承载了下一个工作单元nextUnitOfWork=fiber
function performUnitOfWork(fiber) {
  // 是否是函数类型组件
  const isFunctionComponent =
    fiber && fiber.type && fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
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

function reconcileChildren(wipFiber, elements) {
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
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type == oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
/** @jsx DReact.createElement */
function App(props) {
  return <h1>Hi {props.name}</h1>;
}
const element = <App name="🏮京程一灯🏮" />;
const container = document.getElementById('root');
DReact.render(element, container);

// function App(props) {
//   return DReact.createElement(
//     "h1",
//     null,
//     "Hi ",
//     props.name
//   )
// }
// const element = DReact.createElement(App, {
//   name: "foo",
// })
