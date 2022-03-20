function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        //考虑children特殊的类型 TEXT_ELEMENT
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}
window.DReact = {
  createElement,
};

const element = DReact.createElement(
  'div',
  { id: 'foo' },
  DReact.createElement('a', null, 'bar'),
  DReact.createElement('b')
);

console.log('element: ', element);

// {
//   "type": "div",
//   "props": { "children": [] }
// }

// {
//   "type": "div",
//   "props": { "children": [a] }
// }

// {
//   "type": "div",
//   "props": { "children": [a, b] }
// }

//慢对象 V8
// [[Prototype]] = Object.create(null);
