/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createElement.js":
/*!******************************!*\
  !*** ./src/createElement.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"createTextElement\": () => (/* binding */ createTextElement)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction createTextElement(text) {\n  return {\n    type: 'TEXT_ELEMENT',\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n}\n\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  return {\n    type: type,\n    props: _objectSpread(_objectSpread({}, props), {}, {\n      children: children.map(function (child) {\n        return _typeof(child) === 'object' ? child : createTextElement(child);\n      })\n    })\n  };\n}\n\n\n\n//# sourceURL=webpack://yd-react/./src/createElement.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./src/createElement.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n //alternate?????????????????????fiber????????? ?????????fiber????????????fiber tree\n\nwindow.DReact = {\n  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  render: render,\n  useState: useState\n}; //metamask\n\nfunction createDom(fiber) {\n  var dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type); // const isProperty = (key) => key !== 'children';\n  // Object.keys(fiber.props)\n  //   .filter(isProperty)\n  //   .forEach((name) => {\n  //     dom[name] = fiber.props[name];\n  //   });\n\n  updateDom(dom, {}, fiber.props); // dom??????????????????????????????????????????????????????\n  // element.props.children.forEach((child) => render(child, dom));\n\n  return dom;\n} //?????????????????????\n\n\nvar nextUnitOfWork = null; //?????????????????????????????????\n\nvar wipRoot = null; //??????????????? ??????????????????????????????\n\nvar currentRoot = null; //?????????????????????\n\nvar deletions = null;\n\nfunction commitRoot() {\n  deletions.forEach(commitWork);\n  commitWork(wipRoot.child);\n  currentRoot = wipRoot;\n  wipRoot = null;\n}\n\nvar isProperty = function isProperty(key) {\n  return key !== 'children';\n}; //????????????????????????\n\n\nvar isNew = function isNew(prev, next) {\n  return function (key) {\n    return prev[key] !== next[key];\n  };\n}; //???????????????dom\n// ??????????????????\n\n\nvar isGone = function isGone(prev, next) {\n  return function (key) {\n    return !(key in next);\n  };\n};\n\nvar isEvent = function isEvent(key) {\n  return key.startsWith('on');\n};\n\nfunction updateDom(dom, prevProps, nextProps) {\n  // ???????????????\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(function (name) {\n    dom[name] = '';\n  }); // ???????????????\n\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(function (name) {\n    dom[name] = nextProps[name];\n  }); //????????????????????????????????????\n\n  Object.keys(prevProps).filter(isEvent).filter(function (key) {\n    return !(key in nextProps) || isNew(prevProps, nextProps)(key);\n  }).forEach(function (name) {\n    var eventType = name.toLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  }); // ???????????????\n\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(function (name) {\n    var eventType = name.toLowerCase().substring(2);\n    dom.addEventListener(eventType, nextProps[name]);\n  });\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom);\n  } else {\n    commitDeletion(fiber.child, domParent);\n  }\n}\n\nfunction commitWork(fiber) {\n  //effectTag????????????????????????????????? ??????????????????????????????\n  // console.log('????????????', fiber);\n  if (!fiber) {\n    return;\n  }\n\n  var domParentFiber = fiber.parent; //???fiver.parent ??????dom?????? ???????????????fiber.parent.parent.dom\n\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent;\n  }\n\n  var domParent = domParentFiber.dom; //const domParent = fiber.parent.dom;\n\n  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {\n    domParent.appendChild(fiber.dom);\n  } else if (fiber.effectTag == 'UPDATE' && fiber.dom != null) {\n    updateDom(fiber.dom, fiber.alternate.props, fiber.props);\n  } else if (fiber.effectTag === 'DELETION') {\n    commitDeletion(fiber, domParent);\n  } // domParent.appendChild(fiber.dom);\n\n\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\nfunction render(element, container) {\n  //????????????????????????\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element]\n    },\n    alternate: currentRoot\n  };\n  deletions = []; //?????????fiber??????(????????????)????????????\n\n  nextUnitOfWork = wipRoot;\n} //?????????????????????\n\n\nfunction workLoop(deadline) {\n  //????????????????????????\n  var shouldYield = false; //????????????????????????????????? ??? ???????????????????????????????????? ????????????\n  //??????????????????????????? ??????????????????\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); //???????????????????????? ?????????????????? ??????????????????????????????\n\n    console.log('???????????????? deadline ', deadline.timeRemaining());\n    console.log('????????????????', nextUnitOfWork);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot();\n  }\n\n  requestIdleCallback(workLoop);\n} //?????????????????? ????????????????????????workLoop\n\n\nrequestIdleCallback(workLoop); //?????????????????? wipFiber\n\nvar wipFiber = null; // initial ????????????????????????????????????initial=1\n\nfunction useState(initial) {\n  // ????????????????????????????????????????????????????????? hook\n  var oldHook = wipFiber.alternate && wipFiber.alternate.hook; // ????????????????????????????????????????????????????????????????????????\n\n  var hook = {\n    state: oldHook ? oldHook.state : initial,\n    queue: []\n  }; // ?????????????????????????????????????????????????????????????????????????????????????????????\n\n  var actions = oldHook ? oldHook.queue : [];\n  actions.forEach(function (action) {\n    hook.state = action(hook.state);\n  }); // ??????????????????\n\n  var setState = function setState(action) {\n    // ??????????????????????????????\n    hook.queue.push(action); // ????????????\n\n    wipRoot = {\n      dom: currentRoot.dom,\n      props: currentRoot.props,\n      alternate: currentRoot\n    };\n    nextUnitOfWork = wipRoot;\n    deletions = [];\n  }; // ??????????????????????????????\n\n\n  wipFiber.hook = hook; // ?????????????????????????????????????????????\n\n  return [hook.state, setState];\n}\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber;\n  var children = [fiber.type(fiber.props)]; //hooks + if????????????\n\n  wipFiber.hooks = [];\n  reconcileChildren(fiber, children);\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  var children = fiber.props.children;\n  reconcileChildren(fiber, children);\n} //??????????????????????????????nextUnitOfWork=fiber\n\n\nfunction performUnitOfWork(fiber) {\n  // ???????????????????????????\n  var isFunctionComponent = fiber && fiber.type && fiber.type instanceof Function;\n\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber);\n  } else {\n    updateHostComponent(fiber);\n  }\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  var nextFiber = fiber;\n\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n\n    nextFiber = nextFiber.parent;\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  //??????fiber??????dom?????? ????????????dom??????\n\n  /**\n   * ?????????????????????????????????????????? ??????????????????????????????????????????UI\n   */\n  // if (fiber.parent) {\n  //   //???????????????dom????????????????????????\n  //   // document.createElement(\"div\").appendChild\n  //   fiber.parent.dom.appendChild(fiber.dom);\n  // }\n  //??????children ?????????\n  // const elements = fiber.props.children;\n  var index = 0;\n  var oldFiber = wipFiber.alternate && wipFiber.alternate.child;\n  var prevSibling = null;\n\n  while (index < elements.length || oldFiber != null) {\n    var _element = elements[index];\n    var newFiber = null;\n    var sameType = oldFiber && _element && _element.type == oldFiber.type;\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: _element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: 'UPDATE'\n      };\n    }\n\n    if (_element && !sameType) {\n      newFiber = {\n        type: _element.type,\n        props: _element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: 'PLACEMENT'\n      };\n    }\n\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = 'DELETION';\n      deletions.push(oldFiber);\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else if (_element) {\n      prevSibling.sibling = newFiber;\n    }\n\n    prevSibling = newFiber;\n    index++;\n  }\n}\n/** @jsx DReact.createElement */\n\n\nfunction Counter() {\n  var _DReact$useState = DReact.useState(1),\n      _DReact$useState2 = _slicedToArray(_DReact$useState, 2),\n      state = _DReact$useState2[0],\n      setState = _DReact$useState2[1];\n\n  return DReact.createElement(\"h1\", {\n    onClick: function onClick() {\n      return setState(function (c) {\n        return c + 1;\n      });\n    }\n  }, \"Count: \", state);\n}\n\nvar element = DReact.createElement(Counter, null);\nvar container = document.getElementById('root');\nDReact.render(element, container); // function App(props) {\n//   return DReact.createElement(\n//     \"h1\",\n//     null,\n//     \"Hi \",\n//     props.name\n//   )\n// }\n// const element = DReact.createElement(App, {\n//   name: \"foo\",\n// })\n\n//# sourceURL=webpack://yd-react/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;