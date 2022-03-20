# tang-diyReact
手写react简易版
1.createElement(虚拟dom)
2.render
3.Concurrent Mode
    3-1 允许中断渲染 优先级更高优先执行
    3-2 将渲染工作进行分解 分解成一个个的小fiber task
    3-3 requestIdleCallback（mock模拟）
        messageChannel（macrotask）+ requestaAnimationFrame(计算超时时间)
4.Fibers
    4-1 小块 fibertask(虚拟dom+状态) ->  fibertree -> 将要被渲染的tree 双缓存
    4-2 fiber是一种数据结构 也是一个工作单元
    ![cmd-markdown-logo](https://pomb.us/static/a88a3ec01855349c14302f6da28e2b0c/ac667/fiber1.png)
    4-3 h1 每一个fiber 如右图 链表
      nextUnitOfWork = {
        parant:"",
        dom: "",
        props: {
          children: [],
        },
      };
      <div>
          <h1>
            <p />
            <a />
          </h1>
          <h2 />
      </div>,
  链表+DFS+BFS
5.Render and Commit Phases
 提交阶段
6.Reconciliation(Dom diff)
7.Function Components
8.Hooks
 排队 + 栈【更新顺讯】
 桥接对应的组件
[done] 精英班react补充